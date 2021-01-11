package color

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"path"
	"strings"
)

type Handler struct{}

type Request struct {
}

type Response struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Info    string `json:"info,omitempty"`
}

var colorOptions = map[string]string{
	"blue":   "0000FF",
	"yellow": "FFFF00",
	"red":    "FF0000",
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// setting headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding")

	body, _ := ioutil.ReadAll(r.Body)

	// STOLEN FUNCTION AGAIN
	var head string
	head, r.URL.Path = shiftPath(r.URL.Path)
	// STOLEN FUNCTION AGAIN

	switch head {
	case "handle":
		switch r.Method {
		case "PUT":
			conversion := convertColor(body)

			resp, _ := json.Marshal(conversion)

			w.Write(resp)

			return
		default:
			fmt.Println("Invalid input")
		}
	case "retrieve":
		switch r.Method {
		case "GET":
			data := getColors()

			resp, _ := json.Marshal(data)

			w.Write(resp)
			return
		default:
			fmt.Println("Invalid input")
		}
	}
}

func getColors() []string {
	var list []string

	for key := range colorOptions {
		list = append(list, key)

		fmt.Println("Currently supported colors are:")
		fmt.Println(list)
	}

	return list
}

type Color struct {
	Value string `json:"value"`
}

func convertColor(value []byte) string {

	var c Color

	json.Unmarshal(value, &c)

	fmt.Println("Converting:")
	fmt.Println(c.Value)

	// matches colorOptions against key/value pair
	for key, element := range colorOptions {
		if key == c.Value {
			resultHex := element

			return resultHex
		}
	}
	return "Color not yet supported"
}

// Shamelessly stolen helper function to take the path from URL
func shiftPath(p string) (head, tail string) {
	p = path.Clean("/" + p)
	i := strings.Index(p[1:], "/") + 1
	if i <= 0 {
		return p[1:], "/"
	}
	return p[1:i], p[i:]
}
