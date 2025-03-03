import type { Context } from "hono";
import { CreateTodoSchema, UpdateTodoSchema } from "../models/schemas";
import { todoService } from "../services/todoService";

export const todoController = {
  // 全Todoを取得
  async getAllTodos(c: Context) {
    try {
      const todos = await todoService.getAllTodos();
      return c.json({ todos, success: true });
    } catch (error) {
      console.error("Error getting todos:", error);
      return c.json({ error: "Todoの取得に失敗しました", success: false }, 500);
    }
  },

  // ユーザーのTodoを取得
  async getTodosByUserId(c: Context) {
    try {
      const userId = Number.parseInt(c.req.param("userId"));
      if (Number.isNaN(userId)) {
        return c.json({ error: "無効なユーザーIDです", success: false }, 400);
      }

      const todos = await todoService.getTodosByUserId(userId);
      return c.json({ todos, success: true });
    } catch (error) {
      console.error("Error getting todos by user:", error);
      return c.json({ error: "Todoの取得に失敗しました", success: false }, 500);
    }
  },

  // IDでTodoを取得
  async getTodoById(c: Context) {
    try {
      const id = Number.parseInt(c.req.param("id"));
      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです", success: false }, 400);
      }

      const todo = await todoService.getTodoById(id);
      if (!todo) {
        return c.json({ error: "Todoが見つかりません", success: false }, 404);
      }

      return c.json({ todo, success: true });
    } catch (error) {
      console.error("Error getting todo:", error);
      return c.json({ error: "Todoの取得に失敗しました", success: false }, 500);
    }
  },

  // Todoを作成
  async createTodo(c: Context) {
    try {
      const body = await c.req.json();
      const validationResult = CreateTodoSchema.safeParse(body);

      if (!validationResult.success) {
        return c.json({ error: validationResult.error.errors, success: false }, 400);
      }

      const todoData = validationResult.data;
      const todo = await todoService.createTodo(todoData);

      return c.json({ todo, success: true }, 201);
    } catch (error) {
      console.error("Error creating todo:", error);
      return c.json({ error: "Todoの作成に失敗しました", success: false }, 500);
    }
  },

  // Todoを更新
  async updateTodo(c: Context) {
    try {
      const id = Number.parseInt(c.req.param("id"));
      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです", success: false }, 400);
      }

      const body = await c.req.json();
      const validationResult = UpdateTodoSchema.safeParse(body);

      if (!validationResult.success) {
        return c.json({ error: validationResult.error.errors, success: false }, 400);
      }

      const todoData = validationResult.data;
      const todo = await todoService.updateTodo(id, todoData);

      return c.json({ todo, success: true });
    } catch (error) {
      console.error("Error updating todo:", error);
      return c.json({ error: "Todoの更新に失敗しました", success: false }, 500);
    }
  },

  // Todoを削除
  async deleteTodo(c: Context) {
    try {
      const id = Number.parseInt(c.req.param("id"));
      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです", success: false }, 400);
      }

      await todoService.deleteTodo(id);

      return c.json({ success: true }, 200);
    } catch (error) {
      console.error("Error deleting todo:", error);
      return c.json({ error: "Todoの削除に失敗しました", success: false }, 500);
    }
  },

  // Todoの完了状態を切り替え
  async toggleTodoCompleted(c: Context) {
    try {
      const id = Number.parseInt(c.req.param("id"));
      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです", success: false }, 400);
      }

      const todo = await todoService.toggleTodoCompleted(id);

      return c.json({ todo, success: true });
    } catch (error) {
      console.error("Error toggling todo completion:", error);
      return c.json({ error: "Todoの更新に失敗しました", success: false }, 500);
    }
  },
};
