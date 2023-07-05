terraform {
  cloud {
    organization = "benjamintchilds"

    workspaces {
      name = "rpg-world-visualizer"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}