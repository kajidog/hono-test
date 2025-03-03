FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .

# Prismaクライアントを生成
RUN bunx prisma generate

ENV PORT=3000
EXPOSE 3000

# 開発環境ではマイグレーションを実行してからアプリを起動
# 環境変数SEED=trueが設定されている場合はシードも実行
CMD ["sh", "-c", "bunx prisma generate && bunx prisma migrate deploy && if [ \"$SEED\" = \"true\" ]; then bunx prisma db seed; fi && bun run dev"] 