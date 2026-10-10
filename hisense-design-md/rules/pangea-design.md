# Pangea AI 设计系统 · 铁律（always-include 精简版）

> 用于支持 Rules/Steering 的工具（如 Cursor/Windsurf）常驻注入。完整内容见 `design.md` / `tokens.json` / `AGENTS.md`。

- 值只从 token 取：颜色用语义 token（`primary`/`foreground`/`border`…），字体/间距/圆角/断点/组件尺寸只用既定档位。**绝不裸写像素、绝不自造色。** 优先用 CSS 变量/ token 引用。
- 取值来源：唯一消费 `tokens.json`（自洽）——`primitive` 段为调色板+全量刻度，`color` 段为语义色（含 light/dark），另有 `textStyles`/`component`/`shadow`。生成物，勿手改。
- 暗色：组件只引语义 token，取同名 token 的 `dark` 值自动适配；不为暗色单独硬编码颜色。
- 一组一个 primary；危险操作用 `destructive`（不设默认、不上主色）。
- 不靠颜色单独传达状态：配图标/文字/形状；纯图标按钮带 `aria-label`。
- 对比度正文 ≥ 4.5:1，亮暗两套都过。
- 文本用 `textStyles` 复合样式，不手设字号/行高/字重。
- 产出涉及颜色时跑 `node scripts/lint/color-lint.cjs <目录>`，必须 exit 0。
- `tokens.json` 为生成物，勿手改；调整 token 走设计系统维护流程，不要在消费侧改色或新增色。
