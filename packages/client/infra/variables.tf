variable "aws_region" {
  type        = string
  description = "AWS region to use"
  default     = "us-east-1"
}

variable "bucket_name" {
  type        = string
  description = "Bucket name"
  default     = "rpg.benjamintchilds.com"
}