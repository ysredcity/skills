# MD3 Theming and Dynamic Color

创建、应用和管理 Material Design 3 主题的完整指南。

## Theme Architecture（主题架构）

相同的**语义 role**（primary、onSurface、surface containers 等）在每个平台上都出现：

| Platform | Theme surface |
|----------|----------------|
| **Jetpack Compose** | `MaterialTheme(colorScheme, typography, shapes, …)` |
| **Flutter** | `ThemeData` + `ColorScheme`，`useMaterial3: true` |
| **Web** | `:root` 或子树上的 CSS custom properties `--md-sys-*` |

**Web：** [Material Web 仅维护；M3 Expressive 未在 Web 上实现](https://m3.material.io/develop/web)。在知晓该技术栈受限的前提下使用 `@material/web` + CSS。

---

## Jetpack Compose Theming

使用 `androidx.compose.material3.MaterialTheme`。启用时在 **Android 12+ (API 31+)** 上优先使用 **dynamic color**；否则使用 `lightColorScheme` / `darkColorScheme`，或由 [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) 生成的 Kotlin。

```kotlin
import androidx.compose.material3.*
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.ui.platform.LocalContext

@Composable
fun MyAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> darkColorScheme(
            primary = Color(0xFFD0BCFF),
            onPrimary = Color(0xFF381E72),
            // … add remaining roles or use generated Theme.kt
        )
        else -> lightColorScheme(
            primary = Color(0xFF6750A4),
            onPrimary = Color(0xFFFFFFFF),
            // … add remaining roles or use generated Theme.kt
        )
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(),
        shapes = Shapes(),
        content = content
    )
}
```

---

## Flutter Theming

```dart
import 'package:flutter/material.dart';

// Basic MD3 theme from seed
MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.deepPurple,
      brightness: Brightness.light,
    ),
  ),
  darkTheme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.deepPurple,
      brightness: Brightness.dark,
    ),
  ),
);

// Dynamic color (Android 12+)
// Requires package:dynamic_color
DynamicColorBuilder(
  builder: (lightDynamic, darkDynamic) {
    return MaterialApp(
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: lightDynamic ?? ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: darkDynamic ?? ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
      ),
    );
  },
);
```

---

## Web: Theme Builder and CSS

### 1. 选择 Seed Color
从代表你品牌的单个 hex 颜色开始。整个方案都由此 seed 生成。

### 2. 生成方案
用 `@material/material-color-utilities` 生成 light 和 dark 方案：

```bash
npm install @material/material-color-utilities
```

```javascript
import {
  argbFromHex,
  hexFromArgb,
  SchemeContent,
  Hct,
} from '@material/material-color-utilities';

function generateTheme(seedHex, isDark = false, contrast = 0.0) {
  const hct = Hct.fromInt(argbFromHex(seedHex));
  const scheme = new SchemeContent(hct, isDark, contrast);

  return {
    // Primary
    '--md-sys-color-primary': hexFromArgb(scheme.primary),
    '--md-sys-color-on-primary': hexFromArgb(scheme.onPrimary),
    '--md-sys-color-primary-container': hexFromArgb(scheme.primaryContainer),
    '--md-sys-color-on-primary-container': hexFromArgb(scheme.onPrimaryContainer),
    // Secondary
    '--md-sys-color-secondary': hexFromArgb(scheme.secondary),
    '--md-sys-color-on-secondary': hexFromArgb(scheme.onSecondary),
    '--md-sys-color-secondary-container': hexFromArgb(scheme.secondaryContainer),
    '--md-sys-color-on-secondary-container': hexFromArgb(scheme.onSecondaryContainer),
    // Tertiary
    '--md-sys-color-tertiary': hexFromArgb(scheme.tertiary),
    '--md-sys-color-on-tertiary': hexFromArgb(scheme.onTertiary),
    '--md-sys-color-tertiary-container': hexFromArgb(scheme.tertiaryContainer),
    '--md-sys-color-on-tertiary-container': hexFromArgb(scheme.onTertiaryContainer),
    // Error
    '--md-sys-color-error': hexFromArgb(scheme.error),
    '--md-sys-color-on-error': hexFromArgb(scheme.onError),
    '--md-sys-color-error-container': hexFromArgb(scheme.errorContainer),
    '--md-sys-color-on-error-container': hexFromArgb(scheme.onErrorContainer),
    // Surface
    '--md-sys-color-surface': hexFromArgb(scheme.surface),
    '--md-sys-color-on-surface': hexFromArgb(scheme.onSurface),
    '--md-sys-color-on-surface-variant': hexFromArgb(scheme.onSurfaceVariant),
    '--md-sys-color-surface-container-lowest': hexFromArgb(scheme.surfaceContainerLowest),
    '--md-sys-color-surface-container-low': hexFromArgb(scheme.surfaceContainerLow),
    '--md-sys-color-surface-container': hexFromArgb(scheme.surfaceContainer),
    '--md-sys-color-surface-container-high': hexFromArgb(scheme.surfaceContainerHigh),
    '--md-sys-color-surface-container-highest': hexFromArgb(scheme.surfaceContainerHighest),
    '--md-sys-color-surface-dim': hexFromArgb(scheme.surfaceDim),
    '--md-sys-color-surface-bright': hexFromArgb(scheme.surfaceBright),
    // Outline
    '--md-sys-color-outline': hexFromArgb(scheme.outline),
    '--md-sys-color-outline-variant': hexFromArgb(scheme.outlineVariant),
    // Inverse
    '--md-sys-color-inverse-surface': hexFromArgb(scheme.inverseSurface),
    '--md-sys-color-inverse-on-surface': hexFromArgb(scheme.inverseOnSurface),
    '--md-sys-color-inverse-primary': hexFromArgb(scheme.inversePrimary),
  };
}
```

### 3. 应用主题

```javascript
function applyTheme(seedHex, isDark = false, contrast = 0.0) {
  const tokens = generateTheme(seedHex, isDark, contrast);
  const root = document.documentElement;
  for (const [prop, value] of Object.entries(tokens)) {
    root.style.setProperty(prop, value);
  }
}

// Apply light theme
applyTheme('#1A73E8');

// Apply dark theme
applyTheme('#1A73E8', true);

// Apply high contrast
applyTheme('#1A73E8', false, 1.0);
```

### 4. 导出为 CSS

```javascript
function exportAsCSS(seedHex) {
  const light = generateTheme(seedHex, false);
  const dark = generateTheme(seedHex, true);

  let css = ':root {\n';
  for (const [prop, value] of Object.entries(light)) {
    css += `  ${prop}: ${value};\n`;
  }
  css += '}\n\n';
  css += '@media (prefers-color-scheme: dark) {\n  :root {\n';
  for (const [prop, value] of Object.entries(dark)) {
    css += `    ${prop}: ${value};\n`;
  }
  css += '  }\n}\n';
  return css;
}
```

## Brand Color Integration（品牌色整合）

### 映射现有品牌色

如果你已有品牌色，将它们映射到 MD3 role：

| Brand concept | MD3 role |
|--------------|----------|
| 主品牌色 | 用作 `primary` palette 的 seed |
| 次品牌色 | 覆盖 `secondary` 或用作自定义颜色 |
| 强调色 | 映射到 `tertiary` |
| 警告/危险色 | 覆盖 `error`（或保留 MD3 默认） |
| 背景 | 从 seed 生成（不要硬编码） |

### 用品牌色作为 Seed

最简单的方式：用你的主品牌色作为 seed。算法会自动生成和谐的 secondary 和 tertiary 颜色。

```javascript
// Your brand's primary blue
applyTheme('#1A73E8');
```

### 为额外品牌色做 Color Harmonization

如果你需要整合一个并非由 seed 生成的特定品牌色：

```javascript
import { Blend, argbFromHex, hexFromArgb } from '@material/material-color-utilities';

// Your brand's orange accent color
const brandOrange = argbFromHex('#FF6D00');
// The generated primary color
const schemePrimary = argbFromHex('#1A73E8');

// Harmonize: shifts the hue slightly toward primary
const harmonizedOrange = hexFromArgb(Blend.harmonize(brandOrange, schemePrimary));
// Use harmonizedOrange as a custom color in your theme
```

## Dark Theme（深色主题）

### 自动生成

深色主题由相同的 seed color 自动生成。色调映射只是发生偏移：
- Light 主题对 surfaces 使用较亮色调（80-100），对强调色使用较暗色调（10-40）
- Dark 主题反转：对 surfaces 使用较暗色调（4-22），对强调色使用较亮色调（80-90）

### CSS 实现

```css
/* Light theme (default) */
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-surface: #FEF7FF;
  /* ... all light tokens ... */
}

/* Dark theme via media query */
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #D0BCFF;
    --md-sys-color-surface: #141218;
    /* ... all dark tokens ... */
  }
}

/* Dark theme via class (for manual toggle) */
.dark-theme {
  --md-sys-color-primary: #D0BCFF;
  --md-sys-color-surface: #141218;
  /* ... all dark tokens ... */
}
```

### Runtime Theme Switching（运行时主题切换）

```javascript
class ThemeManager {
  constructor(seedHex) {
    this.seedHex = seedHex;
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.contrast = 0.0; // standard

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.isDark = e.matches;
      this.apply();
    });
  }

  apply() {
    const tokens = generateTheme(this.seedHex, this.isDark, this.contrast);
    const root = document.documentElement;
    for (const [prop, value] of Object.entries(tokens)) {
      root.style.setProperty(prop, value);
    }
    root.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }

  toggleDark() {
    this.isDark = !this.isDark;
    this.apply();
  }

  setContrast(level) {
    // 0.0 = standard, 0.5 = medium, 1.0 = high
    this.contrast = level;
    this.apply();
  }

  setSeed(hex) {
    this.seedHex = hex;
    this.apply();
  }
}

// Usage
const theme = new ThemeManager('#6750A4');
theme.apply();

// Toggle dark mode
document.getElementById('theme-toggle').addEventListener('click', () => theme.toggleDark());
```

## High Contrast Themes（高对比度主题）

MD3 支持 3 个对比度级别，通过 `contrast` 参数调整：

| Level | Value | Effect |
|-------|-------|--------|
| Standard | 0.0 | 默认色调距离 |
| Medium | 0.5 | 增大色调距离，更易阅读 |
| High | 1.0 | 最大色调距离，最高可读性 |

```javascript
// Standard contrast
const standard = new SchemeContent(hct, isDark, 0.0);

// Medium contrast
const medium = new SchemeContent(hct, isDark, 0.5);

// High contrast
const high = new SchemeContent(hct, isDark, 1.0);
```

更高的对比度增大配对 color role 之间（如 `primary` 与 `on-primary`）的色调距离，在不从根本上改变色彩感受的前提下让文字更易读。

## Component-Level Overrides（组件级覆盖 · web）

用组件专属的 CSS custom properties 覆盖单个 **web** 组件的外观。**Compose** 使用 `TextFieldDefaults`、`ButtonDefaults`、`MaterialTheme` 等。

```css
/* Override specific button colors */
md-filled-button {
  --md-filled-button-container-color: var(--md-sys-color-tertiary);
  --md-filled-button-label-text-color: var(--md-sys-color-on-tertiary);
}

/* Override text field shape */
md-outlined-text-field {
  --md-outlined-text-field-container-shape: var(--md-sys-shape-corner-medium);
}

/* Override FAB */
md-fab {
  --md-fab-container-color: var(--md-sys-color-tertiary-container);
  --md-fab-icon-color: var(--md-sys-color-on-tertiary-container);
}

/* Override switch colors */
md-switch {
  --md-switch-selected-track-color: var(--md-sys-color-primary);
  --md-switch-selected-handle-color: var(--md-sys-color-on-primary);
}
```

### Component Token Naming Pattern（组件 token 命名模式）

组件 token 遵循：`--md-{component}-{element}-{property}`

示例：
- `--md-filled-button-container-color`
- `--md-filled-button-container-shape`
- `--md-filled-button-label-text-color`
- `--md-outlined-text-field-outline-color`
- `--md-outlined-text-field-focus-outline-color`
- `--md-fab-container-color`
- `--md-fab-container-shape`
- `--md-switch-selected-track-color`

## Dynamic Color from Content（从内容提取动态颜色）

从图片提取颜色并将其应用为主题：

```javascript
import {
  QuantizerCelebi,
  Score,
  argbFromRgb,
} from '@material/material-color-utilities';

async function themeFromImage(imageUrl) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageUrl;
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    pixels.push(argbFromRgb(imageData.data[i], imageData.data[i+1], imageData.data[i+2]));
  }

  // Quantize and score to find best seed color
  const quantized = QuantizerCelebi.quantize(pixels, 128);
  const scored = Score.score(quantized);
  const seedColor = scored[0]; // Best color

  return hexFromArgb(seedColor);
}

// Usage
const seed = await themeFromImage('/album-cover.jpg');
applyTheme(seed);
```

## Scoped Themes（局部主题）

为 UI 的不同区块应用不同主题：

```css
/* Default theme */
:root {
  --md-sys-color-primary: #6750A4;
  /* ... */
}

/* Scoped theme for a section */
.premium-section {
  --md-sys-color-primary: #B69DF8;
  --md-sys-color-primary-container: #3F2D7A;
  /* Only override what changes */
}
```

```html
<main>
  <!-- Uses default theme -->
  <section class="regular">
    <md-filled-button>Standard</md-filled-button>
  </section>

  <!-- Uses premium theme -->
  <section class="premium-section">
    <md-filled-button>Premium</md-filled-button>
  </section>
</main>
```

CSS custom properties 会级联，所以子元素自动继承最近祖先的 token。
