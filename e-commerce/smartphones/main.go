package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("GET /smartphones", getAll)
	http.HandleFunc("GET /smartphones/{id}", ExtractID(getOne))
	log.Print("starting server...\n")
	http.ListenAndServe("localhost:8080", nil)
}
