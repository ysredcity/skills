---
name: pangea-prototype-lite
description: 基于 Pangea 3 Linear 设计系统快速生成纯 HTML/CSS/JS 原型 demo 页面，无需任何框架或构建工具，浏览器直接打开即可预览。适用于 Coze编程、妙搭 等支持 skills 的在线 AI 工具，也适用于任何需要快速出界面原型的场景。当用户提到"快速出个页面 demo"、"生成一个原型"、"做个 HTML 页面"、"用 Pangea 风格做个界面"、"出个管理后台的 demo"、"帮我做个列表页/表单页/仪表盘"，或者任何需要快速生成符合 Pangea 设计语言的界面原型的场景，都应该触发这个技能。即使用户只是说"帮我出个 XX 的界面"或"做个 XX 页面看看效果"，只要涉及 UI 原型生成，就使用这个技能。
---

# Pangea 轻量原型生成器

你是一位精通企业级 UI 设计的前端专家，专门基于 Pangea 3 Linear 设计系统快速构建可视化原型。

**核心目标**：生成单个 HTML 文件（内联 CSS + JS），用户在浏览器中直接打开就能看到效果。不依赖任何框架、构建工具或 npm 包。

原型的价值在于"快速对齐设计意图"，不在于"完整实现"。全部用 mock 数据，不写后端逻辑。

---

## 第一步：读取设计系统

生成任何页面之前，先读取 `references/DESIGN.md`。这是完整的 Pangea 3 Linear 设计系统文档，包含所有颜色、字体、组件样式、布局规范。

文档中的色值可以直接在 CSS 中使用（如 `rgb(0, 170, 166)`、`#ffffff`），不需要依赖 CSS 变量运行时。

---

## 第二步：判断页面类型并生成

根据用户需求判断页面类型，然后按对应模板生成。

### 列表页

最常见的企业后台页面。结构：

```
┌─────────────────────────────────────────────────────┐
│  Header (48px)  背景: rgb(242,243,245)              │
│  [平台名]  [Tab][Tab]                    [头像]      │
├──────────┬──────────────────────────────────────────┤
│  Sider   │  页面标题 + 筛选栏                        │
│  (200px) │  ──────────────────────                   │
│          │  [新建] [导出]                             │
│  菜单项   │  ┌──────────────────┐                    │
│  菜单项   │  │  数据表格         │                    │
│  菜单项   │  │  (可滚动)         │                    │
│          │  └──────────────────┘                    │
│          │  共 XX 条        [分页]                    │
└──────────┴──────────────────────────────────────────┘
```

关键要点：
- 页面根元素 `height: 100vh`，flex 纵向布局，表格区域 `flex: 1; overflow: auto`
- 表格外框 `1px solid rgb(229,230,235)`，表头背景 `rgb(247,248,250)`
- 操作列放在最右侧，编辑用主色链接，删除用红色链接
- Mock 数据至少 6-8 行

### 表单页

独立的新建/编辑页面。结构：

```
┌─────────────────────────────────────────────────────┐
│  Header (48px)                                      │
├──────────┬──────────────────────────────────────────┤
│  Sider   │  [←] 页面标题          [取消] [提交]      │
│          │  ──────────────────────                   │
│          │  字段1        字段2        字段3           │
│          │  字段4        字段5        字段6           │
│          │  描述（全宽）                              │
└──────────┴──────────────────────────────────────────┘
```

关键要点：
- 表单头部 sticky 固定，左侧返回按钮 + 标题，右侧操作按钮
- 字段区域 `display: flex; flex-wrap: wrap; gap: 24px`，每字段约 381px 宽
- 全宽字段（如描述、备注）单独占一整行
- 必填字段标签前加红色星号

### 仪表盘 / 其他

没有固定模板，但遵循以下原则：
- 统计卡片使用 flex 横向排列，等宽分布
- 卡片内大数字 24-32px 字重 600，描述文字 14px 字重 400
- 图表区域可用带边框的占位块 + 文字说明代替
- 整体使用 DESIGN.md 中定义的色值和间距

---

## 布局外壳（所有页面必须包含）

每个原型都必须包含完整的布局外壳：Header + Sidebar + Content。页面内容渲染在 Content 区域内。

### 布局规格速查

| 区域 | 规格 |
|------|------|
| 整体背景 | `rgb(242, 243, 245)`（fill-2） |
| Header 高度 | 48px |
| Sider 宽度 | 200px |
| 菜单项默认背景 | transparent |
| 菜单项选中背景 | `#ffffff` + 主色文字 `rgb(0, 170, 166)` |
| 菜单项悬浮背景 | `rgb(229, 230, 235)`（fill-3） |
| 内容区背景 | `#ffffff` |
| 内容区圆角 | `border-radius: 8px 0 0 0` |

### 布局 HTML 骨架

```html
<div class="layout">
  <header class="header">
    <span class="logo">⬡</span>
    <span class="platform-name">系统名称</span>
    <!-- 如果有多个模块，加水平 tab -->
    <div class="header-spacer"></div>
    <div class="avatar"></div>
  </header>
  <div class="body">
    <aside class="sider">
      <nav class="menu">
        <div class="menu-item active">菜单项1</div>
        <div class="menu-item">菜单项2</div>
      </nav>
    </aside>
    <main class="content">
      <!-- 页面内容在这里 -->
    </main>
  </div>
</div>
```

---

## 样式规则

### 颜色——直接使用色值

本 skill 生成的是纯 HTML/CSS，不依赖 Arco Design 主题包，因此直接使用 DESIGN.md 中定义的 rgb/hex 色值。

常用色值速查（完整列表见 `references/DESIGN.md` 第 2 节和第 9 节）：

```css
/* 文字 */
color: rgb(29, 33, 41);       /* 主文字 (text-1) */
color: rgb(78, 89, 105);      /* 次要文字 (text-2) */
color: rgb(134, 144, 156);    /* 辅助文字 (text-3) */
color: rgb(201, 205, 212);    /* 禁用文字 (text-4) */

/* 背景 */
background: #ffffff;           /* 内容区 */
background: rgb(242, 243, 245); /* 外壳 (fill-2) */
background: rgb(247, 248, 250); /* 浅填充 (fill-1) */

/* 边框 */
border-color: rgb(229, 230, 235); /* 默认边框 (border-2) */
border-color: rgb(201, 205, 212); /* 强调边框 (border-3) */

/* 主色 */
color: rgb(0, 170, 166);      /* 主色 (primary-6) */
background: rgb(0, 170, 166); /* 主按钮背景 */
background: rgb(34, 187, 179); /* 主按钮悬浮 (primary-5) */

/* 功能色 */
color: #00B42A; /* 成功 */
color: #FF7D00; /* 警告 */
color: #F53F3F; /* 危险 */
```

### 字体

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, 'PingFang SC',
  'Microsoft YaHei', sans-serif;
```

### 字号与字重

- 页面标题：18px，字重 600
- 区块标题：16px，字重 600
- 正文/表格：14px，字重 400
- 表单标签：14px，字重 500
- 辅助文字：12px，字重 400

### 间距

使用 4px 倍数：4、8、12、16、20、24、32px。

### 圆角

- 按钮/输入框：4px
- 卡片/容器：8px
- 内容区左上角：`8px 0 0 0`

---

## 交互行为（JS）

原型中的交互用最简单的 vanilla JS 实现：

- 菜单项点击高亮（切换 `active` 类）
- 筛选面板展开/折叠（`display: none/block` 切换）
- 删除操作弹出 `confirm()` 确认
- 表格行悬浮高亮（CSS `:hover` 即可）
- 表单提交弹出 `alert('提交成功')` 反馈

不需要实现真实的数据筛选、排序、分页逻辑——这是原型，展示视觉效果即可。

---

## 输出格式

生成单个 `.html` 文件，结构如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题 - Pangea Demo</title>
  <style>
    /* 所有样式内联 */
  </style>
</head>
<body>
  <!-- 布局外壳 + 页面内容 -->
  <script>
    // 简单交互逻辑
  </script>
</body>
</html>
```

---

## 质量检查清单

生成完成后对照检查：

- [ ] 包含完整布局外壳（Header + Sider + Content）
- [ ] 颜色全部使用 DESIGN.md 中定义的色值，没有随意选色
- [ ] 字体使用 Inter + PingFang SC 字体栈
- [ ] 页面标题 18px 字重 600，正文 14px 字重 400
- [ ] 主按钮使用青绿色 `rgb(0, 170, 166)`，每组最多一个
- [ ] 内容区白色背景，左上角 8px 圆角
- [ ] Mock 数据至少 6-8 条（列表页）
- [ ] 输入框有 placeholder（"请输入"），选择器有 placeholder（"请选择"）
- [ ] 危险操作有确认提示
- [ ] 单个 HTML 文件，浏览器直接打开可用

---

## 参考文件

- `references/DESIGN.md`：**完整的 Pangea 3 Linear 设计系统文档**（生成前必须读取）
