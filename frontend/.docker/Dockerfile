# ベースイメージ
FROM node:22.9.0-alpine as base
WORKDIR /src

# 必要な依存関係をインストール
FROM base as builder
COPY package.json package-lock.json ./
RUN npm install

# アプリケーション全体をコピーしてビルド
COPY . .
RUN npm run build

# 実行環境
FROM base as runner
COPY --from=builder /src /src
CMD ["npm", "start"]
