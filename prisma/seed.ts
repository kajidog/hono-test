import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // サンプルユーザーの作成
  const user1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      todos: {
        create: [
          {
            title: "Honoアプリケーションを作成する",
            description: "Hono + Bun + Prisma + PostgreSQLでアプリを作成",
            completed: true,
          },
          {
            title: "Prismaのマイグレーションを実行する",
            description: "データベーススキーマを更新する",
            completed: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      todos: {
        create: [
          {
            title: "フロントエンドを実装する",
            description: "ReactかVueでフロントエンドを作成",
            completed: false,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
  console.log("シードデータが正常に作成されました");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
