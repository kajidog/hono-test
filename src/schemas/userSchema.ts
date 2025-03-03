import { z } from "zod";

// ユーザースキーマを定義
export const userSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  name: z.string().optional(),
  createdAt: z.string().openapi({ format: "date-time" }),
  updatedAt: z.string().openapi({ format: "date-time" }),
});

// 入力バリデーション用のスキーマ
export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
});

// 型定義をエクスポート
export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
