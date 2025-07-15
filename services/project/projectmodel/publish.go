package projectmodel

import "context"

func (s *ProjectStorage) PublishProject(ctx context.Context, name string, tileMapStr string) (string, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	newId := ""
	err = tx.QueryRowContext(ctx, "INSERT INTO projects (name) VALUES ($1) RETURNING id", name).Scan(&newId)
	if err != nil {
		return "", err
	}
	_, err = tx.ExecContext(ctx, "INSERT INTO project_maps (id, map) VALUES ($1, $2::jsonb)", newId, tileMapStr)
	if err != nil {
		return "", err
	}

	if err = tx.Commit(); err != nil {
		return "", err
	}

	return newId, nil
}
