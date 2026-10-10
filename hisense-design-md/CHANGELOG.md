# Changelog 更新日志

本项目所有重要变更记录于此。格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [语义化版本 SemVer](https://semver.org/lang/zh-CN/)。

单一事实源在 `source/`（Figma 原始导出），`tokens.json` 与 Skill 包 `references/` 均由 `scripts/` 派生。

## [Unreleased]

### 新增
- **生成管线**：`scripts/build-tokens.cjs`（`source/` → 自洽 `tokens.json`）、`scripts/sync-skill.cjs`（同步进 Skill 包），`npm run build` 串联两者。
- **颜色白名单校验** `scripts/lint/color-lint.cjs`（L4 硬约束）：以 `tokens.json` 为白名单拦截裸写/越界 hex；位置自适应（仓库内与 Skill 内置均可运行）；接入 `.github/workflows/lint.yml` CI。
- **自洽 Skill 包** `skill/pangea-design/`：`SKILL.md` + `references/`（内置 `tokens.json` / `design.md` / 校验器），可独立打包上传其它 Agent 平台。
- **多通道投递**：`AGENTS.md`（裸文件入口）、`skill/`（Skill）、`rules/pangea-design.md`（Rules/Steering 常驻铁律）。
- `CONTRIBUTING.md` 固化派生管线与改动顺序。

### 变更
- **token 架构**：`tokens.json` 成为唯一被消费的自洽文件（primitive 调色板 + 全量刻度 + semantic light/dark + 组件/文本/阴影）；`Value/Light/Dark.tokens.json` 降为 `source/` 构建输入，不直接消费。
- **字体**：开发层字族改为参照 shadcn/ui（Tailwind 默认栈），CJK 经 `system-ui` 按 OS 渲染；Figma 苹方仅作设计阶段统一，不进开发。
- **描述**：技术栈表述由 “shadcn/ui + Base UI + Tailwind CSS” 收窄为 “shadcn/ui + Tailwind CSS”。
- **语义层**：取自 Figma 官方语义导出（Light/Dark 模式，带对 primitive 的 alias），46 个语义 token；修正暗色 `background` 为 `neutral.900 #171717`。

### 其它
- `_reference/`（外部参考 Vercel/AhamUI + 分析文档 + 调色板参考 + 生成参考脚本）被 `.gitignore` 排除，不交付；交付物不引用它。
- `allowlist.generated.json`（lint 运行时快照）全局 gitignore。

[Unreleased]: https://github.com/hisense/pangea-design/compare/HEAD
