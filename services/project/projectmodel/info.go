package projectmodel

import "context"

type ProjectInfo struct {
	Title string `json:"title"`
	Role  string `json:"role"`
}

func (s *ProjectStorage) GetProjectInfo(ctx context.Context, userId, projId string) (*ProjectInfo, error) {
	info := &ProjectInfo{}

	err := s.db.QueryRowContext(ctx, `
		SELECT 
			p.title,
			COALESCE(pa.role, 'viewer') AS role
		FROM projects p
		LEFT JOIN project_access pa
		ON pa.project_id = p.id AND pa.user_id = $2
		WHERE 
			p.id = $1
			AND 
			(pa.user_id IS NOT NULL OR p.public);
	`, projId, userId).Scan(&info.Title, &info.Role)
	if err != nil {
		return nil, err
	}

	return info, nil
}
