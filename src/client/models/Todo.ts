/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Todo = {
  /**
   * Todo ID
   */
  id: number;
  /**
   * Todoのタイトル
   */
  title: string;
  /**
   * Todoの詳細説明
   */
  description?: string | null;
  /**
   * Todoの完了状態
   */
  completed?: boolean;
  /**
   * ユーザーID
   */
  userId: number;
  /**
   * 作成日時
   */
  createdAt: string;
  /**
   * 更新日時
   */
  updatedAt: string;
};
