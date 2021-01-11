package main

import (
	"net/http"
	"path"
	"strings"

	"github.com/clreagan/mithril-go-test/color"
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

// time to shine, process starting
func main() {
	println("main func in progress..")

	api := &API{
		ColorHandler: new(color.Handler),
	}

	http.ListenAndServe(":8002", api)
}

//assuming this wizardry has to do with file path
func shiftPath(p string) (head, tail string) {
	p = path.Clean("/" + p)
	i := strings.Index(p[1:], "/") + 1
	if i <= 0 {
		return p[1:], "/"
	}
	return p[1:i], p[i:]
}
