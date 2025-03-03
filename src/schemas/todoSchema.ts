import { z } from "zod";

// Todoスキーマを定義
export const todoSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  userId: z.number().int().positive(),
  createdAt: z.string().openapi({ format: "date-time" }),
  updatedAt: z.string().openapi({ format: "date-time" }),
});

// 入力バリデーション用のスキーマ
export const createTodoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  userId: z.number().int().positive(),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// 型定義をエクスポート
export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
