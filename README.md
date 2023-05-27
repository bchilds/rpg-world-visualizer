# RPG Visualizer

## Deployment

- aws s3 sync $(pwd)/client/dist s3://rpg.benjamintchilds.com
- invalidate cloudfront cache
  - aws cloudfront create-invalidation --distribution-id E1SMAY176TV3RL
