package projectmodel

import "context"

func (s *ProjectStorage) Add(ctx context.Context, userId string) (string, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}

	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p)
		} else if err != nil {
			tx.Rollback()
		}
	}()

	var prId string
	err = tx.QueryRowContext(ctx, "INSERT INTO projects DEFAULT VALUES RETURNING id").Scan(&prId)
	if err != nil {
		return "", err
	}

	_, err = tx.ExecContext(ctx, "INSERT INTO project_access (project_id, user_id) VALUES ($1, $2)", prId, userId)
	if err != nil {
		return "", err
	}

	err = tx.Commit()
	return prId, err
}
