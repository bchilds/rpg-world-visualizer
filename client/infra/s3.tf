# resource "aws_s3_bucket" "rpg-visualizer-bucket" {
#   # arn                         = "arn:aws:s3:::rpg.benjamintchilds.com"
#   bucket              = "rpg.benjamintchilds.com"
#   object_lock_enabled = false

#   policy = jsonencode(
#     {
#       Id = "PolicyForCloudFrontPrivateContent"
#       Statement = [
#         # {
#         #   Action = "s3:GetObject"
#         #   Condition = {
#         #     StringEquals = {
#         #       "AWS:SourceArn" = "arn:aws:cloudfront::266311873973:distribution/E1YICDWR573CSU"
#         #     }
#         #   }
#         #   Effect = "Allow"
#         #   Principal = {
#         #     Service = "cloudfront.amazonaws.com"
#         #   }
#         #   Resource = "arn:aws:s3:::rpg.benjamintchilds.com/*"
#         #   Sid      = "AllowCloudFrontServicePrincipal"
#         # },
#         {
#           Action    = "s3:GetObject"
#           Effect    = "Allow"
#           Principal = "*"
#           Resource  = "arn:aws:s3:::rpg.benjamintchilds.com/*"
#           Sid       = "Allow-Public-Access-To-Bucket"
#         },
#       ]
#       Version = "2008-10-17"
#     }
#   )
#   request_payer = "BucketOwner"
#   tags          = {}
#   tags_all      = {}

#   grant {
#     id = "7ca15560c95087e2ac2f3b3db1bfe99f7106f5dd8f8d73d637388b8e071f7e08"
#     permissions = [
#       "FULL_CONTROL",
#     ]
#     type = "CanonicalUser"
#   }
#   grant {
#     id = "c4c1ede66af53448b93c283ce9448c4ba468c9432aa01d700d3878632f77d2d0"
#     permissions = [
#       "FULL_CONTROL",
#     ]
#     type = "CanonicalUser"
#   }

#   server_side_encryption_configuration {
#     rule {
#       bucket_key_enabled = false

#       apply_server_side_encryption_by_default {
#         sse_algorithm = "AES256"
#       }
#     }
#   }

#   versioning {
#     enabled    = false
#     mfa_delete = false
#   }

#   website {
#     index_document = "index.html"
#   }
# }
