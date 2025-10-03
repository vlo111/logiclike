-- таблица идей
CREATE TABLE idea (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- таблица голосов
CREATE TABLE vote (
    id SERIAL PRIMARY KEY,
    idea_id INT NOT NULL REFERENCES idea(id) ON DELETE CASCADE,
    ip VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(idea_id, ip)
);

-- индекс по ip для быстрого подсчета лимита
CREATE INDEX idx_vote_ip ON vote(ip);
