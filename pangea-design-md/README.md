# Pangea 3 Linear 设计系统

[DESIGN.md](./DESIGN.md) 基于海信集团 Pangea 3 Linear 主题包（`@arco-themes/vue-pangea-3-linear`）提取整理。这不是官方设计系统文档的原样复制，而是面向 AI Agent 优化的轻量化版本，适用于在线 AI 工具（Stitch、AI Studio、Coze 等）快速生成符合 Pangea 设计语言的 UI。

## 文件

| 文件 | 描述 |
|------|------|
| `DESIGN.md` | 完整的设计系统文档（9 个章节），中文版 |
| `preview.html` | 交互式设计 token 目录（浅色模式） |
| `preview-dark.html` | 交互式设计 token 目录（深色模式） |

## 使用方式

将 [DESIGN.md](./DESIGN.md) 复制到你的项目中，或直接粘贴到 AI 工具的上下文中，告诉 AI "按照这个设计系统帮我生成页面"即可。

所有颜色均以直接 rgb/hex 色值提供，无需依赖 CSS 变量或特定框架环境，任何 AI 编程工具都能直接使用。

## 设计特征

- **品牌色**：青绿色（`rgb(0, 170, 166)`），区别于常见的蓝色企业主题
- **风格**：轻量、干净、理性，面向数据密集型企业后台
- **字体**：Inter + PingFang SC / Microsoft YaHei，14px 默认正文
- **布局**：48px 顶栏 + 200px 可折叠侧边栏 + 白色内容区（左上 8px 圆角）
- **深度**：扁平优先，通过填充色阶梯而非阴影表达层级
- **暗色模式**：完整的暗色 token 定义，通过语义色阶自动适配

## 预览

在浏览器中打开 `preview.html` 或 `preview-dark.html`，可查看色板、字体层级、按钮、输入框、表格、阴影、圆角、间距和布局结构的可视化展示。

## 与 pangea-prototype 的关系

本目录是 Pangea 设计系统的**轻量化 DESIGN.md 版本**，适用于不依赖特定框架的在线 AI 工具。

如果你需要在本地 AI 编程工具（如 Kiro、Cursor）中生成可直接运行的 Vue 3 + Arco Design 完整工程，请使用 [`pangea-prototype`](../pangea-prototype/) skill，它包含模板工程、初始化脚本和更详细的框架级规范。
