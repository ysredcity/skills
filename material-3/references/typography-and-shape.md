# MD3 Typography, Shape, Elevation, and Motion

Material Design 3 中除颜色之外的视觉 token 系统的参考。

## Typography（排版）

### Type Scale（字体比例）

MD3 使用 15 个 baseline 样式 + 15 个 emphasized 样式，组织为 5 个类别（Display、Headline、Title、Body、Label），每类 3 个尺寸（Large、Medium、Small）。

#### Baseline Type Scale（默认值）

| Style | Font | Weight | Size (sp) | Size (rem) | Line Height | Tracking |
|-------|------|--------|-----------|------------|-------------|----------|
| Display Large | Roboto | 400 | 57 | 3.5625 | 64sp / 4rem | -0.25px |
| Display Medium | Roboto | 400 | 45 | 2.8125 | 52sp / 3.25rem | 0 |
| Display Small | Roboto | 400 | 36 | 2.25 | 44sp / 2.75rem | 0 |
| Headline Large | Roboto | 400 | 32 | 2 | 40sp / 2.5rem | 0 |
| Headline Medium | Roboto | 400 | 28 | 1.75 | 36sp / 2.25rem | 0 |
| Headline Small | Roboto | 400 | 24 | 1.5 | 32sp / 2rem | 0 |
| Title Large | Roboto | 400 | 22 | 1.375 | 28sp / 1.75rem | 0 |
| Title Medium | Roboto | 500 | 16 | 1 | 24sp / 1.5rem | 0.15px |
| Title Small | Roboto | 500 | 14 | 0.875 | 20sp / 1.25rem | 0.1px |
| Body Large | Roboto | 400 | 16 | 1 | 24sp / 1.5rem | 0.5px |
| Body Medium | Roboto | 400 | 14 | 0.875 | 20sp / 1.25rem | 0.25px |
| Body Small | Roboto | 400 | 12 | 0.75 | 16sp / 1rem | 0.4px |
| Label Large | Roboto | 500 | 14 | 0.875 | 20sp / 1.25rem | 0.1px |
| Label Medium | Roboto | 500 | 12 | 0.75 | 16sp / 1rem | 0.5px |
| Label Small | Roboto | 500 | 11 | 0.6875 | 16sp / 1rem | 0.5px |

#### Emphasized Type Styles（强调样式 · Expressive 更新）

15 个 emphasized 样式镜像 baseline 比例，但**字重更高**且有细微调整。用于：
- 组件中的选中/激活态
- 主操作按钮
- 需要强调的标题
- 未读/重要内容

用法：将 baseline token 换成 emphasized 版本：
- Baseline: `md.sys.typescale.display-large`
- Emphasized: `md.sys.typescale.emphasized.display-large`

### CSS Custom Properties

每个 type style 映射到独立的轴 token：

```css
/* Example: Body Large */
--md-sys-typescale-body-large-font: 'Roboto', sans-serif;
--md-sys-typescale-body-large-weight: 400;
--md-sys-typescale-body-large-size: 1rem;        /* 16sp */
--md-sys-typescale-body-large-line-height: 1.5rem; /* 24sp */
--md-sys-typescale-body-large-tracking: 0.03125rem; /* 0.5px */

/* Example: Title Medium */
--md-sys-typescale-title-medium-font: 'Roboto', sans-serif;
--md-sys-typescale-title-medium-weight: 500;
--md-sys-typescale-title-medium-size: 1rem;
--md-sys-typescale-title-medium-line-height: 1.5rem;
--md-sys-typescale-title-medium-tracking: 0.009375rem;

/* Example: Label Large (used for buttons) */
--md-sys-typescale-label-large-font: 'Roboto', sans-serif;
--md-sys-typescale-label-large-weight: 500;
--md-sys-typescale-label-large-size: 0.875rem;
--md-sys-typescale-label-large-line-height: 1.25rem;
--md-sys-typescale-label-large-tracking: 0.00625rem;
```

### 在 CSS 中使用 Type Styles

用独立属性应用：

```css
.headline {
  font-family: var(--md-sys-typescale-headline-large-font);
  font-weight: var(--md-sys-typescale-headline-large-weight);
  font-size: var(--md-sys-typescale-headline-large-size);
  line-height: var(--md-sys-typescale-headline-large-line-height);
  letter-spacing: var(--md-sys-typescale-headline-large-tracking);
}
```

或为方便使用 font 简写属性（注意：需要定义简写 token）：

```css
.headline {
  font: var(--md-sys-typescale-headline-large-weight)
        var(--md-sys-typescale-headline-large-size) /
        var(--md-sys-typescale-headline-large-line-height)
        var(--md-sys-typescale-headline-large-font);
  letter-spacing: var(--md-sys-typescale-headline-large-tracking);
}
```

### Typeface Customization（字体定制）

MD3 使用两个字体 role：
- **Brand**：用于 Display 和 Headline 样式（侧重表现力）
- **Plain**：用于 Title、Body 和 Label 样式（侧重可读性）

两者默认都是 Roboto。定制方式：

```css
:root {
  /* Brand typeface for display/headline */
  --md-ref-typeface-brand: 'Your Display Font', sans-serif;
  /* Plain typeface for body/label/title */
  --md-ref-typeface-plain: 'Your Body Font', sans-serif;
}
```

### Roboto Flex

Roboto Flex 是一款支持多个轴的可变字体：
- **Weight**（wght）：100–1000
- **Width**（wdth）：25–151
- **Optical size**（opsz）：8–144

```css
@font-face {
  font-family: 'Roboto Flex';
  src: url('RobotoFlex-VariableFont.woff2') format('woff2');
  font-weight: 100 1000;
  font-stretch: 25% 151%;
}
```

### Font Size Units（字号单位）

| Platform | Unit | Conversion |
|----------|------|------------|
| Android | sp | 1:1 |
| Web | rem | sp / 16 = rem（假设 16px 根字号） |

示例：10sp = 0.625rem, 12sp = 0.75rem, 14sp = 0.875rem, 16sp = 1rem, 24sp = 1.5rem

### Component Type Usage（组件字体用法）

| Component | Type Style |
|-----------|-----------|
| Button label | Label Large |
| Card title | Title Medium |
| Card body | Body Medium |
| Top app bar title | Title Large |
| Navigation label | Label Medium |
| Dialog headline | Headline Small |
| Dialog body | Body Medium |
| Chip label | Label Large |
| Text field input | Body Large |
| Text field label | Body Small (floating) / Body Large (resting) |
| List headline | Body Large |
| List supporting text | Body Medium |
| Snackbar text | Body Medium |
| Tooltip text | Body Small |
| Tab label | Title Small |
| Badge count | Label Small |

## Shape（形状）

### Corner Radius Scale（圆角比例）

| Token | Value (dp) | Value (px/CSS) | Default components |
|-------|-----------|----------------|-------------------|
| `none` | 0 | 0px | — |
| `extra-small` | 4 | 4px | Snackbar |
| `small` | 8 | 8px | Text fields, menus, chips |
| `medium` | 12 | 12px | Cards |
| `large` | 16 | 16px | FAB, extended FAB, nav drawer |
| `large-increased` | 20 | 20px | (Expressive update) |
| `extra-large` | 28 | 28px | Dialogs, bottom sheets, side sheets |
| `extra-large-increased` | 32 | 32px | (Expressive update) |
| `extra-extra-large` | 48 | 48px | (Expressive update) |
| `full` | — | 9999px | Buttons, badges, pills, sliders |

### CSS Custom Properties

```css
:root {
  --md-sys-shape-corner-none: 0px;
  --md-sys-shape-corner-extra-small: 4px;
  --md-sys-shape-corner-small: 8px;
  --md-sys-shape-corner-medium: 12px;
  --md-sys-shape-corner-large: 16px;
  --md-sys-shape-corner-large-increased: 20px;
  --md-sys-shape-corner-extra-large: 28px;
  --md-sys-shape-corner-extra-large-increased: 32px;
  --md-sys-shape-corner-extra-extra-large: 48px;
  --md-sys-shape-corner-full: 9999px;
}
```

### Component Shape Mapping（组件形状映射）

| Component | Default Shape Token |
|-----------|-------------------|
| Buttons (all types) | `full` |
| FAB | `large` |
| Extended FAB | `large` |
| Icon button | `full` |
| Chips | `small` |
| Cards | `medium` |
| Dialogs | `extra-large` |
| Text fields | `small`（top corners） |
| Menus | `small` |
| Navigation drawer | `large`（end corners） |
| Bottom sheets | `extra-large`（top corners） |
| Snackbar | `extra-small` |
| Badges | `full` |
| Sliders (handle) | `full` |
| Switch (track) | `full` |
| Tabs (indicator) | `full`（top corners） |
| Search bar | `full` |

### Shape Morphing（形状变形 · Expressive）

在 M3 Expressive 更新中，组件可在交互时在不同形状之间变形：
- 按钮形状在按下时变形
- 选中态可改变形状
- Loading indicators 用形状变形来显示进度

**平台说明**：Shape morphing **不在** `@material/web` 中（[Material Web 仅维护；Expressive 不在 Web 上](https://m3.material.io/develop/web)）。**Jetpack Compose** 是 Google 为 Android 记录 expressive 形状/运动行为的地方。**Flutter：** 对照你 SDK 的当前 Material 3 / expressive 文档。**Web：** 用 `border-radius` 上的 CSS transitions 来近似。

## Elevation（高程）

### Elevation Levels（高程级别）

| Level | DP Height | 用途 |
|-------|-----------|-----|
| 0 | 0dp | 多数静止组件 |
| 1 | 1dp | Elevated 变体（cards、sheets） |
| 2 | 3dp | Menus、nav bar、滚动的 app bar |
| 3 | 6dp | FAB、dialogs、search、date/time pickers |
| 4 | 8dp | 仅 hover/focus 时增加 |
| 5 | 12dp | 仅 hover/focus 时增加 |

### Tonal Elevation（色调高程，非阴影）

MD3 用 **tonal surface color** 而非阴影来传达 elevation。更高的 elevation = 更亮的 surface 色调（light 主题中）或更亮的 surface 色调（dark 主题中）。

surface container role 映射到这一概念：
- Level 0: `surface`（最平）
- Level 1: `surface-container-low`
- Level 2: `surface-container`
- Level 3: `surface-container-high`
- Level 4-5: `surface-container-highest`

### 何时使用阴影

仅在以下情况适合用阴影：
- 组件浮于可能视觉繁杂的内容之上（如 FAB 浮于图片上）
- 除颜色外需要额外的深度线索（如重叠元素）
- 平台惯例预期有阴影（某些 Android 组件）

### CSS Shadow Values（CSS 阴影值）

需要阴影时：

```css
/* Level 1 */
box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);

/* Level 2 */
box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15);

/* Level 3 */
box-shadow: 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3);

/* Level 4 */
box-shadow: 0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3);

/* Level 5 */
box-shadow: 0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3);
```

### Component Elevation Mapping（组件高程映射）

| Level | Components at Rest |
|-------|--------------------|
| 0 | App bar (flat), filled/tonal/outlined buttons, button groups, filled/outlined cards, carousel, chips, full-screen dialogs, icon buttons, lists, nav rail, segmented buttons, sliders, split buttons, tabs |
| 1 | Banners, modal bottom sheet, elevated button, elevated card, elevated chips, modal nav drawer, modal side sheet |
| 2 | App bar (scrolled), menus, nav bar, rich tooltips, toolbar |
| 3 | Date pickers, modal dialogs, extended FAB, FAB, FAB menu close button, search, time pickers |

**Hover/focus**：多数交互组件在 hover/focus 时增加 1 级（如 FAB 从 level 3 到 level 4）。

## Motion（运动）

### Spring-Based Motion（基于弹簧的运动 · Expressive 更新）

MD3 Expressive（2025 年 5 月）为组件动画引入了基于弹簧的运动物理。弹簧创造更自然、更灵敏的运动：

- 弹簧没有固定时长——它们对输入动态响应
- 两种 scheme：**standard**（实用）和 **expressive**（弹性）
- **Jetpack Compose** 在当前 Material3 中暴露 motion schemes / 面向弹簧的 API（见 `MotionScheme` 和你的 BOM）。**MDC-Android** 可能因版本而异。**Web：** Material Web 未实现 Expressive 运动物理——用 easing/duration 或自定义 CSS/JS。**Flutter：** 对照你的 Flutter/Material 版本看是否对等。

### Easing and Duration（缓动与时长 · Transitions）

缓动/时长系统用于**转场**（进入、退出、shared-axis）以及作为 web 回退：

#### Easing Sets（缓动集）

**Emphasized**（多数转场推荐——体现 MD3 风格）：
| Type | CSS Cubic-bezier | Use |
|------|-----------------|-----|
| Emphasized | `cubic-bezier(0.2, 0, 0, 1)` | 在屏幕内开始和结束 |
| Emphasized Decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` | 进入屏幕 |
| Emphasized Accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` | 退出屏幕 |

**Standard**（用于实用转场、web 回退）：
| Type | CSS Cubic-bezier | Use |
|------|-----------------|-----|
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | 在屏幕内开始和结束 |
| Standard Decelerate | `cubic-bezier(0, 0, 0, 1)` | 进入屏幕 |
| Standard Accelerate | `cubic-bezier(0.3, 0, 1, 1)` | 退出屏幕 |

#### Duration Scale（时长比例）

| Token | Value | Use |
|-------|-------|-----|
| Short 1 | 50ms | 微交互 |
| Short 2 | 100ms | 小型转场 |
| Short 3 | 150ms | 小型转场 |
| Short 4 | 200ms | 退出转场 |
| Medium 1 | 250ms | 中型转场 |
| Medium 2 | 300ms | 标准转场 |
| Medium 3 | 350ms | 中型转场 |
| Medium 4 | 400ms | 进入转场 |
| Long 1 | 450ms | 大型转场 |
| Long 2 | 500ms | 大型、强调转场 |
| Long 3 | 550ms | 复杂转场 |
| Long 4 | 600ms | 复杂转场 |
| Extra Long 1 | 700ms | 页面转场 |
| Extra Long 2 | 800ms | 页面转场 |
| Extra Long 3 | 900ms | 复杂页面转场 |
| Extra Long 4 | 1000ms | 复杂页面转场 |

#### Suggested Pairings（推荐搭配）

| Transition | Easing | Duration |
|-----------|--------|----------|
| 元素停留在屏幕上 | Emphasized | 500ms |
| 元素进入屏幕 | Emphasized Decelerate | 400ms |
| 元素永久退出 | Emphasized Accelerate | 200ms |
| 元素临时退出 | Emphasized | 300ms |
| 小型实用转场 | Standard | 300ms |

### CSS 实现

```css
:root {
  /* Easing */
  --md-sys-motion-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);
  --md-sys-motion-easing-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
  --md-sys-motion-easing-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
  --md-sys-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --md-sys-motion-easing-standard-decelerate: cubic-bezier(0, 0, 0, 1);
  --md-sys-motion-easing-standard-accelerate: cubic-bezier(0.3, 0, 1, 1);

  /* Duration */
  --md-sys-motion-duration-short1: 50ms;
  --md-sys-motion-duration-short2: 100ms;
  --md-sys-motion-duration-short3: 150ms;
  --md-sys-motion-duration-short4: 200ms;
  --md-sys-motion-duration-medium1: 250ms;
  --md-sys-motion-duration-medium2: 300ms;
  --md-sys-motion-duration-medium3: 350ms;
  --md-sys-motion-duration-medium4: 400ms;
  --md-sys-motion-duration-long1: 450ms;
  --md-sys-motion-duration-long2: 500ms;
  --md-sys-motion-duration-long3: 550ms;
  --md-sys-motion-duration-long4: 600ms;
  --md-sys-motion-duration-extra-long1: 700ms;
  --md-sys-motion-duration-extra-long2: 800ms;
  --md-sys-motion-duration-extra-long3: 900ms;
  --md-sys-motion-duration-extra-long4: 1000ms;
}

/* Example: dialog enter */
.md3-dialog-enter {
  animation: dialog-enter var(--md-sys-motion-duration-medium4)
             var(--md-sys-motion-easing-emphasized-decelerate);
}

@keyframes dialog-enter {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* Example: fade out */
.md3-fade-out {
  animation: fade-out var(--md-sys-motion-duration-short4)
             var(--md-sys-motion-easing-emphasized-accelerate);
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
```
