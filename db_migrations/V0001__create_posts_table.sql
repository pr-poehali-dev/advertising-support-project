CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    emoji TEXT DEFAULT '📝',
    read_time TEXT DEFAULT '5 мин',
    description TEXT,
    category TEXT DEFAULT 'основы',
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);