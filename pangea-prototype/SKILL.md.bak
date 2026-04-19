---
name: pangea-prototype
description: 快速生成基于 Arco Design Vue + Pangea 3 Linear 主题的完整前端原型工程，可直接 npm install && npm run dev 运行，用于需求对齐和演示。全部使用 mock 数据，不生成后端代码。当用户提到"生成原型"、"做个 demo"、"快速出个页面"、"需求对齐"、"原型演示"、"做个列表页"、"做个表单页"、"做个管理后台页面"、"帮我实现一个 XX 页面"，或者任何需要快速生成 Vue 3 + Arco Design 前端界面的场景，都应该触发这个技能。即使用户只是说"帮我做个 XX 功能的页面"或"出个 XX 的界面"，也要使用这个技能。
---

# Pangea 前端原型生成器

你是一位精通 Arco Design Vue 和 Pangea 3 Linear 主题的前端开发专家，专门快速构建用于需求对齐的前端原型工程。

**核心目标**：生成一个完整的、可直接运行的 Vite + Vue 3 工程，而不是单个 Vue 文件。用户拿到后执行 `npm install && npm run dev` 就能在浏览器里看到效果。

原型的价值在于"快速对齐"，不在于"完整实现"。全部用 mock 数据，不写后端，不写接口调用。

---

## 布局与页面的分离原则

**所有原型工程都必须包含标准布局（MainLayout）**，页面组件只负责内容区域，不包含任何布局结构。这是因为真实产品中所有页面都运行在同一个布局框架下，原型也应如此，才能真实反映最终效果。

工程结构必须区分布局和页面：

```
src/
├── layouts/
│   └── MainLayout.vue    ← 标准布局（Header + Sider + Content），必须生成
├── views/
│   └── XxxPage.vue       ← 页面组件，只写内容区域，不含布局
└── App.vue               ← 用 MainLayout 包裹 router-view 或页面组件
```

**MainLayout 的完整实现规范**在 `references/layout-template.md` 中，生成工程前必须读取。

生成时需要根据用户的业务场景，动态调整 MainLayout 中的以下配置：
- `platformName`：系统名称，通过 prop 传入
- `headerTabs`：顶部导航 Tab，代表模块或子应用（如"工作台"、"订单中心"、"系统设置"）
- `menuItems`：左侧菜单项，根据页面功能设定

**顶部导航与左侧菜单的层级关系**：
- 顶部导航的每个 Tab 代表一个模块或子应用
- 每个模块拥有自己独立的一组左侧菜单，切换 Tab 时左侧菜单跟着切换
- 如果系统只有一个模块（只有一组菜单），则隐藏顶部导航 Tab，只显示左侧菜单

---

## 第一步：读取布局模板，判断页面类型

**第一步永远是读取 `references/layout-template.md`**，获取 MainLayout 的完整实现代码，然后：

1. 判断用户需要的页面类型：
   - **列表页**（数据展示 + 筛选 + 操作）→ 使用下方"列表页模板"
   - **表单页**（新建/编辑数据的独立页面）→ 使用下方"表单页模板"
   - **其他**（仪表盘、详情页等）→ 读取 `references/design-tokens.md` 获取完整 token，按 token 规范构建

2. 如果用户提供了 Figma 节点 ID 或 URL，优先走 Figma 设计稿流程。

---

## 第二步：生成完整工程结构

**必须生成以下所有文件**，缺少任何一个工程都无法运行：

```
<项目名>/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.ts
    ├── App.vue               ← 用 MainLayout 包裹页面
    ├── layouts/
    │   └── MainLayout.vue    ← 标准布局（必须生成，从 layout-template.md 获取）
    ├── router/
    │   └── index.ts          ← 路由配置
    ├── types/
    │   └── arco-iconbox.d.ts ← 图标包类型声明，必须生成
    └── views/
        └── <PageName>.vue    ← 页面组件（只写内容，不含布局）
```

---

## 工程文件模板

### `package.json`

```json
{
  "name": "pangea-prototype",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@arco-design/web-vue": "^2.21.3",
    "@arco-iconbox/vue-pangea-mobile": "1.0.24",
    "@arco-themes/vue-pangea-3-linear": "^1.0.11",
    "vue": "^3.5.13",
    "vue-router": "^5.0.3"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "less": "^4.6.3",
    "typescript": "^5.9.3",
    "vite": "^6.0.3"
  }
}
```

### `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>原型 Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### `src/main.ts`

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'
import '@arco-themes/vue-pangea-3-linear/index.less'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.mount('#app')
```

### `src/App.vue`

```vue
<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
</script>

<style>
#app { width: 100%; height: 100vh; }
</style>
```

### `src/layouts/MainLayout.vue`

从 `references/layout-template.md` 中获取完整代码，根据实际需求调整菜单项配置（`menuItems`）和顶部 Tab（`headerTabs`）。

### `src/router/index.ts`

```ts
import { createRouter, createWebHistory } from 'vue-router'
import XxxPage from '../views/XxxPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/xxx' },
    { path: '/xxx', name: 'xxx', component: XxxPage },
  ],
})

export default router
```

---

## 图标使用规则（重要）

`@arco-iconbox/vue-pangea-mobile` 没有 TypeScript 类型声明，**必须生成 `src/types/arco-iconbox.d.ts`** 才能正常使用。

### `src/types/arco-iconbox.d.ts`（必须生成）

只声明你实际用到的图标，格式如下：

```ts
declare module '@arco-iconbox/vue-pangea-mobile' {
  import { DefineComponent } from 'vue'
  export const IconUser: DefineComponent<{}, {}, any>
  export const IconPlus: DefineComponent<{}, {}, any>
  // ... 只写用到的图标
}
```

### 可用图标列表

`@arco-iconbox/vue-pangea-mobile` 包含以下图标（选择合适的使用）：

**常用操作类**：`IconPlus` `IconMinus` `IconEdit` `IconDelete` `IconSearch` `IconFilter` `IconRefresh` `IconSync` `IconSettings` `IconMore` `IconMoreVertical` `IconClose` `IconCheck` `IconCopy` `IconExport` `IconImport` `IconDownload` `IconUpload` `IconSave` `IconSend`

**导航/方向类**：`IconLeft` `IconRight` `IconUp` `IconDown` `IconArrowLeft` `IconArrowRight` `IconArrowUp` `IconArrowDown` `IconArrowRise` `IconArrowFall` `IconDoubleLeft` `IconDoubleRight` `IconHome` `IconMenu` `IconMenuFold` `IconMenuUnfold`

**用户/权限类**：`IconUser` `IconUserAdd` `IconUserDelete` `IconUserGroup` `IconUsergroupAdd` `IconKey` `IconLock` `IconUnlock` `IconSafe`

**数据/图表类**：`IconDashboard` `IconBarChart` `IconLineChart` `IconPieChart` `IconAreaChart` `IconDotChart` `IconRadarChart` `IconHeatMap` `IconBoxPlot` `IconTable` `IconList` `IconCardView`

**文件/文档类**：`IconFile` `IconFolder` `IconFolderOpen` `IconFolderAdd` `IconDriveFile` `IconFileDone` `IconFileSearch` `IconFilePdf` `IconFileImage` `IconFileAudio` `IconFileVideo`

**状态/反馈类**：`IconCheckCircle` `IconCheckCircleFill` `IconCloseCircle` `IconCloseCircleFill` `IconExclamationCircle` `IconExclamationCircleFill` `IconInfoCircle` `IconInfoCircleFill` `IconWarning` `IconLoading` `IconEmpty`

**商业/业务类**：`IconShop` `IconShopping` `IconShoppingCart` `IconMoneyCollect` `IconDollar` `IconGold` `IconCreditCard` `IconBank` `IconTransaction` `IconWallet` `IconFund`

**时间/日历类**：`IconCalendar` `IconCalendarClock` `IconClockCircle` `IconHistory` `IconSchedule`

**通信/消息类**：`IconMessage` `IconMessageAdd` `IconNotification` `IconEmail` `IconPhone` `IconSend` `IconSendFill`

**其他常用**：`IconMcp` `IconApi` `IconCloud` `IconCloudServer` `IconGlobal` `IconRocket` `IconBulb` `IconFire` `IconStar` `IconStarFill` `IconHeart` `IconTag` `IconTags` `IconPangea` `IconApps` `IconLayout` `IconForm` `IconAudit` `IconProject` `IconBug` `IconCode` `IconGithub`

### 图标导入方式

```vue
<script setup lang="ts">
// 优先使用 Pangea 图标包
import { IconUser, IconPlus, IconSearch } from '@arco-iconbox/vue-pangea-mobile'

// 如果 Pangea 包没有所需图标，再用 Arco 内置图标
import { IconLeft, IconRight } from '@arco-design/web-vue/es/icon'
</script>
```

在响应式数据（ref/reactive）中使用图标时，必须用 `markRaw()` 包裹：

```ts
import { markRaw } from 'vue'
import { IconUser } from '@arco-iconbox/vue-pangea-mobile'

const icon = markRaw(IconUser)  // ✅ 正确
const icon = IconUser           // ❌ 会有 Vue 响应式警告
```

---

## 样式规则

颜色、间距、字体必须使用 CSS 变量，**绝对不能硬编码**：

```less
// ✅ 正确
color: var(--color-text-1);
background: var(--color-bg-2);
border: 1px solid var(--color-border-2);

// ❌ 错误
color: #1d2129;
background: #ffffff;
```

常用 CSS 变量速查：
- 文字：`var(--color-text-1)`（主文字）、`var(--color-text-2)`（次文字）、`var(--color-text-3)`（辅助文字）
- 背景：`var(--color-bg-1)`（整体背景）、`var(--color-bg-2)`（容器背景）
- 边框：`var(--color-border-2)`（默认边框）、`var(--color-border-3)`（强调边框）
- 填充：`var(--color-fill-1)`（浅填充）、`var(--color-fill-2)`（常规填充）
- 主色：`var(--color-primary-6)`（主色）、`var(--color-primary-1)`（主色浅背景）
- 圆角：`var(--border-radius-medium)`（4px）、`var(--border-radius-large)`（8px）

---

## 列表页模板

列表页是最常见的后台页面类型，直接套用此结构：

```vue
<template>
  <div class="list-page">
    <!-- 1. 筛选区域 -->
    <div class="page-header">
      <div class="filter-bar">
        <span class="page-title">页面标题</span>
        <div class="filter-controls">
          <a-input-search v-model="searchKeyword" placeholder="请输入关键词" style="width: 240px" />
          <a-select v-model="filterStatus" placeholder="状态" allow-clear style="width: 120px">
            <a-option value="active">启用</a-option>
            <a-option value="inactive">禁用</a-option>
          </a-select>
          <a-button @click="toggleFilter">
            <template #icon><IconFilter /></template>
            筛选
          </a-button>
        </div>
      </div>
      <!-- 可折叠高级筛选 -->
      <div v-show="filterExpanded" class="filter-panel">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="字段名">
              <a-select placeholder="请选择" />
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right; margin-top: 28px">
            <a-space>
              <a-button @click="resetFilter">重置</a-button>
              <a-button type="primary" @click="handleSearch">查询</a-button>
            </a-space>
          </a-col>
        </a-row>
      </div>
      <!-- 操作栏 -->
      <div class="action-bar">
        <a-button type="primary" @click="handleCreate">
          <template #icon><IconPlus /></template>
          新建
        </a-button>
        <a-button>导出</a-button>
      </div>
    </div>

    <!-- 2. 表格区域 -->
    <div class="content-section">
      <a-table
        :data="tableData"
        :pagination="false"
        :bordered="{ wrapper: true, cell: false }"
        :scroll="{ x: '100%', y: '100%' }"
        :scrollbar="true"
        row-key="id"
      >
        <template #columns>
          <!-- 列定义 -->
          <a-table-column title="操作" fixed="right" :width="120">
            <template #cell="{ record }">
              <a-link @click="handleEdit(record)">编辑</a-link>
              <a-divider direction="vertical" :margin="4" />
              <a-popconfirm content="确认删除？" @ok="handleDelete(record)">
                <a-link status="danger">删除</a-link>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>

    <!-- 3. 分页 -->
    <div class="pagination-section">
      <span class="total-text">共 {{ total }} 条</span>
      <a-pagination :total="total" show-page-size show-jumper />
    </div>
  </div>
</template>
```

**关键样式**（必须包含）：

```less
.list-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg-2);

  .page-header {
    flex-shrink: 0;
    padding: 16px;
    border-bottom: 1px solid var(--color-border-2);

    .page-title { font-size: 18px; font-weight: 600; color: var(--color-text-1); }
    .filter-bar { display: flex; align-items: center; justify-content: space-between; }
    .filter-controls { display: flex; align-items: center; gap: 8px; }
    .filter-panel {
      margin-top: 12px; padding: 12px;
      background: var(--color-fill-1);
      border: 1px solid var(--color-border-3);
      border-radius: 4px;
    }
    .action-bar { margin-top: 12px; display: flex; gap: 8px; }
  }

  .content-section {
    flex: 1;
    overflow: hidden;
    padding: 16px;
  }

  .pagination-section {
    flex-shrink: 0;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--color-border-2);
    .total-text { color: var(--color-text-3); font-size: 14px; }
  }
}
```

---

## 表单页模板

独立的新建/编辑页面（不是弹窗里的表单）：

```vue
<template>
  <div class="form-page">
    <div class="page-header">
      <div class="header-left">
        <a-button type="text" @click="goBack">
          <template #icon><IconLeft /></template>
        </a-button>
        <span class="page-title">新建 XX</span>
      </div>
      <div class="header-right">
        <a-space :size="8">
          <a-button @click="goBack">取消</a-button>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
        </a-space>
      </div>
    </div>
    <div class="form-content">
      <a-form :model="formData" layout="vertical" ref="formRef">
        <div class="form-grid">
          <a-form-item label="字段名" field="fieldName"
            :rules="[{ required: true, message: '请输入' }]">
            <a-input v-model="formData.fieldName" placeholder="请输入" />
          </a-form-item>
          <!-- 全宽字段 -->
          <div class="form-item-full">
            <a-form-item label="描述" field="description">
              <a-textarea v-model="formData.description" placeholder="请输入" :auto-size="{ minRows: 4 }" />
            </a-form-item>
          </div>
        </div>
      </a-form>
    </div>
  </div>
</template>
```

**关键样式**：

```less
.form-page {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  background: var(--color-bg-2);

  .page-header {
    flex-shrink: 0;
    padding: 12px 16px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--color-border-2);
    position: sticky; top: 0; z-index: 10;
    background: var(--color-bg-2);
    .header-left { display: flex; align-items: center; gap: 8px; }
    .page-title { font-size: 18px; font-weight: 600; color: var(--color-text-1); }
  }

  .form-content {
    flex: 1; padding: 24px; overflow-y: auto;
    .form-grid {
      display: flex; flex-wrap: wrap; gap: 24px;
      :deep(.arco-form-item) { width: 381px; margin-bottom: 0; }
      .form-item-full { width: 100%; :deep(.arco-form-item) { width: 100%; } }
    }
  }
}
```

---

## Mock 数据规范

状态类字段优先使用 `<a-badge>` 的 status 模式展示，而不是 `<a-tag>`：

```vue
<a-badge
  :status="record.status === 'active' ? 'success' : 'default'"
  :text="record.status === 'active' ? '启用' : '禁用'"
/>
```

常用 status 值：`success`（绿色）、`warning`（橙色）、`danger`（红色）、`default`（灰色）、`processing`（蓝色动画）。

所有数据在组件内部定义，不调用接口：

```ts
const tableData = ref([
  { id: 1, name: '张三', status: 'active', createTime: '2024-01-15 09:00:00' },
  // 至少 6-8 条，让页面看起来有内容
])
const total = ref(156)  // 分页总数也 mock
```

---

## 质量检查清单

生成完成后对照检查：

- [ ] 工程包含所有必要文件（package.json、vite.config.ts、tsconfig.json、index.html、main.ts、App.vue）
- [ ] **`src/layouts/MainLayout.vue` 已生成**，包含 Header + Sider + Content 标准布局
- [ ] **`src/App.vue` 用 `<MainLayout>` 包裹了 `<router-view />`**，不是直接渲染页面
- [ ] 页面组件（`src/views/`）只写内容区域，不包含 Header/Sider 等布局结构
- [ ] `src/types/arco-iconbox.d.ts` 已生成，且声明了所有用到的 Pangea 图标
- [ ] 图标优先使用 `@arco-iconbox/vue-pangea-mobile`，不足时才用 Arco 内置图标
- [ ] 没有硬编码颜色值，全部使用 CSS 变量
- [ ] 使用了 Arco Design 组件，没有自己实现已有的 UI 组件
- [ ] Mock 数据至少 6-8 条
- [ ] 列表页：表格高度自适应（flex 布局），分页固定在底部
- [ ] 表单页：header 固定（sticky），内容区可滚动
- [ ] 输入框有 placeholder（"请输入"），选择器有 placeholder（"请选择"）
- [ ] 危险操作（删除等）有 `<a-popconfirm>` 二次确认
- [ ] 在响应式数据中使用图标时用了 `markRaw()`

---

## 参考文件

- `references/layout-template.md`：**标准布局 MainLayout 的完整实现代码**（必须读取，每次生成都要用）
- `references/design-tokens.md`：完整的 Pangea 3 Linear 设计 token（颜色、间距、圆角、阴影等），仪表盘等非标准页面必须读取
- `references/ux-spec.md`：UX 规范（响应式、无障碍、国际化等）
