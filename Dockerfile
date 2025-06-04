FROM node:22.5.1-alpine

# bash追加（任意）
RUN apk add --no-cache bash

# 作業ディレクトリ
WORKDIR /usr/src/app

# パッケージファイルを先にコピーして依存解決
COPY package*.json ./
RUN npm ci

# アプリの全コードをコピー
COPY . .

# エントリポイントスクリプトを追加
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000

CMD ["npm", "run", "dev"]