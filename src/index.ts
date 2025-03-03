import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { z } from "zod";
import todoRouter from "./routes/todoRoutes";
import userRouter from "./routes/userRoutes";

// Zodを拡張してOpenAPI機能を追加
extendZodWithOpenApi(z);

// OpenAPI レジストリを作成
const registry = new OpenAPIRegistry();

// ユーザースキーマを登録
const userSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  name: z.string().optional(),
  createdAt: z.string().openapi({ format: "date-time" }),
  updatedAt: z.string().openapi({ format: "date-time" }),
});

registry.register("User", userSchema);

// Todoスキーマを登録
const todoSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  userId: z.number().int().positive(),
  createdAt: z.string().openapi({ format: "date-time" }),
  updatedAt: z.string().openapi({ format: "date-time" }),
});

registry.register("Todo", todoSchema);

// APIエンドポイントを登録
registry.registerPath({
  method: "get",
  path: "/api/users",
  tags: ["Users"],
  responses: {
    200: {
      description: "ユーザー一覧を取得",
      content: {
        "application/json": {
          schema: z.object({
            users: z.array(userSchema),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/users/{id}",
  tags: ["Users"],
  request: {
    params: z.object({
      id: z.string().openapi({
        description: "ユーザーID",
      }),
    }),
  },
  responses: {
    200: {
      description: "指定されたIDのユーザーを取得",
      content: {
        "application/json": {
          schema: z.object({
            user: userSchema,
          }),
        },
      },
    },
    404: {
      description: "ユーザーが見つかりません",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/todos",
  tags: ["Todos"],
  responses: {
    200: {
      description: "Todo一覧を取得",
      content: {
        "application/json": {
          schema: z.object({
            todos: z.array(todoSchema),
          }),
        },
      },
    },
  },
});

const app = new Hono();

// ミドルウェア
app.use("*", logger());
app.use("/static/*", serveStatic({ root: "./public" }));

// OpenAPI仕様を動的に生成して提供
app.get("/openapi.json", (c) => {
  try {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    const openApiDocument = generator.generateDocument({
      openapi: "3.0.0",
      info: {
        title: "Hono + Prisma API",
        version: "1.0.0",
        description: "API documentation for Hono + Prisma application",
      },
      servers: [{ url: "http://localhost:3000" }],
    });

    return c.json(openApiDocument);
  } catch (error) {
    console.error("OpenAPI生成エラー:", error);
    return c.json({ error: "OpenAPI仕様の生成に失敗しました" }, 500);
  }
});

// Swagger UI
app.use("/swagger", swaggerUI({ url: "/openapi.json" }));

// ルート
app.get("/", (c) => {
  return c.json({
    message: "Hello from Hono with Bun!",
    timestamp: new Date().toISOString(),
  });
});

// APIルート
app.route("/api/users", userRouter);
app.route("/api/todos", todoRouter);

// サーバー起動
const port = Number.parseInt(process.env.PORT || "3000");
console.log(`Server is running on port ${port}`);
console.log(`Swagger UI: http://localhost:${port}/swagger`);

export default {
  port,
  fetch: app.fetch,
};
