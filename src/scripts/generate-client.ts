import { execSync } from "node:child_process";
import path from "node:path";

// クライアントコードの生成先ディレクトリ
const outputDir = path.join(process.cwd(), "src/client");

// OpenAPI仕様のパス
const openApiPath = path.join(process.cwd(), "openapi.json");

// クライアントコードを生成するコマンド
const command = `bunx openapi --input ${openApiPath} --output ${outputDir} --client fetch --name HonoBunClient`;

console.log("クライアントコードを生成しています...");
console.log(command);

try {
  // コマンドを実行
  execSync(command, { stdio: "inherit" });
  console.log(`クライアントコードが生成されました: ${outputDir}`);
} catch (error) {
  console.error("クライアントコードの生成に失敗しました:", error);
  process.exit(1);
}
