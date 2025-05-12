# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.5.1

# Base image
FROM node:${NODE_VERSION}-alpine as base

# bash を追加
RUN apk add --no-cache bash

WORKDIR /usr/src/app

# Install dependencies
FROM base as deps

# package.json と lock ファイルを先にコピー（キャッシュが効くように）
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Build application
FROM deps as build
COPY . .
RUN npm ci && npm run build

# Final stage
FROM base as final

ENV NODE_ENV development

# Copy built files
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

# 権限を設定
RUN mkdir -p .next/cache && chmod -R 777 .next

USER node

EXPOSE 3000
CMD ["npm", "run", "dev"]
