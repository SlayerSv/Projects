package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"

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

func getOne(w http.ResponseWriter, r *http.Request) {
	stringId := r.PathValue("id")
	if stringId == "" {
		log.Println("getOne func did not receive id param from path")
		return
	}
	id, err := strconv.Atoi(stringId)
	if err != nil {
		log.Println("Failed to convert id param to int", err)
		return
	}
	row := db.QueryRow("SELECT * FROM smartphones WHERE id = $1", id)
	sm := Smartphone{}
	err = row.Scan(&sm.ID, &sm.Model, &sm.Producer, &sm.Color, &sm.ScreenSize, &sm.Price)
	if err != nil {
		log.Println(err)
		return
	}
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	encoder.Encode(sm)
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
