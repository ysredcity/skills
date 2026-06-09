# MD3 Component Catalog

Material Design 3 组件的完整参考。**主要映射：** Jetpack Compose（`androidx.compose.material3`）——当今多数用户在此交付 UI；**web** 使用 `@material/web` 的元素名与导入——[Material Web 仅维护](https://m3.material.io/develop/web)。

## Google I/O 2026 组件更新

Material 的 [I/O 2026 更新](https://m3.material.io/blog/whats-new-at-io26) 着重强调了 **lists**、**menus**、**search** 和 **search app bars** 刷新后的 expressive 指南，以 Jetpack Compose 作为主要实现路径。在 Android 中实现这些时：

- 优先使用当前的 `androidx.compose.material3` 组件，并对照活动的 Material3 BOM 验证 expressive API。
- 预期 expressive 变体会包含更丰富的视觉风格、运动和灵活配置。
- 将 web 实现视为与规范一致的近似，除非 Material Web 暴露了等价组件；Material Web 仍仅处于维护状态。

## Actions（操作）

### Buttons（按钮）

MD3 有 5 种按钮类型，按强调度排序：Filled > Filled Tonal > Elevated > Outlined > Text。

**通用属性**（所有按钮类型共享）：

| Attribute | Type | Description |
|-----------|------|-------------|
| `disabled` | boolean | 禁用按钮 |
| `href` | string | 将按钮变为链接 |
| `target` | string | 链接目标（`_blank` 等） |
| `trailing-icon` | boolean | 将图标移到尾部位置 |
| `type` | string | 表单类型：`button`、`submit`、`reset` |

#### Filled Button
**Element**: `md-filled-button` | **Import**: `@material/web/button/filled-button.js`
**使用场景**：主操作，最高强调。

```html
<md-filled-button>Get started</md-filled-button>
<md-filled-button href="/signup">
  <md-icon slot="icon">arrow_forward</md-icon>
  Sign up
</md-filled-button>
```

**自定义**：`--md-filled-button-container-color`、`--md-filled-button-label-text-color`、`--md-filled-button-container-shape`、`--md-filled-button-container-height`

#### Filled Tonal Button
**Element**: `md-filled-tonal-button` | **Import**: `@material/web/button/filled-tonal-button.js`
**使用场景**：中等强调，比 filled 更柔和。与 filled button 并列的次要操作。

```html
<md-filled-tonal-button>Save draft</md-filled-tonal-button>
```

**自定义**：`--md-filled-tonal-button-container-color`、`--md-filled-tonal-button-label-text-color`

#### Elevated Button
**Element**: `md-elevated-button` | **Import**: `@material/web/button/elevated-button.js`
**使用场景**：带阴影的中等强调。用于 tonal button 会与之融为一体的彩色背景上。

```html
<md-elevated-button>Add to cart</md-elevated-button>
```

#### Outlined Button
**Element**: `md-outlined-button` | **Import**: `@material/web/button/outlined-button.js`
**使用场景**：中等强调，中性。适合次要操作。

```html
<md-outlined-button>Cancel</md-outlined-button>
```

**自定义**：`--md-outlined-button-outline-color`、`--md-outlined-button-outline-width`

#### Text Button
**Element**: `md-text-button` | **Import**: `@material/web/button/text-button.js`
**使用场景**：最低强调。内联操作、对话框操作、不太重要的选项。

```html
<md-text-button>Learn more</md-text-button>
```

#### Button Sizes（按钮尺寸 · Expressive）
按钮现支持 5 种尺寸：extra-small、small（默认）、medium、large、extra-large。通过 CSS 设置：
```css
md-filled-button { --md-filled-button-container-height: 32px; } /* XS */
md-filled-button { --md-filled-button-container-height: 40px; } /* S (default) */
md-filled-button { --md-filled-button-container-height: 48px; } /* M */
md-filled-button { --md-filled-button-container-height: 56px; } /* L */
md-filled-button { --md-filled-button-container-height: 64px; } /* XL */
```

**A11y**：按钮有内置 button role。仅图标按钮时使用 `aria-label`。最小触控目标 48x48dp。

### Button Group（按钮组）
**Element**: `md-button-group` | **Import**: `@material/web/button/button-group.js`
**使用场景**：将相关操作以连贯的视觉处理组合在一起。

```html
<md-button-group>
  <md-outlined-button>Day</md-outlined-button>
  <md-outlined-button>Week</md-outlined-button>
  <md-outlined-button>Month</md-outlined-button>
</md-button-group>
```

### FAB (Floating Action Button)
**Element**: `md-fab` | **Import**: `@material/web/fab/fab.js`
**使用场景**：屏幕上唯一最重要的操作。

| Attribute | Type | Description |
|-----------|------|-------------|
| `size` | string | `small`、`medium`（默认）、`large` |
| `variant` | string | `surface`、`primary`、`secondary`、`tertiary` |
| `label` | string | 文本标签（用于 extended FAB） |

```html
<md-fab aria-label="Create new">
  <md-icon slot="icon">add</md-icon>
</md-fab>

<md-fab size="small" variant="tertiary" aria-label="Edit">
  <md-icon slot="icon">edit</md-icon>
</md-fab>
```

**自定义**：`--md-fab-container-color`、`--md-fab-container-shape`、`--md-fab-icon-color`
**A11y**：由于 FAB 仅有图标，始终提供 `aria-label`。

### Extended FAB
**Element**: `md-extended-fab` | **Import**: `@material/web/fab/extended-fab.js`
**使用场景**：带说明文字的主操作。

```html
<md-extended-fab label="New message">
  <md-icon slot="icon">edit</md-icon>
</md-extended-fab>
```

### Icon Button（图标按钮）
**Element**: `md-icon-button` | **Import**: `@material/web/iconbutton/icon-button.js`

4 个变体，各有独立元素：

| Variant | Element | Import |
|---------|---------|--------|
| Standard | `md-icon-button` | `@material/web/iconbutton/icon-button.js` |
| Filled | `md-filled-icon-button` | `@material/web/iconbutton/filled-icon-button.js` |
| Filled Tonal | `md-filled-tonal-icon-button` | `@material/web/iconbutton/filled-tonal-icon-button.js` |
| Outlined | `md-outlined-icon-button` | `@material/web/iconbutton/outlined-icon-button.js` |

| Attribute | Type | Description |
|-----------|------|-------------|
| `toggle` | boolean | 启用切换行为 |
| `selected` | boolean | 选中态（toggle 时） |

```html
<md-icon-button aria-label="Settings">
  <md-icon>settings</md-icon>
</md-icon-button>

<!-- Toggle icon button (like/unlike) -->
<md-icon-button toggle aria-label="Favorite">
  <md-icon>favorite_border</md-icon>
  <md-icon slot="selected">favorite</md-icon>
</md-icon-button>
```

**A11y**：始终提供 `aria-label`。Toggle 按钮应为两种状态都提供描述性标签。

### Segmented Buttons（分段按钮）
**目前没有 @material/web 元素。** 用标准 HTML + MD3 token 实现：

```html
<div class="md3-segmented-buttons" role="group" aria-label="View options">
  <button class="md3-segmented-button md3-segmented-button--selected" aria-pressed="true">
    <md-icon>view_list</md-icon> List
  </button>
  <button class="md3-segmented-button" aria-pressed="false">
    <md-icon>grid_view</md-icon> Grid
  </button>
</div>
```

```css
.md3-segmented-buttons {
  display: flex;
  border: 1px solid var(--md-sys-color-outline);
  border-radius: var(--md-sys-shape-corner-full);
  overflow: hidden;
}
.md3-segmented-button {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--md-sys-color-on-surface);
  cursor: pointer;
  font: var(--md-sys-typescale-label-large);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.md3-segmented-button--selected {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}
```

## Communication（信息传达）

### Badge（徽标）
**目前没有 @material/web 元素。** 用 CSS 实现：

```html
<div class="md3-badge-container">
  <md-icon>notifications</md-icon>
  <span class="md3-badge md3-badge--large">3</span>
</div>
```

```css
.md3-badge-container { position: relative; display: inline-flex; }
.md3-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--md-sys-color-error);
  color: var(--md-sys-color-on-error);
  border-radius: var(--md-sys-shape-corner-full);
  font: var(--md-sys-typescale-label-small);
}
.md3-badge--small { width: 6px; height: 6px; padding: 0; } /* dot only */
.md3-badge--large { min-width: 16px; height: 16px; padding: 0 4px; text-align: center; }
```

### Progress Indicator（进度指示器）
**Elements**: `md-linear-progress`, `md-circular-progress`
**Import**: `@material/web/progress/linear-progress.js`, `@material/web/progress/circular-progress.js`

| Attribute | Type | Description |
|-----------|------|-------------|
| `value` | number | 当前进度（0–1） |
| `max` | number | 最大值（默认 1） |
| `indeterminate` | boolean | 显示不确定动画 |
| `four-color` | boolean | 四色不确定变体 |

```html
<!-- Determinate -->
<md-linear-progress value="0.6"></md-linear-progress>
<md-circular-progress value="0.75"></md-circular-progress>

<!-- Indeterminate -->
<md-linear-progress indeterminate></md-linear-progress>
<md-circular-progress indeterminate></md-circular-progress>
```

**自定义**：`--md-linear-progress-active-indicator-color`、`--md-circular-progress-active-indicator-color`
**A11y**：有内置 `progressbar` role。添加 `aria-label` 提供上下文（如 "Loading messages"）。

### Snackbar
**目前没有 @material/web 元素。** 用标准 HTML 实现：

```html
<div class="md3-snackbar" role="status" aria-live="polite">
  <span class="md3-snackbar__text">Message sent</span>
  <md-text-button class="md3-snackbar__action">Undo</md-text-button>
  <md-icon-button class="md3-snackbar__close" aria-label="Dismiss">
    <md-icon>close</md-icon>
  </md-icon-button>
</div>
```

```css
.md3-snackbar {
  background: var(--md-sys-color-inverse-surface);
  color: var(--md-sys-color-inverse-on-surface);
  border-radius: var(--md-sys-shape-corner-extra-small);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  max-width: 560px;
}
```

### Tooltip（工具提示）
**目前没有 @material/web 元素。**

两种类型：
- **Plain**：短文本标签，在 hover/focus 时出现。用于图标按钮和被截断的文字。
- **Rich**：多行，含可选操作。用于复杂的说明。

## Containment（容器）

### Card（卡片）
**目前没有 @material/web 元素。** 三个变体：

| Variant | 外观 | Elevation |
|---------|-----------|-----------|
| Filled | surface-container-highest 填充，无边框 | Level 0 |
| Outlined | surface 填充，outline-variant 边框 | Level 0 |
| Elevated | surface-container-low 填充，带阴影 | Level 1 |

```html
<!-- Outlined card -->
<div class="md3-card md3-card--outlined">
  <div class="md3-card__content">
    <h3 style="font: var(--md-sys-typescale-title-medium)">Title</h3>
    <p style="font: var(--md-sys-typescale-body-medium); color: var(--md-sys-color-on-surface-variant)">
      Supporting text
    </p>
  </div>
  <div class="md3-card__actions">
    <md-filled-tonal-button>Action</md-filled-tonal-button>
  </div>
</div>

<!-- Filled card -->
<div class="md3-card md3-card--filled">...</div>

<!-- Elevated card -->
<div class="md3-card md3-card--elevated">...</div>
```

```css
.md3-card {
  border-radius: var(--md-sys-shape-corner-medium, 12px);
  overflow: hidden;
}
.md3-card--outlined {
  background: var(--md-sys-color-surface);
  border: 1px solid var(--md-sys-color-outline-variant);
}
.md3-card--filled {
  background: var(--md-sys-color-surface-container-highest);
}
.md3-card--elevated {
  background: var(--md-sys-color-surface-container-low);
  box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);
}
.md3-card__content { padding: 16px; }
.md3-card__actions { padding: 16px; display: flex; gap: 8px; justify-content: flex-end; }
```

### Dialog（对话框）
**Element**: `md-dialog` | **Import**: `@material/web/dialog/dialog.js`

| Attribute | Type | Description |
|-----------|------|-------------|
| `open` | boolean | 显示对话框 |
| `type` | string | `alert`（默认） |

```html
<md-dialog id="confirm-dialog">
  <div slot="headline">Confirm action</div>
  <form slot="content" method="dialog">
    Are you sure you want to proceed?
  </form>
  <div slot="actions">
    <md-text-button form="confirm-dialog" value="cancel">Cancel</md-text-button>
    <md-filled-tonal-button form="confirm-dialog" value="confirm">Confirm</md-filled-tonal-button>
  </div>
</md-dialog>
```

**A11y**：对话框自动捕获焦点。用 `slot="headline"` 提供可访问的标题。

### Bottom Sheet（底部表单）
**目前没有 @material/web 元素。** 两个变体：Standard（持久，与内容共存）和 Modal（阻断交互，有 scrim）。

### Side Sheet（侧边表单）
**目前没有 @material/web 元素。** 两个变体：Standard（停靠在内容旁）和 Modal（带 scrim 覆盖内容）。

### Divider（分割线）
**Element**: `md-divider` | **Import**: `@material/web/divider/divider.js`

| Attribute | Type | Description |
|-----------|------|-------------|
| `inset` | boolean | 两侧添加缩进 |
| `inset-start` | boolean | 起始侧添加缩进 |
| `inset-end` | boolean | 末尾侧添加缩进 |

```html
<md-divider></md-divider>
<md-divider inset></md-divider>
```

### Carousel（轮播）
**目前没有 @material/web 元素。** 三种配置：
- **Multi-browse**：多个项目可见，可滚动
- **Uncontained**：项目延伸超出视口边缘
- **Hero**：一个大的特色项目配较小预览

## Input（输入）

### Checkbox（复选框）
**Element**: `md-checkbox` | **Import**: `@material/web/checkbox/checkbox.js`

| Attribute | Type | Description |
|-----------|------|-------------|
| `checked` | boolean | 选中态 |
| `indeterminate` | boolean | 不确定态 |
| `disabled` | boolean | 禁用态 |
| `required` | boolean | 表单校验必填 |

```html
<label>
  <md-checkbox></md-checkbox>
  Accept terms
</label>

<label>
  <md-checkbox checked></md-checkbox>
  Remember me
</label>
```

**A11y**：用 `<label>` 包裹或使用 `aria-label`。Checkbox 有内置 checkbox role。

### Chips
**Elements**: `md-chip-set`, `md-assist-chip`, `md-filter-chip`, `md-input-chip`, `md-suggestion-chip`
**Import**: `@material/web/chips/*.js`

| Variant | Element | 用途 |
|---------|---------|-----|
| Assist | `md-assist-chip` | 智能建议、快捷方式 |
| Filter | `md-filter-chip` | 内容筛选、多选 |
| Input | `md-input-chip` | 用户输入的 token（邮件收件人） |
| Suggestion | `md-suggestion-chip` | 建议回复、查询 |

```html
<md-chip-set>
  <md-filter-chip label="Vegetarian" selected></md-filter-chip>
  <md-filter-chip label="Vegan"></md-filter-chip>
  <md-filter-chip label="Gluten-free"></md-filter-chip>
</md-chip-set>

<md-chip-set>
  <md-input-chip label="user@example.com" removable></md-input-chip>
</md-chip-set>
```

### Menu（菜单）
**Elements**: `md-menu`, `md-menu-item`, `md-sub-menu`
**Import**: `@material/web/menu/menu.js`, `@material/web/menu/menu-item.js`

**I/O 2026 说明：** Expressive menus 在 Material 指南中更新为更灵活、鲜活的配置。在 Jetpack Compose 中，当你的 BOM 提供时，优先使用当前的 Material3 menu API 和 expressive 变体。在 web 上，用 `md-menu` / `md-menu-item` 实现 token 支持的菜单，或在需要 expressive 行为时构建与规范一致的自定义变体。

| Attribute (menu) | Type | Description |
|-----------------|------|-------------|
| `anchor` | string | 锚点元素的 ID |
| `open` | boolean | 显示菜单 |
| `positioning` | string | `absolute`、`fixed`、`popover` |

```html
<span style="position: relative;">
  <md-filled-button id="menu-trigger">Options</md-filled-button>
  <md-menu id="options-menu" anchor="menu-trigger">
    <md-menu-item>
      <div slot="headline">Edit</div>
      <md-icon slot="start">edit</md-icon>
    </md-menu-item>
    <md-menu-item>
      <div slot="headline">Delete</div>
      <md-icon slot="start">delete</md-icon>
    </md-menu-item>
  </md-menu>
</span>

<script>
  document.getElementById('menu-trigger').addEventListener('click', () => {
    document.getElementById('options-menu').open = !document.getElementById('options-menu').open;
  });
</script>
```

### Radio Button（单选按钮）
**Element**: `md-radio` | **Import**: `@material/web/radio/radio.js`

```html
<div role="radiogroup" aria-label="Size">
  <label><md-radio name="size" value="s"></md-radio> Small</label>
  <label><md-radio name="size" value="m" checked></md-radio> Medium</label>
  <label><md-radio name="size" value="l"></md-radio> Large</label>
</div>
```

**A11y**：将 radios 放入带 `role="radiogroup"` 和 `aria-label` 的容器中。

### Slider（滑块）
**Element**: `md-slider` | **Import**: `@material/web/slider/slider.js`

| Attribute | Type | Description |
|-----------|------|-------------|
| `value` | number | 当前值 |
| `min` | number | 最小值 |
| `max` | number | 最大值 |
| `step` | number | 步进增量（使其离散） |
| `labeled` | boolean | 显示数值标签 |
| `range` | boolean | 启用范围选择 |
| `value-start` | number | 起始值（range 模式） |
| `value-end` | number | 结束值（range 模式） |

```html
<!-- Continuous -->
<md-slider value="50" min="0" max="100" aria-label="Volume"></md-slider>

<!-- Discrete with label -->
<md-slider value="3" min="1" max="10" step="1" labeled aria-label="Rating"></md-slider>

<!-- Range -->
<md-slider range value-start="20" value-end="80" min="0" max="100" aria-label="Price range"></md-slider>
```

### Switch（开关）
**Element**: `md-switch` | **Import**: `@material/web/switch/switch.js`

| Attribute | Type | Description |
|-----------|------|-------------|
| `selected` | boolean | 开启态 |
| `icons` | boolean | 显示 on/off 图标 |
| `disabled` | boolean | 禁用态 |

```html
<label>
  <md-switch></md-switch>
  Dark mode
</label>

<label>
  <md-switch selected icons></md-switch>
  Notifications
</label>
```

**自定义**：`--md-switch-selected-handle-color`、`--md-switch-selected-track-color`

### Text Field（文本字段）
**Elements**: `md-filled-text-field`, `md-outlined-text-field`
**Import**: `@material/web/textfield/filled-text-field.js`, `@material/web/textfield/outlined-text-field.js`

| Attribute | Type | Description |
|-----------|------|-------------|
| `label` | string | 标签文本 |
| `value` | string | 当前值 |
| `type` | string | 输入类型（text、email、password、number、textarea 等） |
| `placeholder` | string | 占位文本 |
| `required` | boolean | 必填校验 |
| `disabled` | boolean | 禁用态 |
| `error` | boolean | 错误态 |
| `error-text` | string | 错误信息 |
| `supporting-text` | string | 辅助文字 |
| `prefix-text` | string | 前缀文本 |
| `suffix-text` | string | 后缀文本 |
| `max-length` | number | 字符上限（显示计数器） |
| `rows` | number | 行数（用于 textarea） |

```html
<!-- Outlined (recommended for most uses) -->
<md-outlined-text-field
  label="Email"
  type="email"
  required
  supporting-text="We'll never share your email">
</md-outlined-text-field>

<!-- Filled -->
<md-filled-text-field
  label="Search"
  type="text"
  placeholder="Type to search...">
  <md-icon slot="leading-icon">search</md-icon>
</md-filled-text-field>

<!-- With error -->
<md-outlined-text-field
  label="Password"
  type="password"
  error
  error-text="Password must be at least 8 characters"
  min-length="8">
</md-outlined-text-field>

<!-- Textarea -->
<md-outlined-text-field
  label="Message"
  type="textarea"
  rows="4"
  max-length="500">
</md-outlined-text-field>
```

**自定义**：`--md-outlined-text-field-container-shape`、`--md-outlined-text-field-focus-outline-color`、`--md-filled-text-field-container-color`

#### Jetpack Compose

使用 **`androidx.compose.material3`** 中的 **`OutlinedTextField`** / **`TextField`**。面向当前 Material3 版本时优先使用**基于 state 的** API（`TextFieldState`、`rememberTextFieldState()`）——见 [package overview](https://developer.android.com/reference/kotlin/androidx/compose/material3/package-summary)。将 labels、supporting text 和 error state 映射到 MD3 role（`MaterialTheme.colorScheme`、`TextFieldDefaults`）。

```kotlin
// Illustrative — API names vary slightly by Material3 version
val state = rememberTextFieldState("")

OutlinedTextField(
    state = state,
    label = { Text("Email") },
    supportingText = { if (isError) Text("Invalid email") },
    isError = isError,
    modifier = Modifier.fillMaxWidth()
)
```

### Date Picker（日期选择器）
**目前没有 @material/web 元素。** 三种配置：
- **Docked**：附在输入框上的内联日历
- **Modal**：用于选择日期的全对话框
- **Range**：选择日期范围

### Time Picker（时间选择器）
**目前没有 @material/web 元素。** 两种配置：
- **Docked**：内联时间输入
- **Modal**：对话框中的时钟表盘

## Navigation（导航）

### App Bar (Top)（顶部应用栏）
**目前没有 @material/web 元素。** 四个变体：

| Variant | Height | Title position | Scroll behavior |
|---------|--------|---------------|----------------|
| Center-aligned | 64dp | Center | 滚动时升起（elevate） |
| Small | 64dp | Left | 滚动时升起 |
| Medium | 112dp | Left, bottom | 滚动时折叠为 small |
| Large | 152dp | Left, bottom | 滚动时折叠为 small |

**Jetpack Compose：** `TopAppBar`、`CenterAlignedTopAppBar`、`MediumTopAppBar`、`LargeTopAppBar`，以及 expressive 变体（如 large flexible）可能需要 **`@OptIn(ExperimentalMaterial3ExpressiveApi::class)`**，取决于 BOM——检查你的 `material3` 版本。

```html
<header class="md3-top-app-bar md3-top-app-bar--small">
  <md-icon-button aria-label="Menu"><md-icon>menu</md-icon></md-icon-button>
  <span class="md3-top-app-bar__title" style="font: var(--md-sys-typescale-title-large)">
    Page Title
  </span>
  <md-icon-button aria-label="Search"><md-icon>search</md-icon></md-icon-button>
  <md-icon-button aria-label="More"><md-icon>more_vert</md-icon></md-icon-button>
</header>
```

```css
.md3-top-app-bar {
  height: 64px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}
.md3-top-app-bar__title { flex: 1; padding: 0 12px; }
/* Scrolled state */
.md3-top-app-bar--scrolled { background: var(--md-sys-color-surface-container); }
```

### Navigation Bar（导航栏）
**Element**: `md-navigation-bar` | **Import**: `@material/web/navigation/navigation-bar.js`
**使用场景**：3–5 个主要目的地，移动/紧凑屏幕，持久显示。

```html
<md-navigation-bar>
  <md-navigation-tab label="Home" active>
    <md-icon slot="active-icon">home</md-icon>
    <md-icon slot="inactive-icon">home</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Explore">
    <md-icon slot="active-icon">explore</md-icon>
    <md-icon slot="inactive-icon">explore</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Profile">
    <md-icon slot="active-icon">person</md-icon>
    <md-icon slot="inactive-icon">person</md-icon>
  </md-navigation-tab>
</md-navigation-bar>
```

### Navigation Drawer（导航抽屉）
**Element**: `md-navigation-drawer` | **Import**: `@material/web/navigation/navigation-drawer.js`
**使用场景**：目的地较多，较大屏幕，可为 modal 或 persistent。

| Attribute | Type | Description |
|-----------|------|-------------|
| `opened` | boolean | 打开态 |
| `type` | string | `standard` 或 `modal` |

```html
<md-navigation-drawer opened>
  <div slot="headline">Mail</div>
  <md-list>
    <md-list-item type="button" active>
      <md-icon slot="start">inbox</md-icon>
      Inbox
    </md-list-item>
    <md-list-item type="button">
      <md-icon slot="start">send</md-icon>
      Sent
    </md-list-item>
  </md-list>
</md-navigation-drawer>
```

### Navigation Rail（导航栏 · 侧边）
**目前没有 @material/web 元素。** 使用场景：3–7 个目的地，中等屏幕（600–839dp），持久的侧边导航。

```html
<nav class="md3-nav-rail" aria-label="Main">
  <md-fab size="small" variant="tertiary" aria-label="Compose">
    <md-icon slot="icon">edit</md-icon>
  </md-fab>
  <div class="md3-nav-rail__items">
    <a href="/" class="md3-nav-rail__item md3-nav-rail__item--active" aria-current="page">
      <md-icon>home</md-icon>
      <span>Home</span>
    </a>
    <a href="/search" class="md3-nav-rail__item">
      <md-icon>search</md-icon>
      <span>Search</span>
    </a>
  </div>
</nav>
```

```css
.md3-nav-rail {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 12px;
  background: var(--md-sys-color-surface);
}
.md3-nav-rail__items { display: flex; flex-direction: column; gap: 12px; }
.md3-nav-rail__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  text-decoration: none;
  color: var(--md-sys-color-on-surface-variant);
  font: var(--md-sys-typescale-label-medium);
}
.md3-nav-rail__item--active { color: var(--md-sys-color-on-surface); }
```

### Search（搜索）
**目前没有 @material/web 元素。** 两种模式：
- **Search bar**：top app bar 区域中的持久搜索字段
- **Search view**：带建议的可展开搜索覆盖层

**I/O 2026 说明：** Expressive 的 search 和 search app bar 指南增加了刷新的视觉风格、运动和更灵活的尾部图标行为。在 Jetpack Compose 中，尽量使用当前 Material3 的 search API 和 expressive app bar 变体。在 web 上，使用 MD3 的 shape、color、spacing 和 motion token 将 search 实现为自定义组件。

### Tabs（标签页）
**Elements**: `md-tabs`, `md-primary-tab`, `md-secondary-tab`
**Import**: `@material/web/tabs/tabs.js`, `@material/web/tabs/primary-tab.js`, `@material/web/tabs/secondary-tab.js`

| Variant | Element | 用途 |
|---------|---------|-----|
| Primary | `md-primary-tab` | 页面内的顶层导航 |
| Secondary | `md-secondary-tab` | primary tabs 内的子分区 |

```html
<md-tabs>
  <md-primary-tab active>
    <md-icon slot="icon">flight</md-icon>
    Flights
  </md-primary-tab>
  <md-primary-tab>
    <md-icon slot="icon">hotel</md-icon>
    Hotels
  </md-primary-tab>
  <md-primary-tab>
    <md-icon slot="icon">explore</md-icon>
    Explore
  </md-primary-tab>
</md-tabs>
```

**A11y**：tab set 有内置 tablist role。用 `aria-controls` 将 tabs 与 panels 关联。

### Toolbar（工具栏）
**目前没有 @material/web 元素。** 显示与当前页面上下文相关的常用操作。通常放在 top app bar 下方或情境化位置。

## Data Display（数据展示）

### List（列表）
**Elements**: `md-list`, `md-list-item`
**Import**: `@material/web/list/list.js`, `@material/web/list/list-item.js`

**I/O 2026 说明：** Expressive lists 增加了更鲜活的样式和灵活的项目配置。在 Compose 中优先使用 Material3 列表模式，并让 spacing、leading/trailing 内容、supporting text 和 dividers 由 token 驱动。在 web 上，`md-list` 适用于标准列表；expressive 列表处理可能需要自定义 CSS。

| Attribute (list-item) | Type | Description |
|----------------------|------|-------------|
| `type` | string | `text`（默认）、`button`、`link` |
| `href` | string | URL（当 type="link" 时） |
| `disabled` | boolean | 禁用态 |

```html
<md-list>
  <!-- One-line -->
  <md-list-item>Single line item</md-list-item>

  <!-- Two-line with icon -->
  <md-list-item>
    <md-icon slot="start">person</md-icon>
    <div slot="headline">Jane Smith</div>
    <div slot="supporting-text">Senior Developer</div>
  </md-list-item>

  <!-- Three-line -->
  <md-list-item>
    <md-icon slot="start">mail</md-icon>
    <div slot="headline">Meeting notes</div>
    <div slot="supporting-text">Please review the attached notes from today's standup meeting and provide feedback.</div>
    <div slot="trailing-supporting-text">3 min ago</div>
  </md-list-item>

  <md-divider></md-divider>

  <!-- Clickable item -->
  <md-list-item type="button" onclick="handleClick()">
    <md-icon slot="start">settings</md-icon>
    <div slot="headline">Settings</div>
    <md-icon slot="end">chevron_right</md-icon>
  </md-list-item>
</md-list>
```

**Slots**：`start`（leading 元素）、`end`（trailing 元素）、`headline`（主文本）、`supporting-text`（次文本）、`trailing-supporting-text`（尾部元数据）、`overline`（headline 上方）
