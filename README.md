# Hono + Bun + Docker Compose アプリケーション

このプロジェクトは、[Hono](https://honojs.dev/)、[Bun](https://bun.sh/)、Docker Compose を使用した高速な Web アプリケーションのひな型です。

## 機能

- Hono フレームワークを使用した高速な Web サーバー
- Bun ランタイムによる高速な実行環境
- Docker Compose による簡単なコンテナ管理
- ホットリロード対応の開発環境
- 静的ファイル配信
- シンプルな API エンドポイント

## 必要条件

- Docker と Docker Compose
- (ローカル開発の場合) Bun

## 使い方

### Docker Compose で実行

```bash
# コンテナをビルドして起動
docker-compose up --build

# バックグラウンドで実行
docker-compose up -d

# コンテナを停止
docker-compose down
```

### ローカルで実行

```bash
# 依存関係のインストール
bun install

# 開発モードで実行（ホットリロード）
bun run dev

# 本番モードで実行
bun run start

# ビルド
bun run build
```

## エンドポイント

- `GET /` - JSON レスポンスを返すルートエンドポイント
- `GET /api/hello` - サンプル API エンドポイント
- `GET /static/*` - 静的ファイル（public/ディレクトリ内）

## プロジェクト構造

```
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── src/
│   └── index.ts
└── public/
    ├── index.html
    └── style.css
```

## カスタマイズ

- `src/index.ts` - メインアプリケーションロジック
- `public/` - 静的ファイル
- `Dockerfile` - Docker イメージの設定
- `docker-compose.yml` - Docker Compose 設定

## ライセンス

MIT ライセンス
