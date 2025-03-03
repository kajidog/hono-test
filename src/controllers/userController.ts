import type { Context } from "hono";
import type { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";
import { userService } from "../services/userService";

export const userController = {
  // 全ユーザーを取得
  async getAllUsers(c: Context) {
    try {
      const users = await userService.getAllUsers();
      return c.json({ users });
    } catch (error) {
      console.error("Error getting users:", error);
      return c.json({ error: "ユーザーの取得に失敗しました" }, 500);
    }
  },

  // IDでユーザーを取得
  async getUserById(c: Context) {
    try {
      const id = Number.parseInt(c.req.param("id"));
      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです" }, 400);
      }

      const user = await userService.getUserById(id);
      if (!user) {
        return c.json({ error: "ユーザーが見つかりません" }, 404);
      }

      return c.json({ user });
    } catch (error) {
      console.error("Error getting user:", error);
      return c.json({ error: "ユーザーの取得に失敗しました" }, 500);
    }
  },

  // ユーザーを作成
  async createUser(c: Context) {
    try {
      const body = await c.req.json();
      const validationResult = createUserSchema.safeParse(body);

      if (!validationResult.success) {
        return c.json({ error: validationResult.error.errors }, 400);
      }

      const userData: CreateUserInput = validationResult.data;
      const user = await userService.createUser(userData);

      return c.json({ user }, 201);
    } catch (error) {
      console.error("Error creating user:", error);
      return c.json({ error: "ユーザーの作成に失敗しました" }, 500);
    }
  },

  // ユーザーを更新
  async updateUser(c: Context) {
    try {
      const id = Number.parseInt(c.req.param("id"));
      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです" }, 400);
      }

      const body = await c.req.json();
      const validationResult = updateUserSchema.safeParse(body);

      if (!validationResult.success) {
        return c.json({ error: validationResult.error.errors }, 400);
      }

      const userData: UpdateUserInput = validationResult.data;
      const user = await userService.updateUser(id, userData);

      return c.json({ user });
    } catch (error) {
      console.error("Error updating user:", error);
      return c.json({ error: "ユーザーの更新に失敗しました" }, 500);
    }
  },

  // ユーザーを削除
  async deleteUser(c: Context) {
    try {
      const id = Number.parseInt(c.req.param("id"));
      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです" }, 400);
      }

      await userService.deleteUser(id);

      return c.json({ success: true }, 200);
    } catch (error) {
      console.error("Error deleting user:", error);
      return c.json({ error: "ユーザーの削除に失敗しました" }, 500);
    }
  },
};
