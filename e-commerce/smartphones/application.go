package main

import (
	"log"
	"os"
)

type Application struct {
	ErrorLogger *log.Logger
	Infologger  *log.Logger
}

func NewApplication() *Application {
	errorLogger := log.New(os.Stderr, "ERROR\t", log.LUTC|log.Lshortfile)
	infoLogger := log.New(os.Stdout, "INFO\t", log.LUTC)
	app := &Application{
		ErrorLogger: errorLogger,
		Infologger:  infoLogger,
	}
	return app
}
