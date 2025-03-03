import "../models/schemas";
import { generateOpenApiSpec } from "../utils/openapi";

// OpenAPI仕様を生成
generateOpenApiSpec();

console.log("OpenAPI仕様の生成が完了しました！");
