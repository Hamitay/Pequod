package server

import (
	"fmt"
	"os"

	"github.com/Hamitay/Pequod/containers"
	"github.com/gin-gonic/gin"
)

const PORT = ":5000"

func handleListContainer(c *gin.Context) {
	service := containers.ContainerServiceImpl{}

	containers := service.ListContainers()

	containerList := make([]map[string]string, len(containers))
	for i, container := range containers {
		containerList[i] = container.ToMap()
	}

	// Todo isolate to middleware
	enableCors(c)
	c.JSON(200, containerList)
}

func handleGetContainerDetails(c *gin.Context) {
	service := containers.ContainerServiceImpl{}

	containerId := c.Param("id")

	details := service.GetContainerDetails(containerId)
	logs := service.GetContainerLogs(containerId)

	response := make(map[string]interface{}, 2)

	response["details"] = details
	response["logs"] = logs

	enableCors(c)
	c.JSON(200, response)
}

func enableCors(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", c.Request.Header.Get("Origin"))
}

func Startup() {
	fmt.Fprintf(os.Stdout, "Web Server started. Listening on port: %s\n", PORT)

	router := gin.Default()

	router.GET("/containers", handleListContainer)
	router.GET("/container/:id", handleGetContainerDetails)

	router.Run(PORT)
}
