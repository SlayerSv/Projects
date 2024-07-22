package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/smartphones", getAll)
	http.HandleFunc("/smartphones/{id}", getOne)
	log.Print("starting server...\n")
	http.ListenAndServe("localhost:8080", nil)
}
