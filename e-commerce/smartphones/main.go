package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/smartphones", getAll)

	http.ListenAndServe("localhost:8080", nil)
}
