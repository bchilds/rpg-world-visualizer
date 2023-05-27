
resource "aws_s3_bucket" "rpg-visualizer-bucket" {
  bucket = var.bucket_name

  tags = {
    Name = "RPG Visualizer"
  }
}

locals {
  s3_origin_id = "rpg.benjamintchilds.com"
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "RPG Visualizer"
  description                       = "access identity for cloudfront to the rpg visualizer s3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.rpg-visualizer-bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

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
    acm_certificate_arn = "arn:aws:acm:us-east-1:266311873973:certificate/2a1185f4-0384-4ef1-ac7e-7b89c9f3e4b3" # hard-coded since this exists already, will change if necessary
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "a" {
  zone_id = "Z3CJM0U1ESLF2W"
  name    = "rpg.benjamintchilds.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
