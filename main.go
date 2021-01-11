package main

import (
	"color"
	"net/http"
	"path"
	"strings"
)

type API struct {
	ColorHandler *color.Handler
}

func (api *API) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// STOLEN FUNCTION
	var head string
	head, r.URL.Path = shiftPath(r.URL.Path)
	// STOLEN FUNCTION

	switch head {
	case "color":
		api.ColorHandler.ServeHTTP(w, r)
		return
	}
}

func main() {
	println("main func in progress..")

	api := &API{
		ColorHandler: new(color.Handler),
	}

	http.ListenAndServe(":8003", api)
}

//no idea what this does
func shiftPath(p string) (head, tail string) {
	p = path.Clean("/" + p)
	i := strings.Index(p[1:], "/") + 1
	if i <= 0 {
		return p[1:], "/"
	}
	return p[1:i], p[i:]
}
