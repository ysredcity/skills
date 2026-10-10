# AGENTS.md — 给 AI 的消费指引

**你是 AI（编码/设计 agent），要用 Pangea AI 设计系统产界面？先读完这页再动手。**

这是一套**机读设计系统**：单一事实源是 `tokens.json`，目的是让你**产出一致结果，不要自由发挥**。基于 shadcn/ui + Tailwind CSS，跨终端（Web / 移动 / 桌面 / 大屏）。

## 一条铁律
**值只从 token 文件取；颜色只用语义 token（`primary`/`foreground`/`border`…），字体、间距、圆角、断点、组件尺寸只用既定档位——绝不裸写像素、绝不自造色、绝不加规范外的装饰。**

## 消费顺序
1. **取值** → `tokens.json`（**唯一消费的 token 文件，自洽**）：
   - `primitive` 段：完整调色板 + spacing / radius / font / breakpoint / container / blur / opacity / borderWidth 全量刻度。
   - `color` 段：语义 token，每个含 `light`/`dark` + 对 primitive 的血缘。**组件与界面只引语义 token。**
   - `textStyles` / `component` / `shadow`：复合文本样式、组件尺寸档、阴影。
   - `tokens.json` 为生成物，**勿手改**（生成管线见下）。
2. **取规则** → `design.md`：原则、颜色/排版/布局/组件速查、Do/Don't。
3. **取细节**（按需）→ `extended/*.md`：布局多端、组件状态全矩阵、无障碍、特定介质。
4. **看成品**（拼装时）→ `examples/`。

> 不支持 Skill 的工具：把 `AGENTS.md` + `design.md` + `tokens.json` 喂进上下文即可工作（`tokens.json` 已自洽，无需其它文件）。
>
> **生成管线（维护者）**：原始 Figma 导出在 `source/`（`Value/Light/Dark.tokens.json`），改后跑 `node scripts/build-tokens.cjs` 重新生成 `tokens.json`。消费方无需关心 `source/`。

## 暗色
组件**只引语义 token**；暗色由 `tokens.json` 的 `color.dark` 段覆盖，组件零改自动适配。触发：`prefers-color-scheme: dark` 或 `[data-theme="dark"]`。暗色值现为**提案，需实测对比度**。

## 产出前自查（= lint 规则，最常违反）
- 颜色**只来自语义 token**（语义 token 再引 primitive）；不裸写 hex、不自造色。
- 文本用 `textStyles` 复合样式，不手设字号/行高/字重。
- 间距/圆角/断点/组件高度**只用 token 档位**（primitive 刻度），不写 3/7/13px 等非档值。
- **一组一个 primary**；主操作用 `primary`，危险操作用 `destructive`（不设默认、不上主色）。
- **不靠颜色单独传达**：状态/数据系列除颜色外必有图标/文字/形状；纯图标按钮必有可访问名（aria-label）。
- 对比度：正文 ≥ 4.5:1；亮暗两套都要过。
- 暗色只用语义 token，不为暗色单独硬编码颜色。

## 文件清单
| 文件/目录 | 用途 |
|---|---|
| `tokens.json` | **唯一消费的 token 文件**（自洽：primitive 调色板+全量刻度 / semantic light+dark / 组件 / 阴影；生成物，勿手改） |
| `design.md` | 规则（精炼核心规范，对标 Geist 密度） |
| `source/` | 原始 Figma 导出（`Value/Light/Dark.tokens.json`，生成 `tokens.json` 的构建输入，消费方无需读） |
| `scripts/build-tokens.cjs` | 生成管线（`source/` → `tokens.json`） |
| `scripts/sync-skill.cjs` | 把 `tokens.json`/`design.md`/校验器同步进 Skill 包 |
| `scripts/lint/` | 颜色白名单校验（CI 兜底，与 Agent 无关） |
| `skill/pangea-design/` | **自洽 Skill 包**（含 `references/` 内置 token+规范+校验器，可独立上传其它平台） |
| `rules/pangea-design.md` | 精简铁律（Rules/Steering 类工具常驻注入） |
| `CONTRIBUTING.md` / `CHANGELOG.md` | 治理：派生管线/改动顺序、变更记录 |
| `extended/*.md` | 按需细则（布局/组件/无障碍/介质） |
| `examples/` | 页型成品 |

**拿不准就回到 `tokens.json` 和 `design.md`，不要猜。你的工作是执行这套规范，不是设计。**
