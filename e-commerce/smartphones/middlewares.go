package main

import (
	"net/http"
)

func (app *Application) LogRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		app.Infologger.Println(r.URL, r.Method, r.Body)
		next.ServeHTTP(w, r)
	})
}
