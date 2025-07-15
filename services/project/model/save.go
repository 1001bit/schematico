package model

import "context"

func (s *ProjectStorage) SaveProject(ctx context.Context, id string, name string, tileMapStr string) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.ExecContext(ctx, "UPDATE projects SET name=$1 WHERE id=$2", name, id)
	if err != nil {
		return err
	}
	_, err = tx.ExecContext(ctx, "UPDATE project_maps SET map=$1::jsonb WHERE id=$2", tileMapStr, id)
	if err != nil {
		return err
	}

	if err = tx.Commit(); err != nil {
		return err
	}

	return nil
}
