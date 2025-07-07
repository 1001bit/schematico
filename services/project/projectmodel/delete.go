package projectmodel

import "context"

func (s *ProjectStorage) DeleteProject(ctx context.Context, id string) error {
	_, err := s.db.ExecContext(ctx, "DELETE FROM projects WHERE id=$1", id)
	return err
}
