FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

# FROM base AS common
# COPY --from=prod-deps /app/packages/common/node_modules/ /app/packages/common/node_modules
# COPY --from=build /app/packages/common/dist /app/packages/common/dist

FROM base AS client
# FROM common AS client
COPY --from=prod-deps /app/packages/client/node_modules/ /app/packages/client/node_modules
COPY --from=build /app/packages/client/dist /app/packages/client/dist
WORKDIR /app/packages/client
EXPOSE 8000
CMD [ "pnpm", "start" ]

# FROM common AS server
FROM base AS server
COPY --from=prod-deps /app/packages/server/node_modules/ /app/packages/server/node_modules
COPY --from=build /app/packages/server/dist /app/packages/server/dist
WORKDIR /app/packages/server
EXPOSE 3000
CMD [ "pnpm", "start" ]


# docker build . --target client --tag client:latest
# docker build . --target server --tag server:latest