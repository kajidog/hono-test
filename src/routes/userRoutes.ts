import { Hono } from "hono";
import { userController } from "../controllers/userController";

// ユーザールーター
const userRouter = new Hono();

// ユーザーのCRUDエンドポイント
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
