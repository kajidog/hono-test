import { Hono } from "hono";
import { todoController } from "../controllers/todoController";

// Todoルーター
const todoRouter = new Hono();

// TodoのCRUDエンドポイント
todoRouter.get("/", todoController.getAllTodos);
todoRouter.get("/:id", todoController.getTodoById);
todoRouter.post("/", todoController.createTodo);
todoRouter.put("/:id", todoController.updateTodo);
todoRouter.delete("/:id", todoController.deleteTodo);
todoRouter.patch("/:id/toggle", todoController.toggleTodoCompleted);

// ユーザーのTodoを取得するエンドポイント
todoRouter.get("/user/:userId", todoController.getTodosByUserId);

export default todoRouter;
