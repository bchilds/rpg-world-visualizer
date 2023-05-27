# RPG Visualizer

## Deployment

- aws s3 sync $(pwd)/client/dist s3://rpg.benjamintchilds.com
- invalidate cloudfront cache