package main

import (
	"net/http"
)

func (app *Application) NewRouter() *http.ServeMux {
	router := http.NewServeMux()
	router.HandleFunc("GET /users", app.GetAll)
	router.HandleFunc("GET /users/{id}", ExtractID(app.GetOne))
	router.HandleFunc("DELETE /users/{id}", ExtractID(app.Delete))
	router.HandleFunc("POST /users", app.Create)
	router.HandleFunc("UPDATE /users", app.Update)
	return router
}
