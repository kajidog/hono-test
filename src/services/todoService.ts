import type { z } from "zod";
import prisma from "../models/prisma";
import type { CreateTodoSchema, TodoSchema, UpdateTodoSchema } from "../models/schemas";

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;

export const todoService = {
  // 全Todoを取得
  async getAllTodos(): Promise<Todo[]> {
    return prisma.todo.findMany({
      include: { user: true },
    });
  },

  // ユーザーのTodoを取得
  async getTodosByUserId(userId: number): Promise<Todo[]> {
    return prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  // IDでTodoを取得
  async getTodoById(id: number): Promise<Todo | null> {
    return prisma.todo.findUnique({
      where: { id },
      include: { user: true },
    });
  },

  // Todoを作成
  async createTodo(data: CreateTodoInput): Promise<Todo> {
    return prisma.todo.create({
      data,
    });
  },

  // Todoを更新
  async updateTodo(id: number, data: UpdateTodoInput): Promise<Todo> {
    return prisma.todo.update({
      where: { id },
      data,
    });
  },

  // Todoを削除
  async deleteTodo(id: number): Promise<Todo> {
    return prisma.todo.delete({
      where: { id },
    });
  },

  // Todoの完了状態を切り替え
  async toggleTodoCompleted(id: number): Promise<Todo> {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new Error("Todo not found");

    return prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed },
    });
  },
};
