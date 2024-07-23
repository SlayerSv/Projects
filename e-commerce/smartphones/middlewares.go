package main

import (
	"net/http"
	"strconv"
)

func ExtractID(fn func(w http.ResponseWriter, r *http.Request, id int)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		stringId := r.PathValue("id")
		id, err := strconv.Atoi(stringId)
		if stringId == "" || err != nil {
			http.NotFound(w, r)
			return
		}
		fn(w, r, id)
	}
}
