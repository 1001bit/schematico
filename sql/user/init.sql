CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    passhash VARCHAR(64) NOT NULL
);