CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL DEFAULT 'New Project',
    public BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE project_access (
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    role VARCHAR(6) NOT NULL CHECK (role IN ('owner', 'editor', 'viewer')) DEFAULT 'viewer',
    PRIMARY KEY (user_id, project_id)
);

CREATE INDEX idx_project_access_project_id ON project_access (project_id);
