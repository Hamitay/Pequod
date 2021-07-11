package server

import (
	"fmt"
	"os"

	"github.com/Hamitay/Pequod/containers"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

const PORT = ":5000"

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", c.Request.Header.Get("Origin"))
	}
}

func handleListContainer(c *gin.Context) {
	service := containers.ContainerServiceImpl{}

	containers := service.ListContainers()

	containerList := make([]map[string]string, len(containers))
	for i, container := range containers {
		containerList[i] = container.ToMap()
	}

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

	c.JSON(200, response)
}

func handleRestartContainer(c *gin.Context) {
	service := containers.ContainerServiceImpl{}
	containerId := c.Param("id")
	service.RestartContainer(containerId)
	fmt.Println("oi")
	c.Done()
}

func Startup() {
	fmt.Fprintf(os.Stdout, "Web Server started. Listening on port: %s\n", PORT)

	router := gin.Default()
	router.Use(corsMiddleware())
	router.Use(static.ServeRoot("/", "./build"))
	router.POST("/containers/restart/:id", handleRestartContainer)
	router.GET("/containers", handleListContainer)
	router.Run(PORT)
}
