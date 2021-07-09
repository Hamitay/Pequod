package server

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

const PORT = ":5000"

func listContainers() []types.Container {
	ctx := context.Background()
	cli := getCliContext()
	containers, err := cli.ContainerList(ctx, types.ContainerListOptions{})

	if err != nil {
		panic(err)
	}

	return containers
}

func getCliContext() *client.Client {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())

	if err != nil {
		panic(err)
	}

	return cli
}

func restartContainer(containerId string) {
	ctx := context.Background()
	cli := getCliContext()
	cli.ContainerRestart(ctx, containerId, nil)
}

func handler(w http.ResponseWriter, r *http.Request) {

	containers := listContainers()

	containerList := ""

	for _, container := range containers {
		fmt.Printf("container: %v\n", container)
		template := "<li>Image: <b>" + container.Image + "</b> Id: " + container.ID + "</li>\n"
		containerList += template
	}

	output := "<ul>" + containerList + "</ul>"
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	//restartContainer(containers[0].ID)
	fmt.Fprintf(w, output)
}

func Startup() {
	fmt.Fprintf(os.Stdout, "Web Server started. Listening on 0.0.0.0%s\n", PORT)
	http.HandleFunc("/", handler)
	http.ListenAndServe(PORT, nil)
}
