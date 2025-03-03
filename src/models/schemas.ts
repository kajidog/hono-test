import { z } from "zod";
import { registry } from "../utils/openapi";

// Todoスキーマ
export const TodoSchema = z
  .object({
    id: z.number().int().positive().openapi({ example: 1, description: "Todo ID" }),
    title: z
      .string()
      .min(1)
      .openapi({ example: "タスクのタイトル", description: "Todoのタイトル" }),
    description: z
      .string()
      .nullable()
      .optional()
      .openapi({ example: "タスクの詳細説明", description: "Todoの詳細説明" }),
    completed: z
      .boolean()
      .default(false)
      .openapi({ example: false, description: "Todoの完了状態" }),
    userId: z.number().int().positive().openapi({ example: 1, description: "ユーザーID" }),
    createdAt: z
      .date()
      .or(z.string())
      .openapi({ example: "2023-01-01T00:00:00Z", description: "作成日時" }),
    updatedAt: z
      .date()
      .or(z.string())
      .openapi({ example: "2023-01-01T00:00:00Z", description: "更新日時" }),
  })
  .openapi("Todo");

// Todo作成スキーマ
export const CreateTodoSchema = z
  .object({
    title: z
      .string()
      .min(1)
      .openapi({ example: "タスクのタイトル", description: "Todoのタイトル" }),
    description: z
      .string()
      .optional()
      .openapi({ example: "タスクの詳細説明", description: "Todoの詳細説明" }),
    userId: z.number().int().positive().openapi({ example: 1, description: "ユーザーID" }),
  })
  .openapi("CreateTodo");

// Todo更新スキーマ
export const UpdateTodoSchema = z
  .object({
    title: z
      .string()
      .min(1)
      .optional()
      .openapi({ example: "タスクのタイトル", description: "Todoのタイトル" }),
    description: z
      .string()
      .optional()
      .openapi({ example: "タスクの詳細説明", description: "Todoの詳細説明" }),
    completed: z.boolean().optional().openapi({ example: true, description: "Todoの完了状態" }),
  })
  .openapi("UpdateTodo");

// ユーザースキーマ
export const UserSchema = z
  .object({
    id: z.number().int().positive().openapi({ example: 1, description: "ユーザーID" }),
    email: z
      .string()
      .email()
      .openapi({ example: "user@example.com", description: "ユーザーのメールアドレス" }),
    name: z
      .string()
      .nullable()
      .optional()
      .openapi({ example: "ユーザー名", description: "ユーザー名" }),
    createdAt: z
      .date()
      .or(z.string())
      .openapi({ example: "2023-01-01T00:00:00Z", description: "作成日時" }),
    updatedAt: z
      .date()
      .or(z.string())
      .openapi({ example: "2023-01-01T00:00:00Z", description: "更新日時" }),
  })
  .openapi("User");

// APIレスポンススキーマ
export const ApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    success: z.boolean().default(true),
    message: z.string().optional(),
  });

// エラーレスポンススキーマ
export const ErrorResponseSchema = z
  .object({
    error: z.string().or(z.array(z.any())),
    success: z.boolean().default(false),
  })
  .openapi("ErrorResponse");

// OpenAPIにスキーマを登録
registry.register("Todo", TodoSchema);
registry.register("CreateTodo", CreateTodoSchema);
registry.register("UpdateTodo", UpdateTodoSchema);
registry.register("User", UserSchema);
registry.register("ErrorResponse", ErrorResponseSchema);

// APIパスの登録
registry.registerPath({
  method: "get",
  path: "/api/todos",
  summary: "全てのTodoを取得",
  description: "全てのTodoのリストを取得します",
  responses: {
    200: {
      description: "Todoのリスト",
      content: {
        "application/json": {
          schema: ApiResponseSchema(z.array(TodoSchema)),
        },
      },
    },
    500: {
      description: "サーバーエラー",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/todos",
  summary: "新しいTodoを作成",
  description: "新しいTodoを作成します",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateTodoSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "作成されたTodo",
      content: {
        "application/json": {
          schema: ApiResponseSchema(TodoSchema),
        },
      },
    },
    400: {
      description: "バリデーションエラー",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: "サーバーエラー",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/todos/{id}",
  summary: "IDでTodoを取得",
  description: "指定されたIDのTodoを取得します",
  request: {
    params: z.object({
      id: z
        .string()
        .transform((val) => Number.parseInt(val, 10))
        .openapi({
          description: "Todo ID",
          example: "1",
        }),
    }),
  },
  responses: {
    200: {
      description: "Todo",
      content: {
        "application/json": {
          schema: ApiResponseSchema(TodoSchema),
        },
      },
    },
    404: {
      description: "Todoが見つかりません",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: "サーバーエラー",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});
