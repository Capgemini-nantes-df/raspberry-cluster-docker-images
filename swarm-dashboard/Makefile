DOCKER_IMAGE_VERSION=latest
DOCKER_IMAGE_NAME=REGISTRY_URL/swarm-dashboard
DOCKER_IMAGE_TAGNAME=$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_VERSION)

default: build

build:
	docker build -t $(DOCKER_IMAGE_TAGNAME) -f Dockerfile.arm . --no-cache

push:
	docker push $(DOCKER_IMAGE_TAGNAME)