---
name: material-3
description: >
  Implement Google's Material Design 3 (Material You) UI system. Primary: Jetpack Compose
  Material3 (MaterialTheme, components, adaptive layout). Also Flutter and limited web
  (@material/web, maintenance mode). Covers tokens, 30+ components, layout, theming,
  M3 Expressive (platform matrix), and accessibility. Use when: "material design", "MD3",
  "material you", "Jetpack Compose", "MaterialTheme", "material component", "md3 button".
user-invokable: true
argument-hint: "[component|theme|layout|scaffold|audit] [description or URL]"
---

# Material Design 3

本 skill 指导实现 Google 的 Material Design 3（MD3）——一套个性化、自适应、富有表现力的设计系统。MD3 使用 dynamic color、tonal surfaces、圆角形状和基于弹簧的运动，创造出充满生命力和个性化的 UI。

## 设计理念（Philosophy）

MD3 建立在三大原则之上：
- **Personal（个性化）**：Dynamic color 让 UI 适配用户的壁纸或内容。主题是个性化的，而非千篇一律。
- **Adaptive（自适应）**：布局在 5 个 window size classes 之间转换。组件能够响应式地调整大小、重新定位并改变形态。
- **Expressive（富有表现力）**：形状变形（shape morphing）、弹簧物理（spring physics）和强调式排版（emphasized typography）在不牺牲可用性的前提下创造愉悦的瞬间。

## 最新更新：Google I/O 2026

Material 的 [Google I/O 2026 更新](https://m3.material.io/blog/whats-new-at-io26) 强化了 **Compose-first** 的 Android 路径，并扩展了 expressive/adaptive 指南：

- **Material Android 是 Compose-first 的**：对于新的 Android 工作，优先使用 Jetpack Compose Material3，以获得最新的组件、expressive API、adaptive scaffolds 和 Styles API 集成。在现有应用中可能仍需要 Android Views，但不应将其作为新 Material 3 实现的默认路径。
- **Expressive 布局系统**：使用 expressive 布局 scaffold 让屏幕在 mobile、desktop、foldables、watches、XR 及其他空间形态之间自适应。从 adaptive scaffolds / window size classes 出发，而非固定的 phone-first 布局。
- **8dp 间距系统**：应用间距 token 来设置 margins、padding 和 gaps，使布局和组件能够根据设备类型和密度以编程方式自适应。
- **新增/更新的 expressive 组件**：Lists、menus、search 和 search app bars 有了刷新的 expressive 指南，以 Jetpack Compose 作为主要实现目标。
- **Watches 和 XR**：Watches 强调基于物理的运动、弧形文本（arc text）和贴边容器（edge-hugging containers）。XR 强调空间面板（spatial panels）和基于深度的高程（depth-based elevation）。

**与 MD2 的关键区别：**
- Tonal surfaces 取代 elevation 阴影成为主要的深度线索
- Dynamic color 从单一种子色生成完整的配色方案
- 默认使用全圆角（而非轻微圆角）
- 基于弹簧的运动物理取代组件的固定缓动曲线
- 3 个用户可控的对比度级别（standard/medium/high）

**与 frontend-design skill 的关系：**
当两个 skill 同时激活时，MD3 提供设计系统（tokens、components、布局规则），frontend-design 在这些约束内提供创意方向。在组件结构和 token 使用上，MD3 规则优先。注意：在 MD3 中 Roboto/Roboto Flex 是正确的默认字体——frontend-design 中"避免使用 Roboto"的指南在实现 MD3 时不适用。

## 决策树（Decision Tree）

**你在构建什么？**
```
Full app scaffold        → See "Common Patterns: App Shell" + references/layout-and-responsive.md
Single component         → See "Component Quick Reference" table → references/component-catalog.md
Custom theme             → See references/theming-and-dynamic-color.md
Form / input layout      → See references/component-catalog.md § Input Components
Navigation structure     → See references/navigation-patterns.md
Data display             → See references/component-catalog.md § Data Display
```

**什么平台？**
```
Jetpack Compose          → Primary: androidx.compose.material3, MaterialTheme, references/*
Flutter                  → useMaterial3: true in ThemeData, ColorScheme.fromSeed()
Web (vanilla JS)         → @material/web (limited; maintenance mode) + CSS custom properties
Web (React/Vue/Svelte)   → CSS custom properties + wrapper components (no official React lib)
Web (CSS-only)           → MD3 token values as CSS custom properties (no <md-*> elements)
```

## 设计 Token 系统

所有 MD3 token 使用 `md.sys` 命名空间。**Jetpack Compose** 将各角色映射到 `MaterialTheme.colorScheme`、`MaterialTheme.typography` 和 `MaterialTheme.shapes`（与规范相同的语义角色）。**在 Web 上**，这些映射为 CSS custom properties（`--md-sys-*`）：

### Color Tokens (`--md-sys-color-*`)
| Token | 用途 |
|-------|-------|
| `primary` | 在 surface 上的高强调填充、文字、图标 |
| `on-primary` | primary 上的文字/图标 |
| `primary-container` | 关键组件（FAB 等）的突出填充 |
| `on-primary-container` | primary-container 上的文字/图标 |
| `secondary` / `on-secondary` | 不那么突出的强调色 |
| `secondary-container` / `on-secondary-container` | 弱化组件（tonal buttons） |
| `tertiary` / `on-tertiary` | 形成对比的强调色 |
| `tertiary-container` / `on-tertiary-container` | 互补容器 |
| `error` / `on-error` | 错误状态（静态——不随 dynamic color 改变） |
| `error-container` / `on-error-container` | 错误容器填充 |
| `surface` | 默认背景 |
| `on-surface` | 任意 surface 上的文字/图标 |
| `on-surface-variant` | surface 上低强调的文字/图标 |
| `surface-container-lowest` | 最低强调容器 |
| `surface-container-low` | 低强调容器 |
| `surface-container` | 默认容器（导航区域） |
| `surface-container-high` | 高强调容器 |
| `surface-container-highest` | 最高强调容器 |
| `surface-dim` / `surface-bright` | 在 light/dark 之间维持相对亮度 |
| `inverse-surface` / `inverse-on-surface` / `inverse-primary` | 形成对比的元素（snackbars） |
| `outline` | 重要边界（text field 边框） |
| `outline-variant` | 装饰性元素（dividers） |

完整细节：`references/color-system.md`

### Typography Tokens (`--md-sys-typescale-*`)
| Scale | Sizes | 用途 |
|-------|-------|-----|
| Display | L / M / S | 主视觉文字、大号数字 |
| Headline | L / M / S | 区块标题 |
| Title | L / M / S | 较小的标题、卡片标题 |
| Body | L / M / S | 段落文字、描述 |
| Label | L / M / S | 按钮、chips、说明文字 |

每种样式都有以下 token：`-font`、`-weight`、`-size`、`-line-height`、`-tracking`
另有 15 个 **emphasized**（更高字重）变体，通过 `--md-sys-typescale-emphasized-*` 提供

完整细节：`references/typography-and-shape.md`

### Shape Tokens (`--md-sys-shape-corner-*`)
| Token | 值 | 示例组件 |
|-------|-------|-------------------|
| `none` | 0dp | — |
| `extra-small` | 4dp | Chips, snackbars |
| `small` | 8dp | Text fields, menus |
| `medium` | 12dp | Cards |
| `large` | 16dp | FABs, navigation drawer |
| `large-increased` | 20dp | (Expressive) |
| `extra-large` | 28dp | Dialogs, bottom sheets |
| `extra-large-increased` | 32dp | (Expressive) |
| `extra-extra-large` | 48dp | (Expressive) |
| `full` | 9999px | Buttons, chips, badges |

### Elevation Levels（高程级别）
| Level | DP | Tonal offset | 用途 |
|-------|-----|-------------|-----|
| 0 | 0dp | None | 平面 surface，多数组件的静止态 |
| 1 | 1dp | +5% primary | Elevated cards, modal sheets |
| 2 | 3dp | +8% primary | Menus, nav bar, scrolled app bar |
| 3 | 6dp | +11% primary | FAB, dialogs, search, date/time pickers |
| 4 | 8dp | +12% primary | （仅 hover/focus 时增加） |
| 5 | 12dp | +14% primary | （仅 hover/focus 时增加） |

MD3 中的 elevation 通过 **tonal surface color** 而非阴影来传达。仅在需要额外抵抗繁杂背景的保护时才使用阴影。

### Motion（运动）
MD3 Expressive（2025 年 5 月）为组件引入了**基于弹簧的运动物理（spring-based motion physics）**。传统的缓动/时长系统仍用于**转场（transitions）**（enter/exit/shared-axis）：

| Easing | Duration | 转场类型 |
|--------|----------|-----------------|
| Emphasized | 500ms | 在屏幕内开始和结束 |
| Emphasized decelerate | 400ms | 进入屏幕 |
| Emphasized accelerate | 200ms | 退出屏幕 |
| Standard | 300ms | 在屏幕内开始和结束（工具性） |
| Standard decelerate | 250ms | 进入屏幕（工具性） |
| Standard accelerate | 200ms | 退出屏幕（工具性） |

CSS easing 值：
- Emphasized: `cubic-bezier(0.2, 0, 0, 1)`
- Emphasized decelerate: `cubic-bezier(0.05, 0.7, 0.1, 1)`
- Emphasized accelerate: `cubic-bezier(0.3, 0, 0.8, 0.15)`
- Standard: `cubic-bezier(0.2, 0, 0, 1)`
- Standard decelerate: `cubic-bezier(0, 0, 0, 1)`
- Standard accelerate: `cubic-bezier(0.3, 0, 1, 1)`

## 组件速查（Component Quick Reference）

| Component | Web Element | Key Variants | Category |
|-----------|------------|--------------|----------|
| Button | `md-filled-button`, `md-outlined-button`, `md-text-button`, `md-elevated-button`, `md-filled-tonal-button` | Filled, Outlined, Text, Elevated, Tonal; 5 sizes (XS–XL); toggle | Actions |
| Button group | `md-button-group` | Standard, connected | Actions |
| Extended FAB | `md-extended-fab` | Surface, Primary, Secondary, Tertiary | Actions |
| FAB | `md-fab` | Small, Medium, Large | Actions |
| FAB menu | — | — | Actions |
| Icon button | `md-icon-button`, `md-filled-icon-button`, `md-filled-tonal-icon-button`, `md-outlined-icon-button` | Standard, Filled, Filled Tonal, Outlined | Actions |
| Segmented button | — | Single-select, Multi-select | Actions |
| Split button | — | — | Actions |
| Badge | — | Small (dot), Large (count) | Communication |
| Loading indicator | — | Linear, Circular | Communication |
| Progress indicator | `md-linear-progress`, `md-circular-progress` | Linear, Circular; determinate/indeterminate | Communication |
| Snackbar | — | Single-line, Two-line, Action | Communication |
| Tooltip | — | Plain, Rich | Communication |
| Card | — | Filled, Outlined, Elevated | Containment |
| Carousel | — | Multi-browse, Uncontained, Hero | Containment |
| Dialog | `md-dialog` | Basic, Full-screen | Containment |
| Bottom sheet | — | Standard, Modal | Sheets |
| Side sheet | — | Standard, Modal | Sheets |
| Divider | `md-divider` | Full-width, Inset | Containment |
| Checkbox | `md-checkbox` | — | Input |
| Chips | `md-chip-set`, `md-assist-chip`, `md-filter-chip`, `md-input-chip`, `md-suggestion-chip` | Assist, Filter, Input, Suggestion | Input |
| Date picker | — | Docked, Modal, Range | Input |
| Menu | `md-menu`, `md-menu-item` | — | Input |
| Radio button | `md-radio` | — | Input |
| Slider | `md-slider` | Continuous, Discrete, Range | Input |
| Switch | `md-switch` | With/without icon | Input |
| Text field | `md-filled-text-field`, `md-outlined-text-field` | Filled, Outlined | Input |
| Time picker | — | Docked, Modal | Input |
| App bar (top) | — | Center-aligned, Small, Medium, Large | Navigation |
| Navigation bar | `md-navigation-bar` | — | Navigation |
| Navigation drawer | `md-navigation-drawer` | Standard, Modal | Navigation |
| Navigation rail | — | — | Navigation |
| Search | — | Search bar, Search view | Navigation |
| Tabs | `md-tabs`, `md-primary-tab`, `md-secondary-tab` | Primary, Secondary | Navigation |
| Toolbar | — | — | Navigation |
| List | `md-list`, `md-list-item` | One-line, Two-line, Three-line | Data Display |

**注意：** Web Element 列标记为 `—` 的组件目前没有 @material/web 实现。对这些组件，请使用 CSS custom properties 配合标准 HTML。**Compose** 的映射和示例见 `references/component-catalog.md`。

带代码示例的完整组件细节：`references/component-catalog.md`

## Jetpack Compose（主要路径）

使用 **`androidx.compose.material3`** 配合 `MaterialTheme` 和 Material 3 composables（`Scaffold`、`Button`、`NavigationBar`、top app bars 等）。

- **Theming**：`MaterialTheme(colorScheme = …, typography = …, shapes = …)`。在需要 dynamic color 时，于 **Android 12+ (API 31+)** 优先使用 `dynamicLightColorScheme` / `dynamicDarkColorScheme`；否则使用 `lightColorScheme` / `darkColorScheme`，或来自 Material Theme Builder 生成的主题代码。
- **Adaptive UI**：Window size classes、list-detail 与 supporting-pane 布局、foldables——见 `references/layout-and-responsive.md` 和 `references/navigation-patterns.md`。
- **Edge-to-edge & insets**：用 `WindowInsets` / scaffold padding 来布局内容，使 bars 和 IME 行为正确——见 `references/layout-and-responsive.md`。
- **Experimental APIs**：部分 Material 3 API 需要 `@OptIn(ExperimentalMaterial3Api::class)` 或 expressive opt-ins；请与你的 BOM 和 compiler 匹配。

```kotlin
MaterialTheme(
    colorScheme = colorScheme, // from dynamicLightColorScheme / lightColorScheme / etc.
    typography = Typography(),
    shapes = Shapes(),
) {
    // M3 content — prefer references for Scaffold, navigation, text fields
}
```

## Web（受限）：@material/web

**重要：** 根据 [Material Design 3 for Web](https://m3.material.io/develop/web)，**Material Web Components 处于维护模式（maintenance mode）**，且 **M3 Expressive 在 Web 上未实现**。在适当场景下可使用 `@material/web` 来构建 token 支持的 web UI，但不要把它当作在当前 Expressive 特性上与 Compose 对等的方案。

### 安装（Setup）

```bash
npm install @material/web
```

### 按需单独导入组件

始终只导入你用到的组件——导入整个包会使打包体积膨胀：

```javascript
// Good — individual imports
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/icon/icon.js';

// Bad — never do this
import '@material/web'; // imports everything
```

### 基本用法

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet">
</head>
<body>
  <md-filled-button>Get started</md-filled-button>
  <md-outlined-text-field label="Email" type="email"></md-outlined-text-field>

  <script type="module">
    import '@material/web/button/filled-button.js';
    import '@material/web/textfield/outlined-text-field.js';
  </script>
</body>
</html>
```

### 用 CSS Custom Properties 做主题

通过在 `:root` 或任意祖先元素上设置 CSS custom properties 来应用自定义主题：

```css
:root {
  /* Color scheme (generate with @material/material-color-utilities) */
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-on-primary-container: #21005D;
  --md-sys-color-secondary: #625B71;
  --md-sys-color-on-secondary: #FFFFFF;
  --md-sys-color-secondary-container: #E8DEF8;
  --md-sys-color-on-secondary-container: #1D192B;
  --md-sys-color-surface: #FEF7FF;
  --md-sys-color-on-surface: #1D1B20;
  --md-sys-color-surface-container: #F3EDF7;
  --md-sys-color-outline: #79747E;
  --md-sys-color-outline-variant: #CAC4D0;

  /* Typography */
  --md-sys-typescale-body-large-font: 'Roboto Flex', sans-serif;
  --md-sys-typescale-body-large-size: 1rem;
  --md-sys-typescale-body-large-weight: 400;
  --md-sys-typescale-body-large-line-height: 1.5rem;

  /* Shape */
  --md-sys-shape-corner-full: 9999px;
  --md-sys-shape-corner-medium: 12px;
}
```

### 组件级别覆盖

覆盖单个组件的 token 以做特定定制：

```css
md-filled-button {
  --md-filled-button-container-color: var(--md-sys-color-primary);
  --md-filled-button-label-text-color: var(--md-sys-color-on-primary);
  --md-filled-button-container-shape: var(--md-sys-shape-corner-full);
  --md-filled-button-container-height: 40px;
}

md-outlined-text-field {
  --md-outlined-text-field-container-shape: var(--md-sys-shape-corner-small);
  --md-outlined-text-field-focus-outline-color: var(--md-sys-color-primary);
}
```

### 深色主题（Dark Theme）

通过在 class 或 media query 上覆盖 color token 来应用深色主题：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #D0BCFF;
    --md-sys-color-on-primary: #381E72;
    --md-sys-color-primary-container: #4F378B;
    --md-sys-color-on-primary-container: #EADDFF;
    --md-sys-color-surface: #141218;
    --md-sys-color-on-surface: #E6E0E9;
    --md-sys-color-surface-container: #211F26;
    --md-sys-color-outline: #938F99;
    --md-sys-color-outline-variant: #49454F;
  }
}
```

完整主题指南：`references/theming-and-dynamic-color.md`

## 常见模式（Common Patterns）

### App Shell（应用骨架）

标准 MD3 应用，含响应式导航 + top app bar + 内容区域：

```html
<div class="md3-app">
  <nav class="md3-nav-rail" aria-label="Main navigation">
    <!-- Navigation rail for medium+ screens -->
    <md-fab size="small" aria-label="Compose">
      <md-icon slot="icon">edit</md-icon>
    </md-fab>
    <md-navigation-bar>
      <md-navigation-tab label="Home">
        <md-icon slot="active-icon">home</md-icon>
        <md-icon slot="inactive-icon">home</md-icon>
      </md-navigation-tab>
      <md-navigation-tab label="Search">
        <md-icon slot="active-icon">search</md-icon>
        <md-icon slot="inactive-icon">search</md-icon>
      </md-navigation-tab>
    </md-navigation-bar>
  </nav>
  <main class="md3-content">
    <header class="md3-top-app-bar">
      <h1 class="md3-top-app-bar__title" style="font: var(--md-sys-typescale-title-large)">
        Page Title
      </h1>
    </header>
    <div class="md3-body">
      <!-- Content here -->
    </div>
  </main>
</div>
```

```css
.md3-app {
  display: flex;
  min-height: 100vh;
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.md3-nav-rail {
  width: 80px;
  background: var(--md-sys-color-surface);
  border-right: 1px solid var(--md-sys-color-outline-variant);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  gap: 12px;
}

.md3-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.md3-top-app-bar {
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: var(--md-sys-color-surface);
}

.md3-body {
  padding: 24px;
  flex: 1;
}

/* Responsive: switch to bottom nav on compact */
@media (max-width: 599px) {
  .md3-app { flex-direction: column; }
  .md3-nav-rail {
    order: 1;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    border-right: none;
    border-top: 1px solid var(--md-sys-color-outline-variant);
    padding: 0;
  }
}
```

### Card Grid（卡片网格）

```html
<div class="md3-card-grid">
  <div class="md3-card md3-card--outlined">
    <img src="image.jpg" alt="Description" class="md3-card__media">
    <div class="md3-card__content">
      <h3 style="font: var(--md-sys-typescale-title-medium)">Card Title</h3>
      <p style="font: var(--md-sys-typescale-body-medium); color: var(--md-sys-color-on-surface-variant)">
        Supporting text for this card.
      </p>
    </div>
    <div class="md3-card__actions">
      <md-text-button>Learn more</md-text-button>
      <md-filled-tonal-button>Action</md-filled-tonal-button>
    </div>
  </div>
</div>
```

```css
.md3-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.md3-card--outlined {
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-sys-shape-corner-medium, 12px);
  background: var(--md-sys-color-surface);
  overflow: hidden;
}

.md3-card__content { padding: 16px; }
.md3-card__actions { padding: 8px 16px 16px; display: flex; gap: 8px; justify-content: flex-end; }
.md3-card__media { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
```

### Form Layout（表单布局）

```html
<form class="md3-form">
  <md-outlined-text-field label="Full name" required></md-outlined-text-field>
  <md-outlined-text-field label="Email" type="email" required></md-outlined-text-field>
  <md-outlined-text-field label="Message" type="textarea" rows="4"></md-outlined-text-field>
  <div class="md3-form__actions">
    <md-text-button type="reset">Cancel</md-text-button>
    <md-filled-button type="submit">Submit</md-filled-button>
  </div>
</form>
```

```css
.md3-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 560px;
}

.md3-form__actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
}
```

更多模式：`references/navigation-patterns.md`、`references/layout-and-responsive.md`

## 反模式（Anti-Patterns）

**实现 MD3 时绝不要做这些：**

- **混用 MD2 和 MD3 库**：不要把 `@material/mdc-*`（MD2）与 `@material/web`（MD3）一起使用。它们的 API 和样式不兼容。
- **硬编码颜色**：始终使用 `var(--md-sys-color-*)` token，绝不使用原始 hex/rgb 值。硬编码颜色会破坏 dynamic theming、深色模式和对比度调整。
- **忽视 tonal 配对**：只按预期的配对组合颜色（例如 `primary` + `on-primary`、`surface-container` + `on-surface`）。任意配对会在 dynamic color 和高对比度模式下破坏对比度。
- **用 `outline` 做 dividers**：dividers 用 `outline-variant`。`outline` 用于重要边界，如 text field 边框。
- **导入整个 @material/web**：始终单独导入组件模块。Barrel imports 会包含所有组件并严重拖累打包体积。
- **直接使用 `border-radius`**：使用 shape token（`var(--md-sys-shape-corner-medium)`），使形状与主题保持一致。
- **默认用阴影表达 elevation**：MD3 通过 tonal surface color 而非阴影来传达 elevation。仅在元素需要从繁杂背景中额外分离时才加阴影。
- **套用 frontend-design 的"避免 Roboto"规则**：在 **Android** 上，**Roboto** 是默认的 Material 字体；**web** 上通常配合 MD3 token 使用 Roboto 或 Roboto Flex。仅在有意定制 type scale 时才替换。
- **假设 SSR 兼容**：`@material/web` 使用 Web Components（custom elements），需要 JavaScript 才能渲染。在没有额外 hydration 策略的情况下，它们在 SSR 中不会产出有意义的 HTML。
- **忽视 foldables 和大屏**：MD3 为所有屏幕尺寸设计。不要只交付 phone-only 布局——使用 canonical layouts，在 600dp+ 多窗格，并在 foldable/tablet 模拟器上测试。不要在折叠/铰链处放置可交互内容。
- **把内容拉伸填满宽屏**：在 Large（1200dp+）和 Extra-large（1600dp+）窗口上，将内容约束到最大宽度（840–1040dp）。无限宽的文本行不可读。

## 平台说明（Platform Notes）

### Flutter
```dart
MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
  ),
);
```

### Jetpack Compose
见上文 **[Jetpack Compose（主要路径）](#jetpack-compose主要路径)**。仅当 `Build.VERSION.SDK_INT >= Build.VERSION_CODES.S` 且启用了 dynamic color 时，才使用 `LocalContext.current` 配合 `dynamicLightColorScheme` / `dynamicDarkColorScheme`；否则提供静态的 light/dark schemes。

### 组件名称映射（Component Name Mapping）
| 概念 | Web | Flutter | Compose |
|---------|-----|---------|---------|
| Filled button | `md-filled-button` | `FilledButton` | `Button` |
| Outlined text field | `md-outlined-text-field` | `OutlinedTextField` | `OutlinedTextField` |
| FAB | `md-fab` | `FloatingActionButton` | `FloatingActionButton` |
| Navigation bar | `md-navigation-bar` | `NavigationBar` | `NavigationBar` |
| Switch | `md-switch` | `Switch` | `Switch` |

## M3 Expressive（2025 年 5 月）

Expressive 更新在保持可用性的同时增加了视觉丰富度。**各平台的可用性不同**——不要假设某一技术栈实现了全部能力。

| Capability | Jetpack Compose | Flutter | Web (`@material/web`) |
|------------|-----------------|---------|------------------------|
| Expressive layout scaffold / adaptive layout | Compose-first via Material3 adaptive APIs and window size classes | Use Flutter adaptive/layout primitives | CSS/container queries/manual layout; no Material Web parity |
| 8dp spacing system | Use design tokens / `Dp` spacing constants; keep margins, padding, and gaps adaptive | Use theme spacing constants | CSS custom properties / design tokens |
| Expressive lists, menus, search, search app bar | Primary target per current Material guidance; check BOM and opt-ins | Check current Flutter Material docs | Spec-aligned custom implementation; `@material/web` is maintenance-only |
| Spring / motion physics | Supported in Material 3 (see `MotionScheme`, expressive APIs per BOM) | Varies by Flutter Material version | **Not** in Material Web; use easing/duration or custom motion |
| Emphasized typography | Via theme / type scale | Via theme | Token/CSS only; no full Expressive component set |
| Shape morphing | Compose-first in Google's expressive rollout | Check current Flutter docs | **Not** in `@material/web` |
| New button sizes (XS–XL), toggle | Follow Compose Material3 components | Follow Flutter MD3 | Height/CSS approximations only |
| Extra corner tokens (e.g. large-increased) | `MaterialTheme.shapes` / tokens | Theme shapes | CSS `--md-sys-shape-*` |
| 3 contrast levels | Scheme builders / system | Plugins / manual | `SchemeContent` contrast parameter in JS utilities |
| Watches / XR form factors | Use Compose/Wear/XR-specific guidance where available | Platform-specific | Web/spatial UI custom implementation |

**Web：** [Material Web 仅维护；M3 Expressive 不在 Web 上](https://m3.material.io/develop/web)。运动方面用 CSS easing/duration token 作为回退，而非弹簧对等实现。

**传统缓动/时长** 在规范仍引用它们的**转场（transitions）**（enter/exit/shared-axis）中依然有效；见下方 Motion 表。

## MD3 合规审计（Compliance Audit）

当以 `audit` 作为参数调用（例如 `/material-3 audit`），或被要求审计/审查 MD3 合规性时，分析目标应用或页面并产出合规报告。

### 审计流程

1. **确定目标**：用户提供 URL（用浏览器工具检查）、文件路径（读取源码）或正在运行的应用。
2. **检查以下类别**，每项打分 0–10：

| Category | 检查内容 |
|----------|--------------|
| **Color tokens** | **Web：** `--md-sys-color-*` / 生成的 CSS。**Compose：** `MaterialTheme.colorScheme` 角色（surfaces 无正当理由不应使用任意 `Color(...)`）。正确的 tonal 配对（`onX` 配 `X`）。深色主题。**Flutter：** `ColorScheme` 角色。 |
| **Typography** | MD3 type scale：**Compose** `MaterialTheme.typography`；**web** typescale tokens；正确的角色（Display、Headline、Title、Body、Label）。 |
| **Shape** | **Compose** `MaterialTheme.shapes` / 组件 `Shape`；**web** `var(--md-sys-shape-*)`。Buttons：full；cards：medium；避免魔法数字。 |
| **Elevation** | Tonal elevation（`Surface` 的 tonal/shadow 视情况使用）。**Web：** 相关处的 hover/focus。 |
| **Components** | **Compose：** Material3 composables（`Button`、`Scaffold` 等）。**Web：** `@material/web` 或与规范一致的 HTML/CSS。正确的变体。 |
| **Layout** | Canonical layouts；**Compose** window size class / adaptive APIs；大宽度下可读的最大宽度；foldable 铰链规避。 |
| **Navigation** | Bar / rail / drawer / drawers + **Compose** `NavHost` 模式按 size class；适用处的 predictive back。 |
| **Motion** | 使用时检查 **Compose** `MotionScheme` / expressive APIs；transitions 仍可使用 easing/duration。**Web：** CSS motion token 回退。 |
| **Accessibility** | MD3 角色有帮助，但需**验证对比度**：UI 组件通常对大号文字/边框需 **3:1**，对常规文字需 **4.5:1**（WCAG 2.x）。TalkBack/semantics（Compose）、焦点顺序、触控目标（~48dp）。**Web：** ARIA、键盘。 |
| **Theming** | **Compose：** `MaterialTheme` + 按设计的 light/dark/dynamic。**Web：** `:root` 或子树上的 CSS custom properties。**Flutter：** `ThemeData` + `ColorScheme`。 |

3. **生成报告**：

```
# MD3 Compliance Audit Report

Target: [URL or file path]
Date: [date]
Overall Score: [X/100]

## Scores by Category
| Category       | Score | Status |
|----------------|-------|--------|
| Color tokens   | X/10  | [pass/warn/fail] |
| Typography     | X/10  | [pass/warn/fail] |
| Shape          | X/10  | [pass/warn/fail] |
| Elevation      | X/10  | [pass/warn/fail] |
| Components     | X/10  | [pass/warn/fail] |
| Layout         | X/10  | [pass/warn/fail] |
| Navigation     | X/10  | [pass/warn/fail] |
| Motion         | X/10  | [pass/warn/fail] |
| Accessibility  | X/10  | [pass/warn/fail] |
| Theming        | X/10  | [pass/warn/fail] |

## Critical Issues
[List items scoring 0-3 with specific file:line references and fixes]

## Warnings
[List items scoring 4-6 with recommendations]

## Passing
[List items scoring 7-10 with notes on what's done well]

## Recommended Fixes (Priority Order)
1. [Most impactful fix first]
2. ...
```

### 审计方法

**对于在线 URL**（浏览器或 devtools）：
- 检查 computed styles 和 CSS variables（`--md-sys-*`）
- 调整视口大小或使用响应式模式查看断点
- 在关键宽度处截图（如有帮助）

**对于源码**（提供文件路径）：
- **Compose/Kotlin：** `.kt` 文件——`MaterialTheme`、composables、`Color(0x…)` 滥用、硬编码 `Dp`、需要处缺失的 `Modifier.semantics`
- **Flutter：** `.dart`——`ThemeData`、`ColorScheme`
- **Web：** HTML/JSX/Vue/Svelte；token 用的 CSS/SCSS
- 检查 **web** 的导入是 `@material/web` 还是 `@material/mdc-*`（MD2）

**快速检查**（根据你的技术栈调整路径）：
```
# Web: hardcoded colors
grep -rn '#[0-9a-fA-F]\{3,8\}' --include='*.css' --include='*.scss'

# Compose: raw Color(...) audits (sample — tune for your codebase)
grep -rn 'Color(0x' --include='*.kt'

# MD2 on web
grep -rn '@material/mdc-' --include='*.js' --include='*.ts'
```

**浏览器自动化**（如果你的环境提供 MCP 浏览器工具）：导航、快照 DOM/CSS 变量、调整断点大小——可选，非必需。

### 评分指南（Scoring Guide）

- **9-10**：完全符合 MD3，使用正确的 token 和模式
- **7-8**：基本符合，存在小问题（例如少量硬编码值）
- **4-6**：部分符合，有一些 MD3 模式但存在明显缺口
- **1-3**：重大违规，大部分非 MD3 或属于 MD2 模式
- **0**：不适用或完全缺失

状态阈值：**pass**（7+）、**warn**（4-6）、**fail**（0-3）

## 参考文档（Reference Documents）

- `references/color-system.md` — Color roles, tonal palettes, dynamic color, Compose + CSS mapping
- `references/typography-and-shape.md` — Type scale, shape corners, elevation, motion, Expressive notes
- `references/component-catalog.md` — Components: Compose + `@material/web` where applicable
- `references/navigation-patterns.md` — Navigation selection, Compose-first adaptive patterns
- `references/layout-and-responsive.md` — Breakpoints, canonical layouts, insets, foldables
- `references/theming-and-dynamic-color.md` — Theming: Compose first, then Flutter and web
