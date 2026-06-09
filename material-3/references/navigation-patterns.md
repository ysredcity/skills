# MD3 Navigation Patterns

选择和实现 Material Design 3 导航组件的指南。

## Jetpack Compose（主要路径）

使用 **`androidx.compose.material3`**：`NavigationBar`、`NavigationRail`、`NavigationDrawerItem`、`ModalNavigationDrawer`、`DismissibleNavigationDrawer`、`PermanentNavigationDrawer`、`NavigationBarItem`、`NavigationRailItem`、top app bars（`TopAppBar`、`CenterAlignedTopAppBar`、`LargeTopAppBar`，expressive 变体按 BOM）以及 **`Scaffold`**（`bottomBar`、`floatingActionButton`、`snackbarHost`）。

用 **Navigation Compose**（`NavHost`、`composable`、`rememberNavController`）连接目的地。对于 **adaptive** UI，使用 **`calculateWindowSizeClass`**、**`androidx.compose.material3.adaptive`** 或 **`currentWindowAdaptiveInfo`** / **`NavigableListDetailPaneScaffold`**（名称和包取决于你的 BOM——查阅 [Android Developers](https://developer.android.com/jetpack/androidx/releases/compose-material3)）。

Material 的 [I/O 2026 更新](https://m3.material.io/blog/whats-new-at-io26) 增加了 expressive/adaptive 侧重：

- 优先为 mobile、desktop、foldables、watches 和 XR 使用 expressive/adaptive scaffolds，而非把单一手机导航模型向上放大。
- Expressive 的 search 和 search app bars 有刷新的视觉风格、运动和更灵活的尾部图标行为。尽量使用当前 Compose Material3 的 API；仅在面向 web 时使用 web/CSS 近似。
- 让导航 spacing 保持在 8dp spacing system 上，使 rail/drawer/app-bar 的间隙能按设备类别和密度自适应。

```kotlin
// Conceptual — adapt routes and selection to your app
Scaffold(
    bottomBar = {
        NavigationBar {
            destinations.forEach { dest ->
                NavigationBarItem(
                    selected = currentRoute == dest.route,
                    onClick = { navController.navigate(dest.route) },
                    icon = { Icon(dest.icon, contentDescription = dest.label) },
                    label = { Text(dest.label) }
                )
            }
        }
    }
) { innerPadding ->
    NavHost(
        navController = navController,
        startDestination = "home",
        modifier = Modifier.padding(innerPadding)
    ) { /* composable routes */ }
}
```

**Web（受限）：** 下方的 HTML/`@material/web` 章节对 token 支持的站点仍然有用；[Material Web 仅维护](https://m3.material.io/develop/web)。

---

## Navigation Component Selection（导航组件选择）

### Decision Tree（决策树）

```
How many primary destinations?
├── 2 destinations → Tabs (primary)
├── 3–5 destinations
│   ├── Compact screen (<600dp) → Navigation Bar (bottom)
│   ├── Medium screen (600–839dp) → Navigation Rail (side)
│   └── Expanded+ screen (840dp+) → Navigation Drawer (side) or Rail
├── 6+ destinations
│   ├── Compact → Navigation Drawer (modal)
│   ├── Medium → Navigation Drawer (standard) or Rail + overflow menu
│   └── Expanded+ → Navigation Drawer (standard)
└── Hierarchical (nested sections)
    └── Navigation Drawer with sections
```

### Quick Reference（速查）

| Component | Destinations | Screen Size | Persistence | Position |
|-----------|-------------|-------------|-------------|----------|
| Navigation Bar | 3–5 | Compact | Persistent | Bottom |
| Navigation Rail | 3–7 | Medium | Persistent | Side (start) |
| Navigation Drawer | Unlimited | Expanded+ | Standard or Modal | Side (start) |
| Tabs | 2+ related views | Any | Persistent | Top (below app bar) |
| Bottom App Bar | — (contextual actions) | Compact | Persistent | Bottom |

## Navigation Bar（底部导航栏）

**使用场景**：紧凑（移动）屏幕上的 3–5 个主要目的地。
**位置**：屏幕底部，始终可见。

### 解剖
- 固定在底部，全宽
- 3–5 个导航项，含图标 + 标签
- 激活项显示填充图标 + 指示药丸（indicator pill）
- 高度：80dp

### 实现

```html
<md-navigation-bar active-index="0">
  <md-navigation-tab label="Home" active-icon="home" inactive-icon="home">
    <md-icon slot="active-icon">home</md-icon>
    <md-icon slot="inactive-icon">home</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Search">
    <md-icon slot="active-icon">search</md-icon>
    <md-icon slot="inactive-icon">search</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Notifications">
    <md-icon slot="active-icon">notifications</md-icon>
    <md-icon slot="inactive-icon">notifications</md-icon>
  </md-navigation-tab>
  <md-navigation-tab label="Profile">
    <md-icon slot="active-icon">person</md-icon>
    <md-icon slot="inactive-icon">person</md-icon>
  </md-navigation-tab>
</md-navigation-bar>
```

### 样式

```css
md-navigation-bar {
  --md-navigation-bar-container-color: var(--md-sys-color-surface-container);
}
```

### 指南
- 始终显示标签（不要仅用图标）
- 激活态用填充图标，未激活用描边图标
- 不要用于少于 3 个或多于 5 个目的地
- 在内容密集的屏幕上可向下滚动时隐藏（可选）
- Elevation level 2（3dp）

## Navigation Rail（侧边导航栏）

**使用场景**：中等屏幕（平板）上的 3–7 个主要目的地。
**位置**：起始边（LTR 中为左侧），始终可见。

### 解剖
- 宽度：80dp
- 顶部可选 FAB
- 导航项垂直堆叠
- 激活项显示指示药丸

### 实现

```html
<nav class="md3-nav-rail" aria-label="Main navigation">
  <!-- Optional FAB -->
  <md-fab size="small" variant="tertiary" aria-label="Compose">
    <md-icon slot="icon">edit</md-icon>
  </md-fab>

  <div class="md3-nav-rail__items" role="tablist">
    <a href="/" class="md3-nav-rail__item" role="tab" aria-selected="true" aria-current="page">
      <div class="md3-nav-rail__indicator">
        <md-icon>home</md-icon>
      </div>
      <span class="md3-nav-rail__label">Home</span>
    </a>
    <a href="/search" class="md3-nav-rail__item" role="tab" aria-selected="false">
      <div class="md3-nav-rail__indicator">
        <md-icon>search</md-icon>
      </div>
      <span class="md3-nav-rail__label">Search</span>
    </a>
    <a href="/settings" class="md3-nav-rail__item" role="tab" aria-selected="false">
      <div class="md3-nav-rail__indicator">
        <md-icon>settings</md-icon>
      </div>
      <span class="md3-nav-rail__label">Settings</span>
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
  border-right: 1px solid var(--md-sys-color-outline-variant);
}

.md3-nav-rail__items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.md3-nav-rail__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: var(--md-sys-color-on-surface-variant);
  font: var(--md-sys-typescale-label-medium);
  cursor: pointer;
  width: 56px;
}

.md3-nav-rail__indicator {
  width: 56px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--md-sys-shape-corner-full);
}

.md3-nav-rail__item[aria-selected="true"] .md3-nav-rail__indicator {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md3-nav-rail__item[aria-selected="true"] {
  color: var(--md-sys-color-on-surface);
}
```

### 指南
- 将项目对齐到顶部（在可选 FAB 下方）
- 始终显示标签（可隐藏，但建议显示）
- 顶部 FAB 可选但常见
- Elevation level 0

## Navigation Drawer（导航抽屉）

**使用场景**：目的地较多、展开式屏幕或深层级。
**位置**：起始边，standard（持久）或 modal（覆盖）。

### Standard Drawer（持久抽屉）

始终与内容并列可见。宽度：360dp。

```html
<div class="md3-layout">
  <md-navigation-drawer opened>
    <div slot="headline">App Name</div>
    <md-list>
      <md-list-item type="button" active>
        <md-icon slot="start">inbox</md-icon>
        <div slot="headline">Inbox</div>
        <div slot="trailing-supporting-text">24</div>
      </md-list-item>
      <md-list-item type="button">
        <md-icon slot="start">send</md-icon>
        <div slot="headline">Sent</div>
      </md-list-item>
      <md-divider></md-divider>
      <md-list-item type="button">
        <md-icon slot="start">drafts</md-icon>
        <div slot="headline">Drafts</div>
      </md-list-item>
    </md-list>
  </md-navigation-drawer>
  <main class="md3-content">
    <!-- Page content -->
  </main>
</div>
```

### Modal Drawer（覆盖抽屉）

用 scrim 覆盖内容。用于较小屏幕或内容空间有限时。

```html
<md-navigation-drawer type="modal" id="nav-drawer">
  <!-- Same content as standard -->
</md-navigation-drawer>

<script>
  // Toggle drawer
  document.getElementById('menu-btn').addEventListener('click', () => {
    const drawer = document.getElementById('nav-drawer');
    drawer.opened = !drawer.opened;
  });
</script>
```

### 指南
- Standard drawer 使用 `surface-container` 背景
- Modal drawer 有 elevation level 1 和 scrim 覆盖
- 用 dividers 和分区标题对目的地分组
- 激活项使用 `secondary-container` 背景
- 形状：end 角为 `large`（LTR 中为右边缘）

## Top App Bar（顶部应用栏）

**使用场景**：每个屏幕都需要标题和可选操作。

**I/O 2026 说明：** Search app bars 属于当前 expressive search 指南的一部分。在 Compose 中，手写之前先检查你的 Material3 BOM 是否提供 expressive app bar 和 search API。对 web，将 token 支持的 top app bar 与自定义 search field/view 结合，因为 Material Web 没有暴露完整的 expressive search 对等实现。

### 变体

| Variant | Title | Height | Scroll Behavior |
|---------|-------|--------|----------------|
| Center-aligned | Center | 64dp | 滚动时升至 level 2 |
| Small | Start-aligned | 64dp | 滚动时升至 level 2 |
| Medium | Bottom, start-aligned | 112dp | 滚动时折叠为 64dp |
| Large | Bottom, start-aligned | 152dp | 滚动时折叠为 64dp |

### 实现

```html
<!-- Small app bar -->
<header class="md3-top-app-bar">
  <md-icon-button aria-label="Open menu">
    <md-icon>menu</md-icon>
  </md-icon-button>
  <h1 class="md3-top-app-bar__title">Page Title</h1>
  <md-icon-button aria-label="Search">
    <md-icon>search</md-icon>
  </md-icon-button>
  <md-icon-button aria-label="More options">
    <md-icon>more_vert</md-icon>
  </md-icon-button>
</header>

<!-- Medium app bar (collapsed state shown; expand on scroll-to-top) -->
<header class="md3-top-app-bar md3-top-app-bar--medium">
  <div class="md3-top-app-bar__row">
    <md-icon-button aria-label="Back"><md-icon>arrow_back</md-icon></md-icon-button>
    <span class="md3-top-app-bar__title-collapsed"></span>
    <md-icon-button aria-label="More"><md-icon>more_vert</md-icon></md-icon-button>
  </div>
  <div class="md3-top-app-bar__expanded-title">
    <h1>Page Title</h1>
  </div>
</header>
```

```css
.md3-top-app-bar {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 4px;
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.md3-top-app-bar__title {
  flex: 1;
  padding: 0 12px;
  font: var(--md-sys-typescale-title-large);
  margin: 0;
}

/* Scrolled state: elevate */
.md3-top-app-bar--scrolled {
  background: var(--md-sys-color-surface-container);
}
```

### Scroll Behavior（滚动行为）

```javascript
// Elevate app bar on scroll
const appBar = document.querySelector('.md3-top-app-bar');
window.addEventListener('scroll', () => {
  appBar.classList.toggle('md3-top-app-bar--scrolled', window.scrollY > 0);
});
```

## Tabs（标签页）

**使用场景**：在同一层级的相关内容之间切换。

### Primary vs Secondary

- **Primary tabs**：顶层内容切换（Flights / Hotels / Explore）
- **Secondary tabs**：primary 内容内的子分区

```html
<!-- Primary tabs -->
<md-tabs>
  <md-primary-tab active>
    <md-icon slot="icon">flight</md-icon>
    Flights
  </md-primary-tab>
  <md-primary-tab>Hotels</md-primary-tab>
  <md-primary-tab>Car Rental</md-primary-tab>
</md-tabs>

<!-- Secondary tabs (nested under primary) -->
<md-tabs>
  <md-secondary-tab active>Overview</md-secondary-tab>
  <md-secondary-tab>Reviews</md-secondary-tab>
  <md-secondary-tab>Photos</md-secondary-tab>
</md-tabs>
```

### Tab + Panel 关联

```html
<md-tabs id="my-tabs">
  <md-primary-tab id="tab-1" aria-controls="panel-1" active>Tab 1</md-primary-tab>
  <md-primary-tab id="tab-2" aria-controls="panel-2">Tab 2</md-primary-tab>
</md-tabs>

<div id="panel-1" role="tabpanel" aria-labelledby="tab-1">
  Panel 1 content
</div>
<div id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>
  Panel 2 content
</div>

<script>
  document.getElementById('my-tabs').addEventListener('change', (e) => {
    // Hide all panels
    document.querySelectorAll('[role="tabpanel"]').forEach(p => p.hidden = true);
    // Show selected panel
    const activeTab = e.target.querySelector('[active]');
    const panelId = activeTab.getAttribute('aria-controls');
    document.getElementById(panelId).hidden = false;
  });
</script>
```

## Responsive Navigation Pattern（响应式导航模式）

关键的 MD3 模式：导航组件随断点而转换。

### Mobile → Tablet → Desktop

```
Compact (<600dp):   Navigation Bar (bottom)
Medium (600–839dp): Navigation Rail (side)
Expanded (840dp+):  Navigation Drawer (side, standard)
```

### CSS 实现

```css
/* Hide all nav variants by default */
.md3-nav-bar,
.md3-nav-rail,
.md3-nav-drawer { display: none; }

/* Compact: show bottom navigation bar */
@media (max-width: 599px) {
  .md3-nav-bar { display: flex; }
  .md3-app { flex-direction: column; }
}

/* Medium: show navigation rail */
@media (min-width: 600px) and (max-width: 839px) {
  .md3-nav-rail { display: flex; }
  .md3-app { flex-direction: row; }
}

/* Expanded+: show navigation drawer */
@media (min-width: 840px) {
  .md3-nav-drawer { display: flex; }
  .md3-app { flex-direction: row; }
}
```

### 完整响应式骨架

```html
<div class="md3-app">
  <!-- Navigation drawer (expanded+) -->
  <aside class="md3-nav-drawer">
    <md-navigation-drawer opened>
      <div slot="headline">My App</div>
      <md-list>
        <md-list-item type="button" active>
          <md-icon slot="start">home</md-icon>Home
        </md-list-item>
        <md-list-item type="button">
          <md-icon slot="start">search</md-icon>Search
        </md-list-item>
        <md-list-item type="button">
          <md-icon slot="start">settings</md-icon>Settings
        </md-list-item>
      </md-list>
    </md-navigation-drawer>
  </aside>

  <!-- Navigation rail (medium) -->
  <nav class="md3-nav-rail" aria-label="Main">
    <md-fab size="small" aria-label="New"><md-icon slot="icon">add</md-icon></md-fab>
    <a class="md3-nav-rail__item active"><md-icon>home</md-icon><span>Home</span></a>
    <a class="md3-nav-rail__item"><md-icon>search</md-icon><span>Search</span></a>
    <a class="md3-nav-rail__item"><md-icon>settings</md-icon><span>Settings</span></a>
  </nav>

  <!-- Main content -->
  <main class="md3-main">
    <header class="md3-top-app-bar">
      <md-icon-button class="md3-menu-btn" aria-label="Menu"><md-icon>menu</md-icon></md-icon-button>
      <h1 class="md3-top-app-bar__title">Home</h1>
    </header>
    <div class="md3-body">
      <!-- Page content -->
    </div>
  </main>

  <!-- Navigation bar (compact) -->
  <md-navigation-bar class="md3-nav-bar">
    <md-navigation-tab label="Home" active>
      <md-icon slot="active-icon">home</md-icon>
      <md-icon slot="inactive-icon">home</md-icon>
    </md-navigation-tab>
    <md-navigation-tab label="Search">
      <md-icon slot="active-icon">search</md-icon>
      <md-icon slot="inactive-icon">search</md-icon>
    </md-navigation-tab>
    <md-navigation-tab label="Settings">
      <md-icon slot="active-icon">settings</md-icon>
      <md-icon slot="inactive-icon">settings</md-icon>
    </md-navigation-tab>
  </md-navigation-bar>
</div>
```

```css
.md3-app {
  display: flex;
  min-height: 100vh;
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.md3-main { flex: 1; display: flex; flex-direction: column; }
.md3-body { flex: 1; padding: 16px; }

/* Compact */
@media (max-width: 599px) {
  .md3-app { flex-direction: column; }
  .md3-nav-rail, .md3-nav-drawer { display: none; }
  .md3-nav-bar { display: flex; order: 1; }
  .md3-menu-btn { display: none; }
}

/* Medium */
@media (min-width: 600px) and (max-width: 839px) {
  .md3-nav-bar, .md3-nav-drawer { display: none; }
  .md3-nav-rail { display: flex; }
  .md3-menu-btn { display: none; }
}

/* Expanded+ */
@media (min-width: 840px) {
  .md3-nav-bar, .md3-nav-rail { display: none; }
  .md3-nav-drawer { display: flex; }
  .md3-menu-btn { display: none; }
}
```
