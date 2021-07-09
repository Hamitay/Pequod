package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/Hamitay/Pequod/containers"
)

const PORT = ":5000"

func handler(w http.ResponseWriter, r *http.Request) {
	service := containers.ContainerServiceImpl{}

	containers := service.ListContainers()

	containerList := make([]map[string]string, len(containers))
	for i, container := range containers {
		containerList[i] = container.ToMap()
	}

	jsonResponse(w, containerList)
}

func jsonResponse(w http.ResponseWriter, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payload)
}

func Startup() {
	fmt.Fprintf(os.Stdout, "Web Server started. Listening on 0.0.0.0%s\n", PORT)
	http.HandleFunc("/", handler)
	http.ListenAndServe(PORT, nil)
}
