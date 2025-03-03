import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTodo } from "../models/CreateTodo";
import type { Todo } from "../models/Todo";
export class DefaultService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 全てのTodoを取得
   * 全てのTodoのリストを取得します
   * @returns any Todoのリスト
   * @throws ApiError
   */
  public getApiTodos(): CancelablePromise<{
    data: Array<Todo>;
    success?: boolean;
    message?: string;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/api/todos",
      errors: {
        500: "サーバーエラー",
      },
    });
  }
  /**
   * 新しいTodoを作成
   * 新しいTodoを作成します
   * @param requestBody
   * @returns any 作成されたTodo
   * @throws ApiError
   */
  public postApiTodos(requestBody?: CreateTodo): CancelablePromise<{
    data: Todo;
    success?: boolean;
    message?: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/api/todos",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: "バリデーションエラー",
        500: "サーバーエラー",
      },
    });
  }
  /**
   * IDでTodoを取得
   * 指定されたIDのTodoを取得します
   * @param id
   * @returns any Todo
   * @throws ApiError
   */
  public getApiTodos1(id: string): CancelablePromise<{
    data: Todo;
    success?: boolean;
    message?: string;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/api/todos/{id}",
      path: {
        id: id,
      },
      errors: {
        404: "Todoが見つかりません",
        500: "サーバーエラー",
      },
    });
  }
}
