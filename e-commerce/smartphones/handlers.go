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
	rows, err := app.DB.Query("SELECT * FROM smartphones ORDER BY price LIMIT $1", PAGE_LIMIT)
	if err != nil {
		app.ErrorLogger.Println(err)
		return
	}
	defer rows.Close()
	smartphones := []Smartphone{}
	for rows.Next() {
		sm := Smartphone{}
		rows.Scan(&sm.ID, &sm.Model, &sm.Producer, &sm.Color, &sm.ScreenSize, &sm.Price)
		smartphones = append(smartphones, sm)
	}
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(smartphones)
}

func (app *Application) GetOne(w http.ResponseWriter, r *http.Request, id int) {
	w.Header().Set("Content-Type", "application/json")
	row := app.DB.QueryRow("SELECT * FROM smartphones WHERE id = $1", id)
	sm := Smartphone{}
	err := app.ExtractRow(w, row, sm)
	if err != nil {
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(sm)
}

func (app *Application) Delete(w http.ResponseWriter, r *http.Request, id int) {
	w.Header().Set("Content-Type", "application/json")
	row := app.DB.QueryRow("DELETE FROM smartphones where id = $1 returning *", id)
	sm := Smartphone{}
	err := app.ExtractRow(w, row, sm)
	if err != nil {
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(sm)
}

func (app *Application) Update(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
	sm := Smartphone{}
	decoder.Decode(&sm)
	query := `
	UPDATE smartphones
	SET model = $1, producer = $2, color = $3, screenSize = $4, price = $5
	WHERE id = $6
	RETURNING *
	`
	row := app.DB.QueryRow(query, sm.Model, sm.Producer, sm.Color, sm.ScreenSize, sm.Price, sm.ID)
	err := app.ExtractRow(w, row, sm)
	if err != nil {
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(sm)
}

func (app *Application) Create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
	sm := Smartphone{}
	decoder.Decode(&sm)
	query := `
	INSERT INTO smartphones (model, producer, color, screenSize, price)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING *
	`
	row := app.DB.QueryRow(query, sm.Model, sm.Producer, sm.Color, sm.ScreenSize, sm.Price)
	err := app.ExtractRow(w, row, sm)
	if err != nil {
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(sm)
}

func ErrorJSON(w http.ResponseWriter, err error, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(err)
}

func (app *Application) ExtractRow(w http.ResponseWriter, row *sql.Row, sm Smartphone) error {
	err := row.Scan(&sm.ID, &sm.Model, &sm.Producer, &sm.Color, &sm.ScreenSize, &sm.Price)
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
