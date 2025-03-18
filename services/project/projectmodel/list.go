package projectmodel

import "context"

type ListProject struct {
	Title string `json:"title"`
	Id    string `json:"id"`
}

func (s *ProjectStorage) GetProjectList(ctx context.Context, userId string) ([]ListProject, error) {
	list := make([]ListProject, 0)

	rows, err := s.db.QueryContext(ctx, `
		SELECT title, id 
		FROM projects p
		JOIN project_access pa ON p.id = pa.project_id
		WHERE pa.user_id = $1
	`, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		pr := ListProject{}
		err = rows.Scan(&pr.Title, &pr.Id)
		if err != nil {
			return nil, err
		}
		list = append(list, pr)
	}
	return list, nil
}
