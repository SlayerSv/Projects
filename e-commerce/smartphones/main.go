package main

import (
	"net/http"
)

func main() {
	app := NewApplication()
	mux := http.NewServeMux()
	mux.HandleFunc("GET /smartphones", app.getAll)
	mux.HandleFunc("GET /smartphones/{id}", ExtractID(app.getOne))

	server := &http.Server{
		Addr:     "localhost:8080",
		ErrorLog: app.ErrorLogger,
		Handler:  mux,
	}

	app.Infologger.Println("starting server on address " + server.Addr)
	server.ListenAndServe()
}
