package main

func main() {
	app := NewApplication()

	app.Infologger.Println("starting server on address " + app.Server.Addr)
	app.ErrorLogger.Fatalln(app.Server.ListenAndServe())
}
