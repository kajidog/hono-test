import type { User } from "@prisma/client";
import prisma from "../models/prisma";

export interface CreateUserInput {
  email: string;
  name?: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export const userService = {
  // 全ユーザーを取得
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  },

  // IDでユーザーを取得
  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { todos: true },
    });
  },

  // ユーザーを作成
  async createUser(data: CreateUserInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  },

  // ユーザーを更新
  async updateUser(id: number, data: UpdateUserInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  // ユーザーを削除
  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  },
};
