terraform {
  required_providers {
    fly = {
      source  = "fly-apps/fly"
      version = ">= 0.0.20"
    }
  }
}

provider "fly" {
  # Reads your Fly API token from the environment variable FLY_API_TOKEN
  # You can set it in PowerShell like this:
  # setx FLY_API_TOKEN "your_fly_token_here"
}

resource "random_id" "suffix" {
  byte_length = 4
}

resource "fly_app" "weather" {
  name   = "weather-app-${random_id.suffix.hex}"
  org    = var.org
}

output "fly_app_name" {
  value = fly_app.weather.name
}

output "fly_app_hostname" {
  value = "${fly_app.weather.name}.fly.dev"
}
