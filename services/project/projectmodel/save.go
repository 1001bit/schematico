package projectmodel

import "context"

func (s *ProjectStorage) SaveProject(ctx context.Context, id string, name string, tileMapStr string) error {
	_, err := s.db.ExecContext(ctx, "UPDATE projects SET name=$1 WHERE id=$2", name, id)
	if err != nil {
		return err
	}
	_, err = s.db.ExecContext(ctx, "UPDATE project_maps SET map=$1::jsonb WHERE id=$2", tileMapStr, id)

	return err
}
