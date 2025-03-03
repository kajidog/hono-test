// 注意: このファイルは、クライアントコードが生成された後に使用できます。
// 以下のコマンドでクライアントコードを生成してください:
// bun run client:generate

// クライアントコードが生成されたので、実際に使用できます
import { HonoBunClient } from "../client";

// クライアントのインスタンスを作成
const apiClient = new HonoBunClient({
  BASE: "http://localhost:3000",
});

// 非同期関数でAPIを呼び出す例
export async function exampleUsage() {
  try {
    // 全てのTodoを取得
    const allTodos = await apiClient.default.getApiTodos();
    console.log("全てのTodo:", allTodos);

    // 新しいTodoを作成
    const newTodo = await apiClient.default.postApiTodos({
      title: "クライアントから作成したTodo",
      description: "OpenAPI Generatorで生成されたクライアントを使用",
      userId: 1,
    });
    console.log("作成されたTodo:", newTodo);

    if (newTodo.data?.id) {
      // IDでTodoを取得
      const todoId = String(newTodo.data.id);
      const singleTodo = await apiClient.default.getApiTodos1(todoId);
      console.log("取得したTodo:", singleTodo);
    }
  } catch (error) {
    console.error("APIエラー:", error);
  }
}

// 使用例を実行する場合はコメントを外してください
// exampleUsage();

// このファイルは実行例を示すためのものです。
// 実際のアプリケーションでは、このクライアントを使用して
// フロントエンドからバックエンドAPIを呼び出すことができます。
