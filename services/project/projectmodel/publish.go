package projectmodel

import "context"

func (s *ProjectStorage) PublishProject(ctx context.Context, name string) (string, error) {
	newId := ""
	err := s.db.QueryRowContext(ctx, "INSERT INTO projects (name) VALUES ($1) RETURNING id", name).Scan(&newId)
	return newId, err
}
