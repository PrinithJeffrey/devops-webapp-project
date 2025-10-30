terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.19"
    }
  }
}

provider "docker" {}

resource "docker_image" "app" {
  name         = "devops-app:latest"
  build {
    context = "../"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "app" {
  image = docker_image.app.latest
  name  = "devops-app-container"
  ports {
    internal = 3000
    external = 3000
  }
}
