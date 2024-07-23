package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"

	_ "github.com/lib/pq"
)

const PAGE_LIMIT int = 20

func (app *Application) getAll(w http.ResponseWriter, r *http.Request) {
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

func (app *Application) getOne(w http.ResponseWriter, r *http.Request, id int) {
	w.Header().Set("Content-Type", "application/json")
	row := app.DB.QueryRow("SELECT * FROM smartphones WHERE id = $1", id)
	sm := Smartphone{}
	err := row.Scan(&sm.ID, &sm.Model, &sm.Producer, &sm.Color, &sm.ScreenSize, &sm.Price)
	if err != nil {
		if err == sql.ErrNoRows {
			ErrorJSON(w, errors.New("id does not exist"), http.StatusNotFound)
			return
		}
		app.ErrorLogger.Println(err)
		ErrorJSON(w, errors.New("internal server error"), http.StatusInternalServerError)
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(sm)
}

func delete(w http.ResponseWriter, r *http.Request) {

}

func ErrorJSON(w http.ResponseWriter, err error, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(err)
}

func init() {

}
