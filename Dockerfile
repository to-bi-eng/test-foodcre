# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.5.1

# Base image
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

# Install dependencies
FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Build application
FROM deps as build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

# Final stage
FROM base as final

ENV NODE_ENV development

# Copy built files
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next

# 権限を設定
RUN mkdir -p .next/cache && chmod -R 777 .next

USER node

EXPOSE 3000
CMD ["npm", "run", "dev"]


