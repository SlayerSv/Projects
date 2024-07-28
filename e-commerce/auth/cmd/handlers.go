package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"

	_ "github.com/lib/pq"
)

const PAGE_LIMIT int = 20

func (app *Application) GetAll(w http.ResponseWriter, r *http.Request) {
	rows, err := app.DB.Query("SELECT * FROM users ORDER BY id LIMIT $1", PAGE_LIMIT)
	if err != nil {
		app.ErrorLogger.Println(err)
		return
	}
	defer rows.Close()
	users := []User{}
	for rows.Next() {
		u := User{}
		rows.Scan(&u.ID, &u.FirstName, &u.LastName, &u.Nickname, &u.Password, &u.Role)
		users = append(users, u)
	}
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(users)
}

func (app *Application) GetOne(w http.ResponseWriter, r *http.Request, id int) {
	w.Header().Set("Content-Type", "application/json")
	row := app.DB.QueryRow("SELECT * FROM users WHERE id = $1", id)
	u := User{}
	err := app.ExtractRow(w, row, u)
	if err != nil {
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(u)
}

func (app *Application) Delete(w http.ResponseWriter, r *http.Request, id int) {
	w.Header().Set("Content-Type", "application/json")
	row := app.DB.QueryRow("DELETE FROM users where id = $1 returning *", id)
	u := User{}
	err := app.ExtractRow(w, row, u)
	if err != nil {
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(u)
}

func (app *Application) Update(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
	u := User{}
	decoder.Decode(&u)
	query := `
	UPDATE users
	SET model = $1, producer = $2, color = $3, screenSize = $4, price = $5
	WHERE id = $6
	RETURNING *
	`
	row := app.DB.QueryRow(query, u.ID, u.FirstName, u.LastName, u.Nickname, u.Password, u.Role)
	err := app.ExtractRow(w, row, u)
	if err != nil {
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(u)
}

func (app *Application) Create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
	u := User{}
	decoder.Decode(&u)
	query := `
	INSERT INTO users (model, producer, color, screenSize, price)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING *
	`
	row := app.DB.QueryRow(query, u.ID, u.FirstName, u.LastName, u.Nickname, u.Password, u.Role)
	err := app.ExtractRow(w, row, u)
	if err != nil {
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(u)
}

func ErrorJSON(w http.ResponseWriter, err error, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(err)
}

func (app *Application) ExtractRow(w http.ResponseWriter, row *sql.Row, u User) error {
	err := row.Scan(&u.ID, &u.FirstName, &u.LastName, &u.Nickname, &u.Password, &u.Role)
	if err != nil {
		if err == sql.ErrNoRows {
			ErrorJSON(w, errors.New("id does not exist"), http.StatusNotFound)
			return err
		}
		app.ErrorLogger.Println(err)
		ErrorJSON(w, errors.New("internal server error"), http.StatusInternalServerError)
		return err
	}
	return nil
}
