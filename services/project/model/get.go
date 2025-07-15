package model

import "context"

type Project struct {
	MapStr string
	Name   string
}

func (s *ProjectStorage) GetProject(ctx context.Context, id string) (*Project, error) {
	project := &Project{}
	err := s.db.QueryRowContext(ctx, "SELECT name FROM projects WHERE id=$1", id).Scan(&project.Name)
	if err != nil {
		return nil, err
	}
	err = s.db.QueryRowContext(ctx, "SELECT map FROM project_maps WHERE id=$1", id).Scan(&project.MapStr)

	return project, err
}
