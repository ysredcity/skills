# MD3 Color System

Material Design 3 配色系统的完整参考：roles、tonal palettes、dynamic color 和 scheme 生成。

## Color Roles（颜色角色）

MD3 定义了 29+ 个 color role，组织为若干组。**Jetpack Compose：** 映射到 `MaterialTheme.colorScheme`（如 `primary`、`onPrimary`）。**Web：** 每个 role 以 CSS custom property `--md-sys-color-{role-name}` 形式存在。

### Accent Colors（强调色）

三个强调色组（primary、secondary、tertiary）各有 4 个 role：

| Role | CSS Token | 用途 |
|------|-----------|---------|
| Primary | `--md-sys-color-primary` | 在 surface 上的高强调填充、文字、图标 |
| On Primary | `--md-sys-color-on-primary` | primary 上的文字和图标 |
| Primary Container | `--md-sys-color-primary-container` | 关键组件（FAB 等）的突出填充 |
| On Primary Container | `--md-sys-color-on-primary-container` | primary-container 上的文字和图标 |
| Secondary | `--md-sys-color-secondary` | 不那么突出的填充、文字、图标 |
| On Secondary | `--md-sys-color-on-secondary` | secondary 上的文字和图标 |
| Secondary Container | `--md-sys-color-secondary-container` | 弱化组件（tonal buttons） |
| On Secondary Container | `--md-sys-color-on-secondary-container` | secondary-container 上的文字和图标 |
| Tertiary | `--md-sys-color-tertiary` | 互补的填充、文字、图标 |
| On Tertiary | `--md-sys-color-on-tertiary` | tertiary 上的文字和图标 |
| Tertiary Container | `--md-sys-color-tertiary-container` | 互补容器填充 |
| On Tertiary Container | `--md-sys-color-on-tertiary-container` | tertiary-container 上的文字和图标 |

**使用指南：**
- **Primary**：最突出的组件——FABs、高强调按钮、激活态
- **Secondary**：不那么突出的组件——filter chips、tonal buttons、选中态
- **Tertiary**：平衡 primary/secondary 的对比强调色——输入字段、badges

### Error Colors（错误色）

不随 dynamic color schemes 改变的静态颜色：

| Role | CSS Token | 用途 |
|------|-----------|---------|
| Error | `--md-sys-color-error` | 用于紧急元素的醒目颜色 |
| On Error | `--md-sys-color-on-error` | error 上的文字和图标 |
| Error Container | `--md-sys-color-error-container` | 错误容器填充 |
| On Error Container | `--md-sys-color-on-error-container` | error-container 上的文字和图标 |

### Surface Colors（表面色）

| Role | CSS Token | 用途 |
|------|-----------|---------|
| Surface | `--md-sys-color-surface` | 默认背景色 |
| On Surface | `--md-sys-color-on-surface` | 任意 surface 上的文字和图标 |
| On Surface Variant | `--md-sys-color-on-surface-variant` | surface 上低强调的文字/图标 |
| Surface Container Lowest | `--md-sys-color-surface-container-lowest` | 最低强调容器 |
| Surface Container Low | `--md-sys-color-surface-container-low` | 低强调容器 |
| Surface Container | `--md-sys-color-surface-container` | 默认容器（导航区域） |
| Surface Container High | `--md-sys-color-surface-container-high` | 高强调容器 |
| Surface Container Highest | `--md-sys-color-surface-container-highest` | 最高强调容器 |
| Surface Dim | `--md-sys-color-surface-dim` | 两种主题中最暗的 surface |
| Surface Bright | `--md-sys-color-surface-bright` | 两种主题中最亮的 surface |

**Surface container 层级**：背景用 `surface`，导航用 `surface-container`。5 个 container 级别创造视觉层级和嵌套深度，对含多窗格的展开式布局尤其有用。

**Surface dim/bright**：与普通 surface（在 light 与 dark 间翻转）不同，dim 和 bright 在两种主题中维持其相对亮度。bright 用于应始终最亮的区域，dim 用于应始终最暗的区域。

### Inverse Colors（反相色）

用于与周围 UI 形成对比的元素（如 snackbars）：

| Role | CSS Token | 用途 |
|------|-----------|---------|
| Inverse Surface | `--md-sys-color-inverse-surface` | 对比元素的背景 |
| Inverse On Surface | `--md-sys-color-inverse-on-surface` | inverse-surface 上的文字 |
| Inverse Primary | `--md-sys-color-inverse-primary` | inverse-surface 上的可操作文字 |

### Outline Colors（轮廓色）

| Role | CSS Token | 用途 |
|------|-----------|---------|
| Outline | `--md-sys-color-outline` | 重要边界（text field 边框，3:1 对比度） |
| Outline Variant | `--md-sys-color-outline-variant` | 装饰性元素（dividers、card 边框） |

**重要**：dividers 不要用 `outline`——用 `outline-variant`。需要 3:1 对比度的交互边界不要用 `outline-variant`——用 `outline`。

### Fixed Accent Colors（固定强调色 · 附加）

它们在 light 和 dark 主题中维持相同颜色（不像普通 container 颜色会改变色调）：

| Role | CSS Token |
|------|-----------|
| Primary Fixed | `--md-sys-color-primary-fixed` |
| Primary Fixed Dim | `--md-sys-color-primary-fixed-dim` |
| On Primary Fixed | `--md-sys-color-on-primary-fixed` |
| On Primary Fixed Variant | `--md-sys-color-on-primary-fixed-variant` |
| Secondary Fixed | `--md-sys-color-secondary-fixed` |
| Secondary Fixed Dim | `--md-sys-color-secondary-fixed-dim` |
| On Secondary Fixed | `--md-sys-color-on-secondary-fixed` |
| On Secondary Fixed Variant | `--md-sys-color-on-secondary-fixed-variant` |
| Tertiary Fixed | `--md-sys-color-tertiary-fixed` |
| Tertiary Fixed Dim | `--md-sys-color-tertiary-fixed-dim` |
| On Tertiary Fixed | `--md-sys-color-on-tertiary-fixed` |
| On Tertiary Fixed Variant | `--md-sys-color-on-tertiary-fixed-variant` |

**注意**：fixed colors 不随主题适配，可能导致对比度问题。对比度关键的元素请使用普通强调色 role。

## Tonal Palette System（色调调色板系统）

MD3 通过 tonal palette 系统从一个 **seed color** 生成颜色：

### 工作原理

1. 选择一个 **seed color**（hex 值）
2. seed 生成 **5 个 tonal palettes**：Primary、Secondary、Tertiary、Neutral、Neutral-Variant
3. 每个 palette 在 **0–100** 之间使用色调停靠点（常用 16 个关键停靠点：0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100）
4. 根据 light 或 dark scheme，color role 被映射到特定的色调值

### 色调值映射（Light Scheme）

| Role | Tonal Palette | Tone |
|------|--------------|------|
| Primary | Primary | 40 |
| On Primary | Primary | 100 |
| Primary Container | Primary | 90 |
| On Primary Container | Primary | 10 |
| Surface | Neutral | 98 |
| On Surface | Neutral | 10 |
| Surface Container | Neutral | 94 |
| Surface Container Low | Neutral | 96 |
| Surface Container Lowest | Neutral | 100 |
| Surface Container High | Neutral | 92 |
| Surface Container Highest | Neutral | 90 |
| Outline | Neutral-Variant | 50 |
| Outline Variant | Neutral-Variant | 80 |

### 色调值映射（Dark Scheme）

| Role | Tonal Palette | Tone |
|------|--------------|------|
| Primary | Primary | 80 |
| On Primary | Primary | 20 |
| Primary Container | Primary | 30 |
| On Primary Container | Primary | 90 |
| Surface | Neutral | 6 |
| On Surface | Neutral | 90 |
| Surface Container | Neutral | 12 |
| Surface Container Low | Neutral | 10 |
| Surface Container Lowest | Neutral | 4 |
| Surface Container High | Neutral | 17 |
| Surface Container Highest | Neutral | 22 |
| Outline | Neutral-Variant | 60 |
| Outline Variant | Neutral-Variant | 30 |

## Color Pairing Rules（颜色配对规则）

颜色必须只在其预期配对中使用，以确保可访问的对比度：

| Container/Fill | Text/Icon Color |
|---------------|----------------|
| `primary` | `on-primary` |
| `primary-container` | `on-primary-container` |
| `secondary` | `on-secondary` |
| `secondary-container` | `on-secondary-container` |
| `tertiary` | `on-tertiary` |
| `tertiary-container` | `on-tertiary-container` |
| `error` | `on-error` |
| `error-container` | `on-error-container` |
| `surface` | `on-surface` 或 `on-surface-variant` |
| `surface-container-*` | `on-surface` 或 `on-surface-variant` |
| `inverse-surface` | `inverse-on-surface` 或 `inverse-primary` |

**绝不在预期配对之外搭配颜色**——这会破坏对比度保证，尤其在 dynamic color 和高对比度模式下。

## Dynamic Color（动态颜色）

Dynamic color 从外部来源创建个性化配色方案：

### User-Generated（壁纸）
操作系统从用户壁纸中提取 seed color 并生成方案。**Android：** 在 **Android 12+ (API 31+)** 上使用 `dynamicLightColorScheme` / `dynamicDarkColorScheme`。**Web：** **没有**等价的浏览器壁纸 dynamic-color API；你可以用库从**内容**（如图片）派生 seed，但那是应用级的，并非系统壁纸主题化。

### Content-Based（基于内容）
从应用内内容（专辑封面、书籍封面等）提取 seed color 以创建情境化方案。

### 用 JavaScript 生成方案

```javascript
import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
} from '@material/material-color-utilities';

// Generate a theme from a seed color
const theme = themeFromSourceColor(argbFromHex('#6750A4'));

// Apply to the document
applyTheme(theme, { target: document.body, dark: false });
```

### 从 Seed 手动生成 CSS

```javascript
import {
  argbFromHex,
  hexFromArgb,
  SchemeContent,
  Hct,
} from '@material/material-color-utilities';

function generateScheme(seedHex, isDark = false) {
  const hct = Hct.fromInt(argbFromHex(seedHex));
  const scheme = new SchemeContent(hct, isDark, 0.0); // 0.0 = standard contrast

  return {
    '--md-sys-color-primary': hexFromArgb(scheme.primary),
    '--md-sys-color-on-primary': hexFromArgb(scheme.onPrimary),
    '--md-sys-color-primary-container': hexFromArgb(scheme.primaryContainer),
    '--md-sys-color-on-primary-container': hexFromArgb(scheme.onPrimaryContainer),
    '--md-sys-color-secondary': hexFromArgb(scheme.secondary),
    '--md-sys-color-on-secondary': hexFromArgb(scheme.onSecondary),
    '--md-sys-color-secondary-container': hexFromArgb(scheme.secondaryContainer),
    '--md-sys-color-on-secondary-container': hexFromArgb(scheme.onSecondaryContainer),
    '--md-sys-color-tertiary': hexFromArgb(scheme.tertiary),
    '--md-sys-color-on-tertiary': hexFromArgb(scheme.onTertiary),
    '--md-sys-color-tertiary-container': hexFromArgb(scheme.tertiaryContainer),
    '--md-sys-color-on-tertiary-container': hexFromArgb(scheme.onTertiaryContainer),
    '--md-sys-color-error': hexFromArgb(scheme.error),
    '--md-sys-color-on-error': hexFromArgb(scheme.onError),
    '--md-sys-color-error-container': hexFromArgb(scheme.errorContainer),
    '--md-sys-color-on-error-container': hexFromArgb(scheme.onErrorContainer),
    '--md-sys-color-surface': hexFromArgb(scheme.surface),
    '--md-sys-color-on-surface': hexFromArgb(scheme.onSurface),
    '--md-sys-color-on-surface-variant': hexFromArgb(scheme.onSurfaceVariant),
    '--md-sys-color-surface-container': hexFromArgb(scheme.surfaceContainer),
    '--md-sys-color-surface-container-low': hexFromArgb(scheme.surfaceContainerLow),
    '--md-sys-color-surface-container-lowest': hexFromArgb(scheme.surfaceContainerLowest),
    '--md-sys-color-surface-container-high': hexFromArgb(scheme.surfaceContainerHigh),
    '--md-sys-color-surface-container-highest': hexFromArgb(scheme.surfaceContainerHighest),
    '--md-sys-color-outline': hexFromArgb(scheme.outline),
    '--md-sys-color-outline-variant': hexFromArgb(scheme.outlineVariant),
    '--md-sys-color-inverse-surface': hexFromArgb(scheme.inverseSurface),
    '--md-sys-color-inverse-on-surface': hexFromArgb(scheme.inverseOnSurface),
    '--md-sys-color-inverse-primary': hexFromArgb(scheme.inversePrimary),
  };
}

// Apply to document
function applyScheme(seedHex, isDark = false) {
  const tokens = generateScheme(seedHex, isDark);
  const root = document.documentElement;
  for (const [property, value] of Object.entries(tokens)) {
    root.style.setProperty(property, value);
  }
}
```

## Color Harmonization（颜色和谐化）

当整合并非来自 seed 的自定义品牌色时，使用 harmonization 将其融入色调系统：

```javascript
import { Blend } from '@material/material-color-utilities';

// Harmonize a custom color with the primary color
const harmonized = Blend.harmonize(customColorArgb, primaryColorArgb);
```

这会将自定义色的色相略微偏向方案的 primary，使其在不失自身特征的前提下显得协调一致。

## User-Controlled Contrast（用户可控对比度 · 2025 年 5 月）

MD3 现支持 3 个对比度级别：
- **Standard**（0.0）：默认对比度
- **Medium**（0.5）：增大各 role 间的色调距离
- **High**（1.0）：为视觉可访问性提供最大色调距离

```javascript
// Generate high contrast scheme
const scheme = new SchemeContent(hct, isDark, 1.0); // 1.0 = high contrast
```

contrast 参数调整配对 role 之间的色调距离，在不改变整体色彩感受的前提下提升可读性。

## Baseline Color Scheme（基线配色方案 · 默认值）

供不使用 dynamic color 的产品采用的静态基线方案：

### Light Theme
```css
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-on-primary-container: #21005D;
  --md-sys-color-secondary: #625B71;
  --md-sys-color-on-secondary: #FFFFFF;
  --md-sys-color-secondary-container: #E8DEF8;
  --md-sys-color-on-secondary-container: #1D192B;
  --md-sys-color-tertiary: #7D5260;
  --md-sys-color-on-tertiary: #FFFFFF;
  --md-sys-color-tertiary-container: #FFD8E4;
  --md-sys-color-on-tertiary-container: #31111D;
  --md-sys-color-error: #B3261E;
  --md-sys-color-on-error: #FFFFFF;
  --md-sys-color-error-container: #F9DEDC;
  --md-sys-color-on-error-container: #410E0B;
  --md-sys-color-surface: #FEF7FF;
  --md-sys-color-on-surface: #1D1B20;
  --md-sys-color-on-surface-variant: #49454F;
  --md-sys-color-surface-container-lowest: #FFFFFF;
  --md-sys-color-surface-container-low: #F7F2FA;
  --md-sys-color-surface-container: #F3EDF7;
  --md-sys-color-surface-container-high: #ECE6F0;
  --md-sys-color-surface-container-highest: #E6E0E9;
  --md-sys-color-surface-dim: #DED8E1;
  --md-sys-color-surface-bright: #FEF7FF;
  --md-sys-color-outline: #79747E;
  --md-sys-color-outline-variant: #CAC4D0;
  --md-sys-color-inverse-surface: #322F35;
  --md-sys-color-inverse-on-surface: #F5EFF7;
  --md-sys-color-inverse-primary: #D0BCFF;
}
```

### Dark Theme
```css
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #D0BCFF;
    --md-sys-color-on-primary: #381E72;
    --md-sys-color-primary-container: #4F378B;
    --md-sys-color-on-primary-container: #EADDFF;
    --md-sys-color-secondary: #CCC2DC;
    --md-sys-color-on-secondary: #332D41;
    --md-sys-color-secondary-container: #4A4458;
    --md-sys-color-on-secondary-container: #E8DEF8;
    --md-sys-color-tertiary: #EFB8C8;
    --md-sys-color-on-tertiary: #492532;
    --md-sys-color-tertiary-container: #633B48;
    --md-sys-color-on-tertiary-container: #FFD8E4;
    --md-sys-color-error: #F2B8B5;
    --md-sys-color-on-error: #601410;
    --md-sys-color-error-container: #8C1D18;
    --md-sys-color-on-error-container: #F9DEDC;
    --md-sys-color-surface: #141218;
    --md-sys-color-on-surface: #E6E0E9;
    --md-sys-color-on-surface-variant: #CAC4D0;
    --md-sys-color-surface-container-lowest: #0F0D13;
    --md-sys-color-surface-container-low: #1D1B20;
    --md-sys-color-surface-container: #211F26;
    --md-sys-color-surface-container-high: #2B2930;
    --md-sys-color-surface-container-highest: #36343B;
    --md-sys-color-surface-dim: #141218;
    --md-sys-color-surface-bright: #3B383E;
    --md-sys-color-outline: #938F99;
    --md-sys-color-outline-variant: #49454F;
    --md-sys-color-inverse-surface: #E6E0E9;
    --md-sys-color-inverse-on-surface: #322F35;
    --md-sys-color-inverse-primary: #6750A4;
  }
}
```
