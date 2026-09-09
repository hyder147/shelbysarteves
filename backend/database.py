import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "shelbys_arteves.db")

SCHEMA = """
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS pageviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    referrer TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
"""

SEED_SERVICES = [
    ("CALL", "After-hours call coverage",
     "An AI agent answers every call you'd otherwise miss, books the job on your calendar, "
     "and texts the customer a confirmation. Nights and weekends included.", 1),
    ("WARR", "Warranty and service recapture",
     "We track install and service dates from your own job history and reach out to customers "
     "right before a warranty or replacement window opens.", 2),
    ("REV", "Reputation firefighting",
     "A short post-job text catches unhappy customers before they post publicly, and routes "
     "only happy ones toward a review request.", 3),
    ("LEAD", "Instant lead response",
     "Web and social form leads get a qualifying reply within seconds, not hours. Well before "
     "a competitor gets there first.", 4),
    ("GHOST", "Dead quote recovery",
     "Old estimates that never closed get a timed, relevant follow-up months later. Revenue "
     "you already paid to generate once.", 5),
    ("CLAIM", "Insurance claim documentation",
     "Job photos and technician notes are turned into insurance-ready claim paperwork the "
     "same day, for faster payout on restoration and roofing jobs.", 6),
    ("LIC", "License and compliance tracking",
     "Renewals, insurance certs, and inspections are tracked across every location and "
     "technician, with a nag well before anything lapses.", 7),
    ("LANG", "Multilingual front desk",
     "Calls and messages are handled fluently in the languages your customer base actually "
     "speaks, not just English.", 8),
]


def get_connection():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    return conn


def init_db():
    conn = get_connection()
    conn.executescript(SCHEMA)
    existing = conn.execute("SELECT COUNT(*) AS c FROM services").fetchone()["c"]
    if existing == 0:
        conn.executemany(
            "INSERT INTO services (code, name, description, sort_order) VALUES (?, ?, ?, ?)",
            SEED_SERVICES,
        )
    conn.commit()
    conn.close()


if __name__ == "__main__":
    init_db()
    print(f"Database ready at {DB_PATH}")
