package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

var DBConnString string
var db *sql.DB

const PAGE_LIMIT int = 20

func getAll(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT * FROM smartphones ORDER BY price LIMIT $1", PAGE_LIMIT)
	if err != nil {
		log.Println(err)
		return
	}
	defer rows.Close()
	smartphones := []Smartphone{}
	for rows.Next() {
		sm := Smartphone{}
		rows.Scan(&sm.ID, &sm.Model, &sm.Producer, &sm.Color, &sm.ScreenSize, &sm.Price)
		smartphones = append(smartphones, sm)
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(smartphones)
}

func getOne(w http.ResponseWriter, r *http.Request, id int) {
	row := db.QueryRow("SELECT * FROM smartphones WHERE id = $1", id)
	sm := Smartphone{}
	err := row.Scan(&sm.ID, &sm.Model, &sm.Producer, &sm.Color, &sm.ScreenSize, &sm.Price)
	if err != nil {
		if err == sql.ErrNoRows {
			http.NotFound(w, r)
			return
		}
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(sm)
}

func delete(w http.ResponseWriter, r *http.Request) {

}

func init() {
	conn, err := os.ReadFile("DBConnectionString")
	if err != nil {
		log.Fatal(err)
	}
	DBConnString = string(conn)
	db, err = sql.Open("postgres", DBConnString)
	if err != nil {
		log.Fatal(err)
	}
}
