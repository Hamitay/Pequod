package containers

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

type ContainerService interface {
	ListContainers() []types.Container
	RestartContainer(containerId string)
}

type ContainerEntity struct {
	name  string
	id    string
	image string
}

func (ce *ContainerEntity) String() string {
	return fmt.Sprintf("Name: %v, Image: %v, Id: %v", ce.name, ce.image, ce.id)
}

func (ce *ContainerEntity) ToMap() map[string]string {
	return map[string]string{
		"name":  ce.name,
		"id":    ce.id,
		"image": ce.image,
	}
}

type ContainerServiceImpl struct{}

func (c *ContainerServiceImpl) ListContainers() []ContainerEntity {
	ctx := context.Background()
	cli := getCliContext()
	dockerContainer, err := cli.ContainerList(ctx, types.ContainerListOptions{})

	if err != nil {
		panic(err)
	}

	containerList := make([]ContainerEntity, len(dockerContainer))

	for i, dockerContainer := range dockerContainer {
		containerList[i] = buildContainerEntityFromDockerContainer(dockerContainer)
	}

	return containerList
}

func (c *ContainerServiceImpl) RestartContainer(containerId string) {
	ctx := context.Background()
	cli := getCliContext()
	cli.ContainerRestart(ctx, containerId, nil)
}

func buildContainerEntityFromDockerContainer(dockerContainer types.Container) ContainerEntity {
	return ContainerEntity{dockerContainer.Names[0], dockerContainer.ID, dockerContainer.Image}
}

func getCliContext() *client.Client {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())

	if err != nil {
		panic(err)
	}

	return cli
}
