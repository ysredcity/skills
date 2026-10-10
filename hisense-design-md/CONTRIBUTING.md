# 贡献指南 Contributing

Pangea AI 是一套**机读设计系统**：单一事实源驱动、生成物自洽、约束靠机器兜底。改动务必按本指南，保持各产物一致。

## 核心理念：单一事实源 + 派生管线

```
source/*.tokens.json  ──build-tokens──▶  tokens.json  ──sync-skill──▶  skill/pangea-design/references/
（Figma 原始导出，构建输入）            （唯一消费的自洽 token）        （自洽 Skill 包，可独立上传）
```

- **`source/`**：Figma 原始导出（`Value/Light/Dark.tokens.json`），构建输入，**不被直接消费**。
- **`tokens.json`**：生成物，**唯一被消费的 token 文件**（primitive 调色板 + 全量刻度、semantic light/dark、textStyles/component/shadow）。**勿手改。**
- **`skill/pangea-design/references/`**：`tokens.json` / `design.md` / 校验器的副本，使 Skill 自洽可独立上传。**勿手改（由脚本同步）。**
- **`_reference/`**：仅本地的外部参考与分析文档，被 `.gitignore` 排除，**不交付**，交付文件中不得引用它。

## 改动顺序（务必遵守）

### A. 改 token 值（颜色/间距/字号/组件…）
1. 在 Figma 重新导出，覆盖 `source/` 对应的 `Value/Light/Dark.tokens.json`。
2. 跑生成：
   ```sh
   npm run build        # = build-tokens（生成 tokens.json）+ sync-skill（同步进 Skill 包）
   ```
3. 校验：
   ```sh
   npm run lint         # 颜色白名单校验，必须 exit 0
   ```
4. 在 `CHANGELOG.md` 的 `[Unreleased]` 下记录改动。

> 不要手改 `tokens.json` / `skill/**/references/*`——它们是生成物，会被重新生成覆盖。
> 开发层字族在 `scripts/build-tokens.cjs` 的 `DEV_FONT_FAMILY` 覆盖（参照 shadcn/ui）；Figma 的苹方仅作设计阶段统一，不进开发。

### B. 改规则/文案（`design.md`、`AGENTS.md`、`SKILL.md`、`rules/`）
1. 改 `design.md`（规则单一事实源）。
2. `npm run sync:skill` 把 `design.md` 同步进 Skill 包。
3. 同步影响到的 `AGENTS.md` / `SKILL.md` / `rules/pangea-design.md`（保持一致）。
4. 记 `CHANGELOG.md`。

### C. 改生成/校验脚本（`scripts/`）
1. 改脚本后跑 `npm run build && npm run lint` 自测。
2. 若改了校验器 `scripts/lint/color-lint.cjs`，跑 `npm run sync:skill` 更新 Skill 内置副本。
3. 记 `CHANGELOG.md`。

## 铁律（提交前自查）

- 颜色只用语义 token（`color.*`，再引 primitive）；其它值只用既定档位。**绝不裸写像素、绝不自造色。**
- 字体走 shadcn/ui（Tailwind 默认栈）；CJK 经 `system-ui` 按 OS 渲染，不硬编码中文字体。
- 一组一个 primary；危险操作用 `destructive`（不设默认、不上主色）。
- 不靠颜色单独传达状态；纯图标按钮带 `aria-label`；对比度正文 ≥ 4.5:1，亮暗两套都过。
- 交付物**不得引用 `_reference/`**；Skill 只引用自身 `references/`（保持自洽）。

## 提交前检查清单

- [ ] 改的是 `source/` 或 `design.md`（事实源），不是 `tokens.json` / `references/`（生成物）。
- [ ] 跑过 `npm run build` 重新生成。
- [ ] `npm run lint` exit 0。
- [ ] `skill/pangea-design/` 隔离可用（自洽，无外部引用）。
- [ ] `CHANGELOG.md` 已更新。

## 版本与发版

遵循 [SemVer](https://semver.org/lang/zh-CN/)：token/规则有破坏性变更 → MAJOR；新增 token/组件/能力 → MINOR；修复/微调 → PATCH。发版时把 `CHANGELOG.md` 的 `[Unreleased]` 移入新版本号 + 当日日期。
