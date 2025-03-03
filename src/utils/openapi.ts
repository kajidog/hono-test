import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import YAML from "yaml";
import { z } from "zod";

// Zodを拡張してOpenAPI機能を追加
extendZodWithOpenApi(z);

// OpenAPIレジストリのインスタンスを作成
export const registry = new OpenAPIRegistry();

// OpenAPI仕様を生成する関数
export const generateOpenApiSpec = () => {
  // OpenAPI情報を登録
  registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });

  // OpenAPI仕様を生成
  const generator = new OpenApiGeneratorV3(registry.definitions);

  const document = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Hono Bun API",
      version: "1.0.0",
      description: "Hono Bun APIのOpenAPI仕様",
    },
    servers: [{ url: "http://localhost:3000" }],
  });

  // OpenAPI仕様をYAML形式で保存
  try {
    const jsonOutputPath = join(process.cwd(), "openapi.json");
    const yamlOutputPath = join(process.cwd(), "openapi.yaml");

    // JSON形式で保存
    writeFileSync(jsonOutputPath, JSON.stringify(document, null, 2));
    console.log(`OpenAPI仕様(JSON)が生成されました: ${jsonOutputPath}`);

    // YAML形式で保存
    writeFileSync(yamlOutputPath, YAML.stringify(document));
    console.log(`OpenAPI仕様(YAML)が生成されました: ${yamlOutputPath}`);
  } catch (error) {
    console.error("OpenAPI仕様の生成に失敗しました:", error);
  }
};

// スキーマの登録用ヘルパー関数
export const registerSchema = (name: string, schema: z.ZodTypeAny) => {
  return registry.register(name, schema);
};

/**
 * OpenAPI仕様ドキュメントを生成する関数
 * @param registry OpenAPIレジストリ
 * @returns OpenAPI仕様ドキュメント
 */
export function createOpenApiDocument(registry: OpenAPIRegistry) {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Hono + Prisma API",
      version: "1.0.0",
      description: "API documentation for Hono + Prisma application",
    },
    servers: [{ url: "http://localhost:3000" }],
  });
}
