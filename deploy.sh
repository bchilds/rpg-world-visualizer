#!/bin/bash

pnpm build
aws s3 sync $(pwd)/packages/client/dist s3://rpg.benjamintchilds.com
aws cloudfront create-invalidation --distribution-id E1SMAY176TV3RL --paths "/*"