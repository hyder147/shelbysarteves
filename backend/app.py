import logging
import os
from functools import wraps

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from database import get_connection, init_db

load_dotenv()

# ---------------------------------------------------------------------------
# Configuration (all overridable via environment variables / .env)
# ---------------------------------------------------------------------------
DEBUG = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN")  # required to view leads / analytics
ALLOWED_ORIGINS = [
    o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

app = Flask(__name__)

# Never leak stack traces / debugger to the public. Set FLASK_DEBUG=true only
# on your own machine while developing, never in production.
app.config["DEBUG"] = DEBUG

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("shelbys-arteves")

# CORS locked to explicit origins. If ALLOWED_ORIGINS is empty (local dev),
# fall back to localhost only, never "allow everything".
CORS(
    app,
    resources={r"/api/*": {"origins": ALLOWED_ORIGINS or ["http://localhost:5173"]}},
    methods=["GET", "POST"],
    supports_credentials=False,
)


# ---------------------------------------------------------------------------
# Simple bearer-token auth for admin-only endpoints
# ---------------------------------------------------------------------------
def require_admin(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not ADMIN_TOKEN:
            # Fail closed: if no token is configured, the route is disabled
            # rather than silently open to the public.
            return jsonify({"error": "This endpoint is not configured."}), 503
        auth = request.headers.get("Authorization", "")
        provided = auth[7:] if auth.startswith("Bearer ") else ""
        if provided != ADMIN_TOKEN:
            return jsonify({"error": "Unauthorized"}), 401
        return view(*args, **kwargs)

    return wrapped


# ---------------------------------------------------------------------------
# Rate limiting (protects the public contact + feedback forms from spam bots)
# For multi-instance production deployments, point storage_uri at Redis
# instead of the in-memory default.
# ---------------------------------------------------------------------------
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=[],
    storage_uri=os.environ.get("RATE_LIMIT_STORAGE_URI", "memory://"),
)


@app.route("/api/services", methods=["GET"])
def list_services():
    conn = get_connection()
    try:
        rows = conn.execute(
            "SELECT code, name, description FROM services ORDER BY sort_order ASC"
        ).fetchall()
        return jsonify([dict(row) for row in rows])
    finally:
        conn.close()


@app.route("/api/contact", methods=["POST"])
@limiter.limit("5 per hour")
def create_lead():
    data = request.get_json(silent=True) or {}

    name = (data.get("name") or "").strip()
    business_name = (data.get("business_name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not business_name or not email:
        return jsonify({"error": "Name, business name, and email are required."}), 400
    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({"error": "Please enter a valid email address."}), 400

    conn = get_connection()
    try:
        cur = conn.execute(
            "INSERT INTO leads (name, business_name, email, phone, message) VALUES (?, ?, ?, ?, ?)",
            (name, business_name, email, phone, message),
        )
        conn.commit()
        lead_id = cur.lastrowid
    except Exception:
        logger.exception("Failed to save lead")
        return jsonify({"error": "Could not save your submission. Please try again shortly."}), 500
    finally:
        conn.close()

    return jsonify({"status": "received", "id": lead_id}), 201


@app.route("/api/leads", methods=["GET"])
@require_admin
def list_leads():
    """Admin-only. Requires Authorization: Bearer <ADMIN_TOKEN>."""
    conn = get_connection()
    try:
        rows = conn.execute(
            "SELECT id, name, business_name, email, phone, message, created_at "
            "FROM leads ORDER BY created_at DESC"
        ).fetchall()
        return jsonify([dict(row) for row in rows])
    finally:
        conn.close()


@app.route("/api/feedback", methods=["POST"])
@limiter.limit("10 per hour")
def create_feedback():
    """Lets a visitor leave a 1-5 star rating and optional comment."""
    data = request.get_json(silent=True) or {}
    rating = data.get("rating")
    comment = (data.get("comment") or "").strip()[:1000]

    try:
        rating = int(rating)
    except (TypeError, ValueError):
        return jsonify({"error": "A rating between 1 and 5 is required."}), 400
    if rating < 1 or rating > 5:
        return jsonify({"error": "Rating must be between 1 and 5."}), 400

    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO feedback (rating, comment) VALUES (?, ?)", (rating, comment)
        )
        conn.commit()
    except Exception:
        logger.exception("Failed to save feedback")
        return jsonify({"error": "Could not save your rating. Please try again shortly."}), 500
    finally:
        conn.close()

    return jsonify({"status": "received"}), 201


@app.route("/api/feedback/summary", methods=["GET"])
def feedback_summary():
    """Public aggregate rating only — no individual comments or PII."""
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT COUNT(*) AS count, AVG(rating) AS average FROM feedback"
        ).fetchone()
        return jsonify(
            {
                "count": row["count"] or 0,
                "average": round(row["average"], 2) if row["average"] else None,
            }
        )
    finally:
        conn.close()


@app.route("/api/analytics/pageview", methods=["POST"])
@limiter.limit("60 per hour")
def record_pageview():
    """Minimal first-party analytics: counts a page view. No cookies, no
    personal data. Swap in Plausible / GA4 later if you want more detail —
    see README for how to plug in a VITE_GA_ID."""
    data = request.get_json(silent=True) or {}
    path = (data.get("path") or "/")[:255]
    referrer = (data.get("referrer") or "")[:255]
    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO pageviews (path, referrer) VALUES (?, ?)", (path, referrer)
        )
        conn.commit()
    except Exception:
        logger.exception("Failed to record pageview")
        # Analytics failures should never surface to the visitor.
        return jsonify({"status": "ignored"}), 200
    finally:
        conn.close()
    return jsonify({"status": "ok"}), 201


@app.route("/api/analytics/summary", methods=["GET"])
@require_admin
def analytics_summary():
    """Admin-only. Requires Authorization: Bearer <ADMIN_TOKEN>."""
    conn = get_connection()
    try:
        total = conn.execute("SELECT COUNT(*) AS c FROM pageviews").fetchone()["c"]
        by_day = conn.execute(
            "SELECT date(created_at) AS day, COUNT(*) AS views "
            "FROM pageviews GROUP BY day ORDER BY day DESC LIMIT 30"
        ).fetchall()
        by_path = conn.execute(
            "SELECT path, COUNT(*) AS views FROM pageviews "
            "GROUP BY path ORDER BY views DESC LIMIT 20"
        ).fetchall()
        return jsonify(
            {
                "total_pageviews": total,
                "by_day": [dict(r) for r in by_day],
                "by_path": [dict(r) for r in by_path],
            }
        )
    finally:
        conn.close()


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# ---------------------------------------------------------------------------
# Error handling: never leak internals to the visitor, always log server-side.
# ---------------------------------------------------------------------------
@app.errorhandler(404)
def not_found(_e):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(429)
def rate_limited(_e):
    return jsonify({"error": "Too many requests. Please try again later."}), 429


@app.errorhandler(500)
def server_error(e):
    logger.exception("Unhandled server error: %s", e)
    return jsonify({"error": "Something went wrong on our end. Please try again shortly."}), 500


if __name__ == "__main__":
    init_db()
    # Local development only. In production this app is served by Gunicorn
    # via wsgi.py — see Procfile / README.
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=DEBUG)
