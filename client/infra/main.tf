
resource "aws_s3_bucket" "rpg-visualizer-bucket" {
  bucket = var.bucket_name

  tags = {
    Name = "RPG Visualizer"
  }
}

# resource "aws_s3_bucket_acl" "acl" {
#   bucket = aws_s3_bucket.rpg-visualizer-bucket.id
#   acl    = "private"
# }

locals {
  s3_origin_id = "rpg.benjamintchilds.com"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.rpg-visualizer-bucket.bucket_regional_domain_name
    # origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  # logging_config {
  #   include_cookies = false
  #   bucket          = "rpgviz.s3.amazonaws.com"
  #   prefix          = "rpg-visualizer"
  # }

  aliases = ["rpg.benjamintchilds.com"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE"]
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn            = "arn:aws:acm:us-east-1:266311873973:certificate/2a1185f4-0384-4ef1-ac7e-7b89c9f3e4b3"
    cloudfront_default_certificate = true
    ssl_support_method             = "sni-only"
  }
}

# TODO
# origin access control
# s3 policy update
# A record in route 53
