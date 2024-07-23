package main

import (
	"net/http"
)

func (app *Application) NewRouter() *http.ServeMux {
	router := http.NewServeMux()
	router.HandleFunc("GET /smartphones", app.getAll)
	router.HandleFunc("GET /smartphones/{id}", ExtractID(app.getOne))
	return router
}
