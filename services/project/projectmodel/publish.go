package projectmodel

import "context"

func (s *ProjectStorage) PublishProject(ctx context.Context, name string, tileMapStr string) (string, error) {
	newId := ""
	err := s.db.QueryRowContext(ctx, "INSERT INTO projects (name) VALUES ($1) RETURNING id", name).Scan(&newId)
	if err != nil {
		return "", err
	}
	_, err = s.db.ExecContext(ctx, "INSERT INTO project_maps (id, map) VALUES ($1, $2::jsonb)", newId, tileMapStr)

	return newId, err
}
