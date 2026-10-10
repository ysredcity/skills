#!/usr/bin/env node
/**
 * 把交付物的权威文件同步进 Skill 包，使 skill/pangea-design/ 成为自洽、可独立上传其它 Agent 平台的目录。
 *
 * 单一事实源仍在仓库根（tokens.json / design.md / scripts/lint/color-lint.cjs）；
 * 本脚本把它们复制到 skill/pangea-design/references/（生成物，勿手改）。
 *
 * 用法：node scripts/sync-skill.cjs   （build-tokens 之后或改 design.md 后运行）
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const REF = path.join(ROOT, "skill", "pangea-design", "references");

fs.mkdirSync(REF, { recursive: true });

const copies = [
  ["tokens.json", "tokens.json"],
  ["design.md", "design.md"],
  ["scripts/lint/color-lint.cjs", "color-lint.cjs"],
];

for (const [src, dst] of copies) {
  fs.copyFileSync(path.join(ROOT, src), path.join(REF, dst));
  console.log(`synced ${src} → skill/pangea-design/references/${dst}`);
}
console.log("Skill 包已同步：skill/pangea-design/ 自洽，可独立打包上传。");
