---
version: 0.4.0-draft
name: Pangea AI
description: Pangea AI 设计系统核心规范（机读）。基于 shadcn/ui + Tailwind CSS，跨终端，含亮/暗双主题。值的单一事实源是自洽的 tokens.json（primitive + semantic + 组件）。
status: P0 草案 — primitive + semantic（light/dark，含 primitive 血缘）已齐；组件层目前仅 Button，其余待补。
themes: [light, dark]
colors:
  # 格式：token: light → dark （括注 primitive 来源）
  background: "#ffffff → #171717 (white → neutral.900)"
  background-gray: "#f3f4f6 → #262626 (gray.100 → neutral.800)"
  foreground: "#262626 → #f5f5f5 (neutral.800 → neutral.100)"
  card: "#ffffff → #171717 (white → neutral.900)"
  popover: "#ffffff → #171717 (white → neutral.900)"
  primary: "#009689 → #009689 (teal.600)"
  primary-foreground: "#ffffff → #ffffff (white)"
  secondary: "#0000000a → #ffffff0a (black 4% → white 4%)"
  muted: "#0000000a → #ffffff0a"
  muted-foreground: "#737373 → #a1a1a1 (neutral.500 → neutral.400)"
  accent: "#0000000a → #ffffff0a"
  destructive: "#fb2c36 → #fb2c36 (red.500)"
  destructive-foreground: "#c10007 → #ff6467 (red.700 → red.400)"
  destructive-border: "#fb2c3652 → #fb2c3652 (red.500 32%)"
  destructive-bg: "#fb2c360a → #00000052 (red.500 4% → black 32%)"
  info: "#2b7fff → #2b7fff (blue.500)"
  success: "#00bc7d → #00bc7d (emerald.500)"
  warning: "#fd9a00 → #fd9a00 (amber.500)"
  border: "#00000014 → #ffffff0f (black 8% → white 6%)"
  input: "#0000001a → #ffffff14 (black 10% → white 8%)"
  ring: "#a1a1a1 → #737373 (neutral.400 → neutral.500)"
  sidebar: "#e5e7eb → #262626 (gray.200 → neutral.800)"
  # 完整 46 个语义 token（含 *-foreground / chart-1..5 / sidebar-* / code-* / transparent*）见 tokens.json
typography:
  # 开发层字族参照 shadcn/ui（Tailwind 默认栈）；CJK 经 system-ui 按 OS 渲染。苹方仅用于 Figma 设计阶段，不进开发。
  fontFamily-sans: "ui-sans-serif, system-ui, sans-serif, …emoji"
  fontFamily-serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
  fontFamily-mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, …, monospace"
  fontSize-scale: xs12 / sm14 / base16 / lg18 / xl20 / 2xl24 / 3xl30 / 4xl36 / 5xl48 … 9xl128
  fontWeight: thin100 … normal400 / medium500 / semibold600 / bold700 … black900
  text-xs-medium: { fontSize: 12px, lineHeight: 14px, fontWeight: 500, letterSpacing: 0.12px }
  text-sm-medium: { fontSize: 14px, lineHeight: 20px, fontWeight: 500, letterSpacing: 0 }
  text-base-medium: { fontSize: 16px, lineHeight: 24px, fontWeight: 500, letterSpacing: 0 }
  text-3xl-medium: { fontSize: 30px, lineHeight: 36px, fontWeight: 500, letterSpacing: -0.6px }
spacing:
  scale: 4 基 — 0 / 1=4 / 2=8 / 3=12 / 4=16 / 5=20 / 6=24 / 8=32 / 10=40 / 12=48 … 96=384（含 px / 0-5 / 1-5 / 2-5 / 3-5 及负值；全量见 tokens.json#primitive.spacing）
radius:
  scale: none0 / xs2 / sm4 / md6 / lg8 / radius10 / xl12 / 2xl16 / 3xl24 / 4xl32 / full9999
breakpoint:
  scale: sm640 / md768 / lg1024 / xl1280 / 2xl1536
button-height:
  xs: 24px
  sm: 28px
  base: 32px
  lg: 36px
  xl: 40px
primitive: tokens.json#primitive（调色板 + 全量刻度）
---

# Pangea AI

## 概述

Pangea AI 是一套面向开发者与 AI 的设计系统，基于 shadcn/ui + Tailwind CSS，覆盖 Web / 移动 / 桌面 / 大屏，提供亮/暗双主题。审美克制、内容优先、用色节制：主色只作点缀与主操作，层级靠中性表面与留白而非装饰。

**值自洽于 `tokens.json`：① `primitive` 段 = 完整调色板 + 全量刻度；② `color` 段 = semantic 语义层，每个 token 含 light/dark + 对 primitive 的血缘；③ `textStyles`/`component`/`shadow` = 授权层。组件与界面只引语义 token。** `tokens.json` 为生成物（由 `source/` 原始 Figma 导出经 `scripts/build-tokens.cjs` 生成，勿手改）。本文件给规则与意图，frontmatter 仅为速查镜像。本版为 P0 草案：primitive 与 semantic 已齐，组件全表待补。

## 颜色

采用 shadcn 语义命名，**按用途取色，不按色值挑色**；每个语义 token 都引用 primitive（Tailwind 色阶），并有 light/dark 两套（见 `tokens.json`）：

- `background` / `foreground`：页面底与主文本（白/neutral.800 → neutral.900/neutral.100）。
- `card` / `popover`（+各自 `-foreground`）：卡片与浮层表面。
- `primary` / `primary-foreground`：品牌青绿 `#009689`（teal.600），用于**单一最重要操作**与品牌点缀。
- `secondary` / `muted` / `accent`：半透明中性填充（亮=黑 4% / 暗=白 4%），用于次要按钮与 hover 底；各有 `-foreground`。
- `border`（黑 8% → 白 6%）/ `input`（黑 10% → 白 8%）/ `ring`（neutral.400 → neutral.500）：描边与焦点环。
- **状态色**：`destructive`（red.500，含 `-foreground`/`-border`/`-bg`）、`info`（blue.500）、`success`（emerald.500）、`warning`（amber.500），各有对应 `-foreground`。
- `sidebar-*` / `code-*`：侧栏与代码块的整套语义子集；`chart-1..5`：图表序列色。
- `transparent` / `transparent-popover`：透明占位（暗色下基色不同）。

暗色用同名 token 的 `dark` 值（`background #171717` / `card #171717` / `foreground #f5f5f5`…），组件零改自动适配。**暗色值上线前需实测对比度。** 一律用语义 token，**不为暗色单独硬编码颜色**。

## 排版

字族：**开发层参照 shadcn/ui（即 Tailwind 默认字体栈）**——`sans` = `ui-sans-serif, system-ui, sans-serif, …`、`serif` = `ui-serif, Georgia, …`、`mono` = `ui-monospace, …`；**CJK 由 `system-ui` 按操作系统自动渲染**（macOS=苹方 / Windows=微软雅黑），无需硬编码中文字体。（Figma 设计稿用苹方 `PingFang SC` 只为设计阶段统一视觉，不进开发。）**用复合文本样式 `textStyles`（如 `text-sm-medium`）整体取用，不手设字号/行高/字重。** 字号-行高刻度（取自 primitive）：`xs 12/14` · `sm 14/20` · `base 16/24` · `lg 18/28` · `xl 20/28` · `2xl 24/32` · `3xl 30/36` … 至 `9xl 128`。字重 `thin 100` 到 `black 900`，UI 常用 `medium 500`/`semibold 600`，正文 `normal 400`。`text-sm-medium`（14/20）覆盖多数 UI 文本。

## 布局与间距

间距遵循 **4 基刻度**（Tailwind 风格，取自 primitive）：0 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 … 384px，另含 `px`、`0-5`(2) / `1-5`(6) / `2-5`(10) / `3-5`(14) 及负值。保持节奏：组内小间距、组间中间距、区块大间距。**跨终端断点**（单一事实源）：`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`；容器宽度档 `3xs 256 … 7xl 1280`。多端布局细则见 `extended/layout.md`（待建）。

## 形状

圆角档（取自 primitive）：`none 0` / `xs 2` / `sm 4` / `md 6` / `lg 8` / `radius 10` / `xl 12` / `2xl 16` / `3xl 24` / `4xl 32` / `full 9999`（px）。胶囊形（PillButton）用 `full`。一个视图内保持一套圆角家族，不混圆角与直角。

## 阴影

克制使用。`shadow.default`（投影 + 内高光）用于浮起控件；`shadow.xs` 用于轻微抬升。静置表面尽量无阴影，层级优先靠表面与边框。

## 组件

组件**只引语义 token**，尺寸只用既定档。以 Button 为例（取自 Figma 变体）：

- **高度档**：xs 24 / sm 28 / base 32（默认）/ lg 36 / xl 40 px。
- **类型**：Default（主色填充）/ Outline / Secondary / Destructive / DestructiveOutline / Link / Ghost；另有 **PillButton**（圆角 full）。
- **状态**：默认 / 悬停 / 禁用。
- **规则**：一组一个 primary；危险操作用 `destructive` 且不设默认、不上主色；禁用降不透明度。

完整组件清单（~55 个：Accordion / Alert / Alert Dialog / Autocomplete / Avatar / Badge / Breadcrumb / Button / Calendar / Card / Checkbox / Combobox / Command / Dialog / Drawer / Field / Form / Input / Menu / Pagination / Popover / Progress / Select / Separator / Sheet / Slider / Switch / Table / Tabs / Textarea / Toast / Toggle / Tooltip …）的状态与尺寸映射沉淀到 `extended/components.md`（待建）。

## Do's and Don'ts

- 用语义 token 取色（`primary`/`foreground`/`border`），**不裸写 hex、不自造色**。
- 用 `textStyles` 复合样式，不手设字号/行高/字重。
- 间距/圆角/组件高度**只用 `tokens.json` 档位**。
- **一组一个 primary**；危险操作用 `destructive`，不设默认、不上主色。
- **不靠颜色单独传达**：状态/数据系列配图标/文字/形状；纯图标按钮带 `aria-label`。
- 保持对比度（正文 ≥ 4.5:1），亮暗两套都要过。
- 不混圆角与直角、不在一个视图用超过两种字重。
- 暗色只用语义 token，不单独硬编码颜色。
