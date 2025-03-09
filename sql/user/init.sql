CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    passhash VARCHAR(60) NOT NULL
);

CREATE UNIQUE INDEX users_username_lower_idx ON users (LOWER(username));