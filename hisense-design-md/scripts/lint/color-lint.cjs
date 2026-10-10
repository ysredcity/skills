#!/usr/bin/env node
/**
 * 颜色白名单校验（P1·L4 硬约束）
 *
 * 规则：代码/样式里出现的每个 hex 颜色，必须能在设计系统的 token 文件中找到；
 *       否则视为「裸写/自造色」，校验失败。鼓励改用 CSS 变量 / 语义 token。
 *
 * 白名单来源（交付物里出现的所有 hex 自动汇总；tokens.json 已自洽含 primitive 调色板 + semantic）：
 *   - tokens.json   （primitive 调色板 + semantic light/dark + 组件 + 阴影色）
 *
 * 用法：
 *   node scripts/lint/color-lint.cjs [scanPath ...]      # 默认扫描 cwd
 *   node scripts/lint/color-lint.cjs src                 # 指定目录/文件
 *   node scripts/lint/color-lint.cjs --json src          # 机器可读输出
 *
 * 退出码：0 = 通过；1 = 发现违规（CI 拦截）。
 *
 * 零依赖（仅 Node 内置）。后续可在 rules/ 下扩展更多规则（非档间距/圆角、一组多 primary 等）。
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
// 白名单来源 = 自洽的 tokens.json（含 primitive 调色板 + semantic），确保 CI / GitHub 上可独立运行
const TOKEN_FILES = ["tokens.json"];

// 扫描的代码/样式扩展名
const SCAN_EXT = new Set([
  ".css", ".scss", ".sass", ".less",
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".vue", ".svelte", ".html", ".htm",
]);

// 不扫描的目录与文件（token/规范文件本身允许出现 hex；下划线/点开头目录视为非源码，跳过）
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", "out", ".next", "coverage"]);
const SKIP_FILES = new Set([
  "tokens.json", "design.md",
]);

const HEX_RE = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;

/** 归一化为 #rrggbb 或 #rrggbbaa（小写）。3/4 位展开为 6/8 位。 */
function norm(hex) {
  let h = hex.replace("#", "").toLowerCase();
  if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("");
  return "#" + h;
}

/** 一个 hex 的等价形式集合（用于跨 6/8 位的全不透明匹配）。 */
function variants(n) {
  const set = new Set([n]);
  const h = n.slice(1);
  if (h.length === 8 && h.endsWith("ff")) set.add("#" + h.slice(0, 6)); // #rrggbbff -> #rrggbb
  if (h.length === 6) set.add("#" + h + "ff");                          // #rrggbb -> #rrggbbff
  return set;
}

/** 解析 token 文件位置：兼容仓库内（scripts/lint/）与技能内置（skill 的 references 目录）两种摆放。 */
function resolveTokenFile(name) {
  const candidates = [
    path.join(ROOT, name),            // 仓库根
    path.join(__dirname, name),       // 与脚本同目录（技能 references/ 内置）
    path.join(__dirname, "..", name), // 上一级
  ];
  return candidates.find((p) => fs.existsSync(p)) || path.join(ROOT, name);
}

/** 从 token 文件原文里正则汇总所有 hex，构建白名单。 */
function buildAllowlist() {
  const allowed = new Set();
  const sources = {};
  for (const f of TOKEN_FILES) {
    const p = resolveTokenFile(f);
    if (!fs.existsSync(p)) continue;
    const text = fs.readFileSync(p, "utf8");
    const found = text.match(HEX_RE) || [];
    sources[f] = 0;
    for (const raw of found) {
      for (const v of variants(norm(raw))) allowed.add(v);
      sources[f]++;
    }
  }
  return { allowed, sources };
}

function walk(target, files) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    const base = path.basename(target);
    if (SKIP_DIRS.has(base) || base.startsWith(".") || base.startsWith("_")) return;
    for (const entry of fs.readdirSync(target)) walk(path.join(target, entry), files);
  } else if (stat.isFile()) {
    if (SKIP_FILES.has(path.basename(target))) return;
    if (SCAN_EXT.has(path.extname(target))) files.push(target);
  }
}

function lintFile(file) {
  const violations = [];
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    let m;
    HEX_RE.lastIndex = 0;
    while ((m = HEX_RE.exec(line)) !== null) {
      const raw = m[0];
      const ok = [...variants(norm(raw))].some((v) => ALLOWED.has(v));
      if (!ok) {
        violations.push({ file, line: i + 1, col: m.index + 1, hex: raw, snippet: line.trim().slice(0, 120) });
      }
    }
  });
  return violations;
}

// ---- main ----
const args = process.argv.slice(2);
const asJson = args.includes("--json");
const paths = args.filter((a) => !a.startsWith("--"));
const targets = paths.length ? paths.map((p) => path.resolve(p)) : [process.cwd()];

const { allowed, sources } = buildAllowlist();
const ALLOWED = allowed;

// 透明留痕：把白名单落盘，便于审阅
fs.writeFileSync(
  path.join(__dirname, "allowlist.generated.json"),
  JSON.stringify({ count: ALLOWED.size, sources, hexes: [...ALLOWED].sort() }, null, 2) + "\n"
);

const files = [];
for (const t of targets) {
  if (fs.existsSync(t)) walk(t, files);
}

let all = [];
for (const f of files) all = all.concat(lintFile(f));

if (asJson) {
  console.log(JSON.stringify({ scanned: files.length, allowlistSize: ALLOWED.size, violations: all }, null, 2));
} else {
  console.log(`color-lint · 白名单 ${ALLOWED.size} 色（来源 ${Object.entries(sources).map(([k, v]) => `${k}:${v}`).join(", ")}）`);
  console.log(`扫描 ${files.length} 个文件`);
  if (all.length === 0) {
    console.log("✓ 未发现裸写/越界颜色");
  } else {
    for (const v of all) {
      const rel = path.relative(ROOT, v.file);
      console.log(`✗ ${rel}:${v.line}:${v.col}  ${v.hex}  →  ${v.snippet}`);
    }
    console.log(`\n共 ${all.length} 处越界颜色。请改用 token 颜色（语义 token 或 primitive 调色板），或用 CSS 变量引用。`);
  }
}

process.exitCode = all.length ? 1 : 0;
