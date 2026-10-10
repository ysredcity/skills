---
name: pangea-design
description: 用 Pangea AI 设计系统（海信，基于 shadcn/ui + Tailwind CSS）产出一致的界面与组件。覆盖 Web / 移动 / 桌面 / 大屏，含亮暗双主题。当用户要"做个页面/组件/界面/原型"、"实现 UI"、"按设计系统/规范开发"、"配色/间距/圆角/字体/暗色适配"、"用 token 出样式"、或任何需要让产出符合 Pangea/海信视觉规范并保持一致（不要自由发挥）的场景时，触发本技能。它把机读设计系统（tokens + 规范 + 校验）作为单一事实源，约束 AI 只用既定 token、不裸写颜色/尺寸、不自造组件。
---

# Pangea AI 设计系统 · 消费技能

你在用 Pangea AI 设计系统产界面。它是一套**机读设计系统**：单一事实源是 token 文件，目的是让你**产出处处一致，不要自由发挥**。基于 shadcn/ui + Tailwind CSS，跨终端（Web / 移动 / 桌面 / 大屏），含亮/暗双主题。

> 本技能自洽：所需文件都在本技能目录的 `references/` 下，无需仓库其它文件。

## 一条铁律
**值只从 token 取；颜色只用语义 token（`primary`/`foreground`/`border`…），字体、间距、圆角、断点、组件尺寸只用既定档位——绝不裸写像素、绝不自造色、绝不加规范外的装饰。** 优先用 CSS 变量 / token 引用而非字面值。

## 动手前先读（按序）
1. `references/tokens.json`（**唯一消费的 token 文件，自洽**）：
   - `primitive` 段：调色板 + spacing/radius/font/breakpoint/container/blur/opacity/borderWidth 全量刻度（取原始刻度值来这里）。
   - `color` 段：语义 token，每个含 `light`/`dark` + primitive 血缘（**组件与界面只引语义 token**）。
   - `textStyles` / `component` / `shadow`：复合文本样式、组件尺寸档、阴影。
2. `references/design.md` —— 原则、颜色/排版/布局/组件速查、Do/Don't。

> `tokens.json` 为生成物（自洽、单一事实源），**勿手改**；取任何 token 值一律读它。

## 字体（开发层）
字族参照 shadcn/ui（Tailwind 默认栈）：`sans = ui-sans-serif, system-ui, sans-serif…`。**CJK 由 `system-ui` 按操作系统自动渲染**（macOS=苹方 / Windows=微软雅黑），不硬编码中文字体。字号/行高/字重取 `primitive.font` 与 `textStyles`。

## 暗色与跨终端
- 组件**只引语义 token**；暗色取同名 token 的 `dark` 值，组件零改自动适配。触发：`prefers-color-scheme: dark` 或 `[data-theme="dark"]`。
- 跨终端布局用 `primitive.breakpoint`（sm640/md768/lg1024/xl1280/2xl1536）与 `primitive.container` 宽度档；不同终端共用同一套语义 token。

## 产出前自查（强制门禁 · 必须逐条过）
完成前**逐条核对**，任一不过就改到过为止：
- [ ] 颜色只来自语义 token（语义再引 primitive）；无裸写 hex、无自造色。
- [ ] 文本用 `textStyles` 复合样式，未手设字号/行高/字重。
- [ ] 间距/圆角/断点/组件高度只用 token 档位，无 3/7/13px 等非档值。
- [ ] 一组只有一个 primary；主操作用 `primary`，危险操作用 `destructive`（不设默认、不上主色）。
- [ ] 不靠颜色单独传达状态：状态/数据系列配图标/文字/形状；纯图标按钮带 `aria-label`。
- [ ] 对比度正文 ≥ 4.5:1，亮暗两套都过。
- [ ] 暗色只用语义 token，未为暗色单独硬编码颜色。

## 机器校验（兜底）
产出涉及颜色时，用内置校验器跑白名单校验，必须 exit 0：

```sh
node references/color-lint.cjs <你的代码目录>
```

它以 `references/tokens.json` 为白名单，拦截任何不在 token 内的 hex。被拦截就改用语义 token 或 CSS 变量。

## 改 token 怎么办
不要手改 `references/tokens.json`（生成物）。需要调整 token 时走团队的设计系统维护流程统一更新，**不要在消费侧改色或新增色**。

**拿不准就回到 `references/tokens.json` 和 `references/design.md`，不要猜。你的工作是执行这套规范，不是设计。**
