# MD3 Layout and Responsive Design

Material Design 3 布局系统的参考：breakpoints、canonical layouts 和响应式实现。

## Jetpack Compose and Android

下方的**断点表（breakpoint table）**是一份**设计**参考。在 **Jetpack Compose** 中，优先使用 **`calculateWindowSizeClass`**（`androidx.compose.material3:material3-window-size-class`）和/或 **`androidx.compose.material3.adaptive`** API（如 `currentWindowAdaptiveInfo`、list-detail scaffolds），而不要到处手写原始的 `BoxWithConstraints` 宽度判断。

**Edge-to-edge：** 当你在系统栏后面绘制时，在 `Activity` 上使用 **`enableEdgeToEdge()`**（AndroidX）。应用 **`WindowInsets`**（`Modifier.statusBarsPadding()`、`navigationBarsPadding()`、**`imePadding()`**、`displayCutoutPadding()` 等）和 **`Scaffold`** 的 `contentWindowInsets`，使内容和 **IME** 行为正确。

**Foldables：** 使用 **`WindowInfoTracker`**、**`FoldingFeature`** 或 Jetpack WindowManager API——见下方折叠屏章节；请对照你的依赖版本验证 API。

---

## Google I/O 2026: Expressive Layout

Material 的 [I/O 2026 更新](https://m3.material.io/blog/whats-new-at-io26) 引入了更广泛的 expressive/adaptive 布局指南：

- **Expressive layout scaffold**：让屏幕在 mobile、desktop、foldables、watches、XR 及其他空间形态之间自适应。在 Compose 中优先使用 Material3 adaptive scaffolds 和 window size classes，而非硬编码的 phone/tablet 分支。
- **8dp spacing system**：将 spacing 视为 token。对 margins、padding、gaps 和组件间距使用 8dp 刻度，使密度和设备类别的变化能够一致地应用。
- **Watch 指南**：使用基于物理的运动、弧形文本样式和贴边容器。避免把手机布局缩小塞进圆形或紧凑的可穿戴屏幕。
- **XR 指南**：使用空间面板和基于深度的高程。不要把 XR 仅当作更大的桌面画布；要考虑深度、舒适度和面板放置。

### Spacing Token 模式

定义一次 spacing，再按上下文映射：

```kotlin
object MdSpacing {
    val xxs = 4.dp
    val xs = 8.dp
    val sm = 16.dp
    val md = 24.dp
    val lg = 32.dp
    val xl = 48.dp
}
```

将 spacing token 用于：
- 屏幕边距（margins）
- 窗格间隙（pane gaps）
- 列表项间距
- 卡片内边距
- 组件组和工具栏

不要在可复用 UI 中到处散布原始 `Dp` 字面量。只有当数值确实是组件专属时，才将一次性数值保留在局部。

---

## Window Size Classes（窗口尺寸类）

MD3 定义 5 个断点类：

| Class | Width Range | Typical Devices | Columns |
|-------|-----------|----------------|---------|
| Compact | < 600dp | Phone portrait | 4 |
| Medium | 600–839dp | Tablet portrait, foldable | 8 |
| Expanded | 840–1199dp | Tablet landscape, small desktop | 12 |
| Large | 1200–1599dp | Desktop | 12 |
| Extra-large | 1600dp+ | Ultra-wide, large desktop | 12 |

### CSS Media Queries（web）

这些用于 **CSS 布局**。**Compose** 应用应使用 window size classes / adaptive API，而不要仅在 CSS 中重复这套逻辑。

```css
/* Compact (default — mobile-first) */
/* No media query needed, this is the base */

/* Medium */
@media (min-width: 600px) { }

/* Expanded */
@media (min-width: 840px) { }

/* Large */
@media (min-width: 1200px) { }

/* Extra-large */
@media (min-width: 1600px) { }
```

### dp 到 px 的换算
在 web 上，标准密度下 1dp ≈ 1px。断点值可直接换算为 CSS 像素。

## Layout Anatomy（布局解剖）

### 关键术语

- **Window**：应用的可见区域
- **Pane**：window 内的布局容器。pane 可以是固定、灵活、浮动或半永久的
- **Column**：pane 内的垂直内容块
- **Margin**：屏幕边缘与内容之间的空间
- **Gutter**：列之间的空间
- **Spacer**：窗格之间的空间（多窗格布局中）

### Margin 和 Gutter 值

| Window Size | Margins | Gutters |
|-------------|---------|---------|
| Compact | 16dp | 8dp |
| Medium | 24dp | 16dp |
| Expanded | 24dp | 16dp |
| Large | 24dp | 24dp |
| Extra-large | 24dp | 24dp |

## Canonical Layouts（规范化布局）

MD3 定义 3 种 canonical layout 作为起点。始终从其中之一开始，而不要从原始网格开始。

### Feed Layout（信息流布局）

**使用场景**：展示大量可浏览的项目集合（社交流、新闻、产品网格）。

```
Compact:    Single column of cards
Medium:     2-column grid
Expanded:   3-column grid
Large:      4-column grid + optional side panel
```

```html
<div class="md3-feed">
  <div class="md3-feed__item">
    <!-- Card content -->
  </div>
  <div class="md3-feed__item">
    <!-- Card content -->
  </div>
  <!-- More items -->
</div>
```

```css
.md3-feed {
  display: grid;
  gap: 8px;
  padding: 16px;
  grid-template-columns: 1fr; /* Compact: 1 column */
}

@media (min-width: 600px) {
  .md3-feed {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 24px;
  }
}

@media (min-width: 840px) {
  .md3-feed {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .md3-feed {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}
```

### List-Detail Layout（列表-详情布局）

**使用场景**：浏览一组各自有详细内容的项目（邮件、文件浏览器、联系人）。

```
Compact:    List view OR detail view (navigate between them)
Medium:     Side-by-side list (1/3) + detail (2/3)
Expanded:   Side-by-side with wider detail pane
```

```html
<div class="md3-list-detail">
  <aside class="md3-list-detail__list">
    <md-list>
      <md-list-item type="button" class="active">
        <div slot="headline">Item 1</div>
        <div slot="supporting-text">Description</div>
      </md-list-item>
      <md-list-item type="button">
        <div slot="headline">Item 2</div>
        <div slot="supporting-text">Description</div>
      </md-list-item>
    </md-list>
  </aside>
  <main class="md3-list-detail__detail">
    <h2>Item 1 Detail</h2>
    <p>Full content here...</p>
  </main>
</div>
```

```css
.md3-list-detail {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.md3-list-detail__list {
  background: var(--md-sys-color-surface-container);
  border-radius: var(--md-sys-shape-corner-large);
  overflow: auto;
}

.md3-list-detail__detail {
  flex: 1;
  padding: 24px;
}

/* Compact: show one at a time */
@media (max-width: 599px) {
  .md3-list-detail__detail { display: none; }
  .md3-list-detail--detail-active .md3-list-detail__list { display: none; }
  .md3-list-detail--detail-active .md3-list-detail__detail { display: block; }
}

/* Medium+: side by side */
@media (min-width: 600px) {
  .md3-list-detail {
    flex-direction: row;
    gap: 24px;
    padding: 24px;
  }
  .md3-list-detail__list {
    width: 360px;
    flex-shrink: 0;
  }
}

/* Expanded: wider detail */
@media (min-width: 840px) {
  .md3-list-detail__list {
    width: 400px;
  }
}
```

### 可调整窗格的拖动手柄（Drag Handle）

在 list-detail 和 supporting pane 布局中，用户可用拖动手柄调整窗格大小：

```html
<div class="md3-list-detail">
  <aside class="md3-list-detail__list">...</aside>
  <div class="md3-drag-handle" role="separator" aria-orientation="vertical" tabindex="0"></div>
  <main class="md3-list-detail__detail">...</main>
</div>
```

```css
.md3-drag-handle {
  width: 4px;
  cursor: col-resize;
  background: transparent;
  position: relative;
}
.md3-drag-handle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 24px;
  background: var(--md-sys-color-outline);
  border-radius: 2px;
}
```

### Supporting Pane Layout（辅助窗格布局）

**使用场景**：主内容需要补充信息（文档 + 属性面板、视频 + 评论）。

```
Compact:    Stacked — primary on top, supporting below (or bottom sheet)
Medium:     Side-by-side (2/3 primary + 1/3 supporting)
Expanded:   Same but with more space
```

```html
<div class="md3-supporting-pane">
  <main class="md3-supporting-pane__primary">
    <!-- Primary content (2/3) -->
  </main>
  <aside class="md3-supporting-pane__secondary">
    <!-- Supporting content (1/3) -->
  </aside>
</div>
```

```css
.md3-supporting-pane {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

/* Medium+: side by side */
@media (min-width: 600px) {
  .md3-supporting-pane {
    flex-direction: row;
    gap: 24px;
    padding: 24px;
  }
  .md3-supporting-pane__primary { flex: 2; }
  .md3-supporting-pane__secondary { flex: 1; }
}
```

## CSS Container Queries（容器查询）

对组件级别的响应式行为（独立于视口），使用 container queries：

```css
/* Define a container */
.md3-card-container {
  container-type: inline-size;
  container-name: card;
}

/* Respond to container width */
@container card (min-width: 400px) {
  .md3-card {
    flex-direction: row; /* Horizontal layout when container is wide */
  }
}

@container card (max-width: 399px) {
  .md3-card {
    flex-direction: column; /* Vertical layout when narrow */
  }
}
```

## Adaptive Component Behavior（自适应组件行为）

组件随断点而转换：

| Component | Compact | Medium (incl. foldable unfolded) | Expanded+ / Large screen |
|-----------|---------|--------|-----------|
| Navigation | Bottom bar | Side rail | Side drawer |
| App bar | Small (64dp) | Small (64dp) | Small or Medium (112dp) |
| Dialog | Full-screen | Centered dialog | Centered dialog (max 560dp wide) |
| Bottom sheet | Full height | Partial height | Side sheet |
| Search | Full-screen search view | Persistent search bar | Persistent search bar |
| Cards | Full-width single column | Multi-column grid | Multi-column grid (max 4 cols) |
| Content panes | Single pane | Optional second pane | Two or three panes |
| Input method | Touch only | Touch + stylus | Touch + mouse/trackpad + keyboard |

## 完整应用布局示例

```html
<div class="md3-app-layout">
  <!-- Navigation (responsive — see navigation-patterns.md) -->
  <nav class="md3-nav" aria-label="Main navigation">
    <!-- Nav content varies by breakpoint -->
  </nav>

  <!-- Main area -->
  <div class="md3-main-area">
    <!-- Top app bar -->
    <header class="md3-top-app-bar">
      <h1 class="md3-top-app-bar__title">Dashboard</h1>
    </header>

    <!-- Content area with canonical layout -->
    <main class="md3-content-area">
      <!-- Use feed, list-detail, or supporting pane here -->
    </main>
  </div>
</div>
```

```css
.md3-app-layout {
  display: flex;
  min-height: 100vh;
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.md3-main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Prevent flex overflow */
}

.md3-content-area {
  flex: 1;
  overflow-y: auto;
}

/* Compact: stack vertically */
@media (max-width: 599px) {
  .md3-app-layout { flex-direction: column; }
  .md3-content-area { padding: 16px; }
}

/* Medium */
@media (min-width: 600px) and (max-width: 839px) {
  .md3-content-area { padding: 24px; }
}

/* Expanded+ */
@media (min-width: 840px) {
  .md3-content-area { padding: 24px; }
}

/* Large+: constrain max content width */
@media (min-width: 1200px) {
  .md3-content-area {
    max-width: 1040px;
    margin: 0 auto;
    padding: 24px;
  }
}
```

## Foldables and Large Screens（折叠屏与大屏）

MD3 为折叠屏设备、平板和大屏形态提供了专门指南。它们在 Material Design 3 中是一等目标——而非事后考虑。

### Foldable Postures（折叠姿态）

折叠屏设备引入了传统手机不存在的姿态：

| Posture | Description | Layout behavior |
|---------|-------------|----------------|
| **Flat (unfolded)** | 设备完全打开，单一大屏 | 按宽度视为 Medium 或 Expanded window class |
| **Half-opened (tabletop)** | 水平对折约 90°，下半部置于桌面 | 在铰链处分割内容——视频/图片在上半部，控件/信息在下半部 |
| **Half-opened (book)** | 垂直对折约 90°，像书一样握持 | 在铰链处分割内容——列表在一侧，详情在另一侧 |
| **Folded** | 设备闭合，外屏/封面屏 | 视为 Compact——仅显示核心内容 |

### Hinge-Aware Layouts（铰链感知布局）

折叠/铰链是物理分隔线。绝不在铰链区域放置可交互内容或关键信息。

**Web — CSS Viewport Segments API：**

```css
/* Detect a dual-screen / foldable device with two horizontal segments */
@media (horizontal-viewport-segments: 2) {
  .md3-list-detail {
    flex-direction: row;
  }
  .md3-list-detail__list {
    /* Span the left segment */
    width: env(viewport-segment-width 0 0);
    margin-right: env(viewport-segment-left 1 0, 0px) - env(viewport-segment-right 0 0, 0px);
  }
  .md3-list-detail__detail {
    flex: 1;
  }
}

/* Detect tabletop posture (two vertical segments) */
@media (vertical-viewport-segments: 2) {
  .md3-media-player {
    display: flex;
    flex-direction: column;
  }
  .md3-media-player__video {
    height: env(viewport-segment-height 0 0);
  }
  .md3-media-player__controls {
    flex: 1;
  }
}
```

**Flutter — `MediaQuery` 与 display features：**

```dart
Widget build(BuildContext context) {
  final displayFeatures = MediaQuery.of(context).displayFeatures;
  final hinge = displayFeatures.whereType<DisplayFeature>().where(
    (f) => f.type == DisplayFeatureType.hinge || f.type == DisplayFeatureType.fold,
  ).firstOrNull;

  if (hinge != null) {
    // Foldable device — split at the hinge
    return TwoPane(
      startPane: ListPane(),
      endPane: DetailPane(),
      paneProportion: 0.5,
      panePriority: isPortrait ? TwoPanePriority.start : TwoPanePriority.both,
    );
  }

  // Single screen — use window size class
  final width = MediaQuery.sizeOf(context).width;
  if (width < 600) return CompactLayout();
  if (width < 840) return MediumLayout();
  return ExpandedLayout();
}
```

**Jetpack Compose — `WindowInfoTracker` 与 `FoldingFeature`：**

```kotlin
@Composable
fun AdaptiveLayout() {
    val windowInfo = WindowInfoTracker.getOrCreate(LocalContext.current)
        .windowLayoutInfo(LocalContext.current as Activity)
        .collectAsState(initial = WindowLayoutInfo(emptyList()))

    val foldingFeature = windowInfo.value.displayFeatures
        .filterIsInstance<FoldingFeature>()
        .firstOrNull()

    when {
        foldingFeature != null && foldingFeature.state == FoldingFeature.State.HALF_OPENED -> {
            // Tabletop or book posture
            if (foldingFeature.orientation == FoldingFeature.Orientation.HORIZONTAL) {
                TabletopLayout(foldingFeature)  // top: content, bottom: controls
            } else {
                BookLayout(foldingFeature)  // left: list, right: detail
            }
        }
        else -> {
            // Standard adaptive layout based on window size class
            val windowSizeClass = calculateWindowSizeClass(LocalContext.current as Activity)
            StandardAdaptiveLayout(windowSizeClass)
        }
    }
}
```

### Tabletop Posture Pattern（桌面姿态模式）

当设备处于 tabletop 姿态（水平折叠，下半部置于平面上）时，内容自然分为两半：

```
┌─────────────────────┐
│                     │  ← Top half: visual content
│   Video / Image /   │     (camera viewfinder, video player,
│   Primary content   │      image gallery, map)
│                     │
├─ ─ ─ hinge ─ ─ ─ ─ ┤
│                     │  ← Bottom half: controls & info
│  Controls / Text /  │     (playback controls, chat input,
│  Supporting info    │      product details, toolbar)
│                     │
└─────────────────────┘
```

### Book Posture Pattern（书本姿态模式）

当设备处于 book 姿态（垂直折叠，像书一样握持）时，自然映射为 list-detail：

```
┌──────────┬──────────┐
│          │          │
│  List /  │  Detail  │
│  Nav /   │  Content │
│  Browse  │  / Edit  │
│          │          │
└──────────┴──────────┘
         hinge
```

### Large Screen Layout Guidance（大屏布局指南）

对于平板、Chromebooks、桌面和大型折叠屏（Expanded、Large、Extra-large）：

**内容宽度约束：**
- 不要把内容拉伸填满超宽屏——超过约 80 字符的行难以扫读
- 将正文内容约束到最大宽度（通常 840–1040dp）并居中
- 用多出来的空间做多窗格布局，而非更宽的单列

```css
/* Constrain content on large screens */
@media (min-width: 1200px) {
  .md3-content-area {
    max-width: 1040px;
    margin-inline: auto;
  }
}
```

**按 window class 的多窗格策略：**

| Window class | Columns | Recommended layout |
|-------------|---------|-------------------|
| Compact (<600dp) | 4 | Single pane. Full-screen navigation between views. |
| Medium (600–839dp) | 8 | Optional second pane. List-detail with narrow list. Rail navigation. |
| Expanded (840–1199dp) | 12 | Two panes standard. List-detail or supporting pane. Drawer navigation. |
| Large (1200–1599dp) | 12 | Two or three panes. Feed with side panel. Persistent supporting pane. |
| Extra-large (1600dp+) | 12 | Three panes or constrained two-pane with generous margins. |

**输入与交互差异：**
- 大屏通常有 mouse/trackpad 输入——hover 状态和右键菜单很重要
- 触控目标仍保持 48dp 最小值，但可以辅以 hover tooltips
- 桌面级设备上预期会有键盘快捷键
- 拖放（drag-and-drop）在大屏上更自然

```css
/* Add hover states for pointer devices */
@media (hover: hover) {
  .md3-card:hover {
    background: color-mix(
      in srgb,
      var(--md-sys-color-on-surface) 8%,
      var(--md-sys-color-surface)
    );
  }

  .md3-list-item:hover {
    background: color-mix(
      in srgb,
      var(--md-sys-color-on-surface) 8%,
      transparent
    );
  }
}

/* Ensure pointer-specific affordances */
@media (pointer: fine) {
  /* Scrollbars, resize handles, tighter spacing are acceptable */
  .md3-drag-handle { cursor: col-resize; }
}
```

**Flutter — 自适应输入：**

```dart
Widget build(BuildContext context) {
  final width = MediaQuery.sizeOf(context).width;
  final isLargeScreen = width >= 840;

  return Scaffold(
    body: Row(
      children: [
        // Navigation adapts
        if (isLargeScreen)
          NavigationRail(
            destinations: destinations,
            selectedIndex: selectedIndex,
            onDestinationSelected: onSelected,
            labelType: NavigationRailLabelType.all,
            leading: FloatingActionButton(
              onPressed: onCompose,
              child: const Icon(Icons.edit),
            ),
          ),
        // Content fills remaining space
        Expanded(
          child: isLargeScreen
              ? Row(
                  children: [
                    SizedBox(width: 360, child: ListPane()),
                    const VerticalDivider(width: 1),
                    Expanded(child: DetailPane()),
                  ],
                )
              : selectedItem == null
                  ? ListPane()
                  : DetailPane(),
        ),
      ],
    ),
    bottomNavigationBar: isLargeScreen
        ? null
        : NavigationBar(
            destinations: destinations.map((d) =>
              NavigationDestination(icon: d.icon, label: d.label)).toList(),
            selectedIndex: selectedIndex,
            onDestinationSelected: onSelected,
          ),
  );
}
```

### Foldable-Aware Canonical Layouts（折叠感知的规范化布局）

三种 canonical layout 自然地适配折叠屏：

| Layout | Foldable behavior |
|--------|------------------|
| **Feed** | Unfolded: multi-column grid fills both halves. Tabletop: grid on top, selected item preview on bottom. |
| **List-detail** | Book posture: list on left half, detail on right half — a perfect natural fit. Tabletop: list on top, detail on bottom. |
| **Supporting pane** | Book posture: primary on left, supporting on right. Tabletop: primary on top, supporting controls on bottom. |

### Testing Large Screens and Foldables（测试大屏与折叠屏）

**Web：**
- 用 Chrome DevTools 响应式模式在 600、840、1200、1600px 断点处测试
- 用 pointer: coarse（触控）和 pointer: fine（鼠标）media queries 测试
- 验证内容在 1600px+ 时不会超出可读行长

**Flutter：**
- 用 `DevicePreview` 包模拟折叠屏和平板
- 用 `MediaQuery` 覆盖 `displayFeatures` 进行测试
- 在 Android 模拟器上运行：Pixel Fold、7.6" foldable、10" tablet、Chromebook

**Compose：**
- 用 Android Studio 折叠屏模拟器（Pixel Fold、7.6" Foldable）
- 测试姿态变化：flat → half-opened → folded
- 用 `WindowInfoTracker` 验证折叠感知的布局切换

### 折叠屏/大屏支持的审计清单

审计时，检查以下具体项：

- [ ] 应用使用 `MediaQuery.sizeOf(context).width` 或等价方式判断 window size class
- [ ] 布局在 600dp 处从 single-pane 切换为 multi-pane
- [ ] 导航转换：bottom bar → rail → drawer，跨断点
- [ ] 大屏上内容有 max-width 约束（不拉伸填满）
- [ ] 没有关键内容或交互元素跨越折叠/铰链
- [ ] 处理折叠姿态（若面向折叠屏设备）：tabletop 和 book 模式
- [ ] 指针设备存在 hover 状态（`@media (hover: hover)`）
- [ ] 即便在大屏上触控目标仍保持 48dp 最小值
- [ ] 在 medium+ 屏幕上对话框居中（而非全屏）
- [ ] bottom sheets 在 expanded+ 屏幕上转为 side sheets

## Spacing System（间距系统）

MD3 使用 4dp 基础网格做间距：

| 用途 | 值 |
|-----|--------|
| 组件内边距 | 4, 8, 12, 16, 24dp |
| 组件之间 | 8, 12, 16, 24dp |
| 区块间距 | 24, 32, 48dp |
| 布局边距 | 16dp（compact）、24dp（medium+） |
| 网格 gutters | 8dp（compact）、16dp（medium）、24dp（large+） |

始终使用 4dp 的倍数以保持一致的空间节奏。
