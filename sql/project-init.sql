CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL DEFAULT 'New Project',
    public BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE project_access (
    user_id int NOT NULL,
    project_id int REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(6) CHECK (role IN ('owner', 'editor', 'viewer')),
    PRIMARY KEY (user_id, project_id)
);