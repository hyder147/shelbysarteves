"""
Production entry point. Run with Gunicorn instead of `python app.py`:

    gunicorn wsgi:app --workers 3 --bind 0.0.0.0:8000

`app.py`'s own `app.run(...)` is dev-server-only and is skipped entirely when
imported this way, since it's guarded by `if __name__ == "__main__"`.
"""
from app import app, init_db

# Make sure tables exist before the first request in a fresh environment.
init_db()

if __name__ == "__main__":
    app.run()
