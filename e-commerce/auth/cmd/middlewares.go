package main

import (
	"errors"
	"net/http"
	"strconv"
)

func ExtractID(fn func(w http.ResponseWriter, r *http.Request, id int)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		stringId := r.PathValue("id")
		id, err := strconv.Atoi(stringId)
		if stringId == "" || err != nil {
			ErrorJSON(w, errors.New("incorrect id value"), http.StatusBadRequest)
			return
		}
		fn(w, r, id)
	}
}
