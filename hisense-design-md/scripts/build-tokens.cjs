#!/usr/bin/env node
/**
 * Token 派生管线：从 Figma 原始导出生成自洽的 tokens.json（交付物）。
 *
 * 输入（committed 构建输入，原始 Figma 导出，勿手改）：
 *   - source/Value.tokens.json   primitive 原始层（TailwindCSS collection，"Value" 模式）
 *   - source/Light.tokens.json   semantic 语义层 · Light 模式（带对 primitive 的 alias）
 *   - source/Dark.tokens.json    semantic 语义层 · Dark 模式
 *
 * 输出（交付物，被消费，勿手改）：
 *   - tokens.json   自洽：primitive（调色板 + 全量刻度）+ semantic（light/dark + 血缘）+ 组件/文本/阴影层
 *
 * 用法：node scripts/build-tokens.cjs   （改 source/ 原始导出后重跑；CI 可校验产物是否最新）
 */

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), "utf8"));

const value = read("source/Value.tokens.json");
const light = read("source/Light.tokens.json");
const dark = read("source/Dark.tokens.json");

// ---------- primitive（取自 Value） ----------
const px = (n) => `${n}px`;
const isGroupKey = (k) => !k.startsWith("$");

/** 数值组 → {key: 值}；unit 为真时给数字加单位（如 px）。 */
function mapNum(grp, unit) {
  const o = {};
  for (const k of Object.keys(grp).filter(isGroupKey)) o[k] = unit ? `${grp[k].$value}${unit}` : grp[k].$value;
  return o;
}
function mapStr(grp) {
  const o = {};
  for (const k of Object.keys(grp).filter(isGroupKey)) o[k] = grp[k].$value;
  return o;
}
/** 调色板：family→{step:hex}；black/white/transparent 为单值。 */
function buildPalette(colors) {
  const o = {};
  for (const name of Object.keys(colors).filter(isGroupKey)) {
    const node = colors[name];
    if (node.$value && node.$value.hex) o[name] = node.$value.hex.toLowerCase();
    else {
      o[name] = {};
      for (const step of Object.keys(node).filter(isGroupKey)) o[name][step] = node[step].$value.hex.toLowerCase();
    }
  }
  return o;
}

// 开发层字族：参照 shadcn/ui（即 Tailwind 默认字体栈）。
// 注：Figma 设计稿用「苹方 PingFang SC」仅为设计阶段统一视觉，不进开发；
//     开发层用系统字体栈，CJK 由 system-ui 按各操作系统自动渲染（macOS=苹方 / Windows=微软雅黑…）。
const DEV_FONT_FAMILY = {
  "$note": "开发层参照 shadcn/ui（Tailwind 默认栈）；CJK 经 system-ui 按 OS 渲染。Figma 设计稿用苹方仅作设计阶段统一，不进开发。",
  sans: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
};

const primitive = {
  "$description": "原始层（取自 Figma TailwindCSS collection）。颜色为 hex；长度类刻度单位 px；opacity 为百分比数值；font.weight 为字重数值；font.tracking 为 letterSpacing(px)。font.family 为开发层取值（见其 $note）。",
  color: buildPalette(value.colors),
  spacing: mapNum(value.spacing, "px"),
  radius: mapNum(value.radius, "px"),
  borderWidth: mapNum(value["border-width"], "px"),
  breakpoint: mapNum(value.breakpoint, "px"),
  container: mapNum(value.container, "px"),
  blur: mapNum(value.blur, "px"),
  opacity: mapNum(value.opacity),
  font: {
    size: mapNum(value.font.size, "px"),
    leading: mapNum(value.font.leading, "px"),
    family: DEV_FONT_FAMILY,
    weight: mapNum(value.font.weight),
    tracking: mapNum(value.font.tracking, "px"),
  },
};

// ---------- semantic（取自 Light/Dark，合并为 light/dark + primitive 血缘） ----------
function toHex(node) {
  const hex = node.$value.hex.toLowerCase();
  const a = node.$value.alpha;
  if (a >= 1) return hex;
  return hex + Math.round(a * 255).toString(16).padStart(2, "0");
}
function primitiveRef(node) {
  const alias = (node.$extensions || {})["com.figma.aliasData"];
  const name = alias && alias.targetVariableName;
  if (!name) return null;
  return name.replace(/^colors\//, "").replace(/\//g, ".");
}
function alphaNote(node) {
  const a = node.$value.alpha;
  const base = node.$value.hex.toLowerCase();
  const name = base === "#ffffff" ? "white" : base === "#000000" ? "black" : base;
  return `${name} @ ${Math.round(a * 100)}%`;
}
function side(node) {
  return { $value: toHex(node), primitive: primitiveRef(node) || alphaNote(node) };
}

const keys = Object.keys(light).filter(isGroupKey);
const color = {};
for (const k of keys) {
  color[k] = dark[k]
    ? { $type: "color", light: side(light[k]), dark: side(dark[k]) }
    : { $type: "color", light: side(light[k]) };
}

// ---------- 授权层（手工维护） ----------
const authored = {
  textStyles: {
    "$description": "复合文本样式（family+size+weight+leading+tracking，引用 primitive.font 刻度）。",
    "text-xs-medium":   { fontFamily: "sans", fontSize: "xs",   lineHeight: "xs",   fontWeight: "medium", letterSpacing: "0.12px" },
    "text-sm-medium":   { fontFamily: "sans", fontSize: "sm",   lineHeight: "sm",   fontWeight: "medium", letterSpacing: "0" },
    "text-base-medium": { fontFamily: "sans", fontSize: "base", lineHeight: "base", fontWeight: "medium", letterSpacing: "0" },
    "text-3xl-medium":  { fontFamily: "sans", fontSize: "3xl",  lineHeight: "3xl",  fontWeight: "medium", letterSpacing: "-0.6px" },
    "$todo": "其余尺寸 × 字重的复合样式待全表导出"
  },
  shadow: {
    "$description": "效果（取自 Figma effect 变量）。",
    default: { "$value": "0 1px 2px 0 #2626263d, inset 0 1px 0 0 #ffffff29", "$description": "默认投影 + 内高光" },
    xs:      { "$value": "0 1px 2px 0 #0000000d", "$description": "tailwind-shadow/xs" }
  },
  component: {
    "$description": "组件层（引用语义 token + primitive 刻度）。",
    button: {
      "$description": "Type: Default/Outline/Secondary/Destructive/DestructiveOutline/Link/Ghost；State: 默认/悬停/禁用；另有 PillButton（圆角 full）。",
      height: { xs: { "$value": "24px" }, sm: { "$value": "28px" }, base: { "$value": "32px", "$description": "默认" }, lg: { "$value": "36px" }, xl: { "$value": "40px" } },
      "$todo": "各档 padding/radius/字号绑定，及各 Type 的 fill/border/text → 语义 token 映射待逐变体导出"
    },
    "$todo": "其余 ~54 个组件尺寸与状态映射，沉淀到 extended/components.md + 此处"
  }
};

const out = {
  "$meta": {
    name: "Pangea AI Design Tokens（自洽生成物）",
    version: "0.4.0-draft",
    generatedBy: "scripts/build-tokens.cjs（改 source/ 原始导出后重跑；勿手改本文件）",
    source: "Figma — Pangea AI Components。基于 shadcn/ui + Tailwind CSS。",
    layering: "本文件自洽，被直接消费：① primitive = 调色板 + 全量刻度（取自 source/Value.tokens.json）；② color = semantic 语义层 light/dark + primitive 血缘（取自 source/Light/Dark.tokens.json）；③ textStyles/shadow/component = 授权层。",
    rule: "组件与界面只引语义 token（color.*）；语义 token 引用 primitive；刻度取自 primitive。绝不裸写像素或自造色。",
    notes: "color.<token>.{light,dark}.$value 为 resolved hex（alpha<1 为 8 位）；.primitive 为对 primitive 的 alias 名或透明色来源说明。"
  },
  primitive,
  color,
  ...authored
};

fs.writeFileSync(path.join(ROOT, "tokens.json"), JSON.stringify(out, null, 2) + "\n");
const families = Object.keys(primitive.color).length;
console.log(`tokens.json 生成完毕：primitive ${families} 色族 + 全量刻度，semantic ${keys.length} 个语义 token（含 light/dark）。`);
