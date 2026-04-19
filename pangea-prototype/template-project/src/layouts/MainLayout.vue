<template>
  <a-layout class="main-layout">
    <!-- Header -->
    <a-layout-header class="main-header">
      <IconHisense class="header-logo" />
      <span class="platform-name">{{ platformName }}</span>
      <a-menu
        mode="horizontal"
        :selected-keys="[activeTab]"
        class="header-nav"
        @menu-item-click="(key: string) => activeTab = key"
      >
        <a-menu-item v-for="tab in headerTabs" :key="tab.key">
          {{ tab.label }}
        </a-menu-item>
      </a-menu>
      <a-dropdown trigger="hover">
        <a-avatar :size="32" class="header-avatar">
          <icon-user />
        </a-avatar>
        <template #content>
          <a-doption>个人中心</a-doption>
          <a-doption>账号设置</a-doption>
          <a-doption>退出登录</a-doption>
        </template>
      </a-dropdown>
    </a-layout-header>

    <a-layout class="main-body">
      <!-- Sider -->
      <a-layout-sider
        :width="200"
        :collapsed="siderCollapsed"
        :collapsed-width="48"
        class="main-sider"
        :trigger="null"
      >
        <a-menu
          v-model:selected-keys="selectedKeys"
          v-model:open-keys="openKeys"
          :collapsed="siderCollapsed"
          :style="{ width: '100%' }"
          @menu-item-click="handleMenuClick"
        >
          <template v-for="item in menuItems" :key="item.key">
            <a-sub-menu v-if="item.children?.length" :key="item.key">
              <template #icon><component :is="item.icon" /></template>
              <template #title>{{ item.label }}</template>
              <a-menu-item v-for="child in item.children" :key="child.key">
                {{ child.label }}
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else :key="item.key">
              <template #icon><component :is="item.icon" /></template>
              {{ item.label }}
            </a-menu-item>
          </template>
        </a-menu>
        <div class="sider-collapse-btn" @click="siderCollapsed = !siderCollapsed">
          <icon-menu-fold v-if="!siderCollapsed" />
          <icon-menu-unfold v-else />
        </div>
      </a-layout-sider>

      <!-- Content -->
      <a-layout-content class="main-content">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { IconUser, IconLeft, IconRight } from '@arco-design/web-vue/es/icon'
import { IconHome, IconUserGroup, IconSettings, IconDashboard, IconHisense } from '@arco-iconbox/vue-pangea-mobile'

const router = useRouter()

const props = withDefaults(defineProps<{
  platformName?: string
}>(), {
  platformName: '管理后台',
})

const siderCollapsed = ref(false)
const activeTab = ref('tab1')
const selectedKeys = ref<string[]>(['user-management'])
const openKeys = ref<string[]>([])

const headerTabs = [
  { key: 'tab1', label: '工作台' },
  { key: 'tab2', label: '数据中心' },
  { key: 'tab3', label: '系统管理' },
]

const menuItems = ref([
  { key: 'home', label: '首页', icon: markRaw(IconHome) },
  { key: 'user-management', label: '用户管理', icon: markRaw(IconUserGroup) },
  { key: 'dashboard', label: '数据看板', icon: markRaw(IconDashboard) },
  { key: 'settings', label: '系统设置', icon: markRaw(IconSettings) },
])

const handleMenuClick = (key: string) => {
  selectedKeys.value = [key]
  if (key === 'user-management') {
    router.push({ name: 'user-management' })
  }
}
</script>

<style scoped lang="less">
.main-layout {
  height: 100vh;
  overflow: hidden;
  background: var(--color-fill-2);
}

// ── Header ────────────────────────────────────────────────
.main-header {
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 16px 0 20px;
  gap: 16px;
  background: var(--color-fill-2);

  :deep(&.arco-layout-header) {
    background: var(--color-fill-2);
  }
}

.platform-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-1);
  white-space: nowrap;
  flex-shrink: 0;
}

.header-logo {
  font-size: 96px;
  color: rgb(var(--primary-6));
  flex-shrink: 0;
}

.header-nav {
  flex: 1;
  height: 48px;
  background: transparent !important;
  border-bottom: none !important;

  :deep(.arco-menu-light) {
    background: transparent;
  }

  :deep(.arco-menu-inner) {
    padding: 0;
  }

  :deep(.arco-menu-item) {
    background: transparent;
  }
}

.header-avatar {
  cursor: pointer;
  background: rgb(var(--primary-3));
  color: #fff;
  flex-shrink: 0;
}

// ── Body ──────────────────────────────────────────────────
.main-body {
  flex: 1;
  overflow: hidden;
  background: var(--color-fill-2);
}

// ── Sider ─────────────────────────────────────────────────
.main-sider {
  background: var(--color-fill-2);
  border-right: none;
  overflow-y: auto;
  box-shadow: none;

  :deep(.arco-layout-sider-children) {
    background: var(--color-fill-2);
    display: flex;
    flex-direction: column;
  }

  :deep(.arco-menu),
  :deep(.arco-menu-light) {
    background: var(--color-fill-2);
    flex: 1;
    overflow-y: auto;
  }

  :deep(.arco-menu-item),
  :deep(.arco-menu-inline-header) {
    background: transparent;

    &:hover {
      background: var(--color-fill-3);
    }
  }

  :deep(.arco-menu-item.arco-menu-selected) {
    background: var(--color-bg-white) !important;
    color: rgb(var(--primary-6)) !important;
  }

  :deep(.arco-menu-inline-content) {
    background: transparent;
  }
}

.sider-collapse-btn {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-3);
  border-top: 1px solid var(--color-border-2);
  font-size: 16px;
  flex-shrink: 0;

  &:hover {
    color: var(--color-text-1);
    background: var(--color-fill-3);
  }
}

// ── Content ───────────────────────────────────────────────
.main-content {
  overflow: hidden;
  background: var(--color-fill-2);

  :deep(> *) {
    width: 100%;
    height: 100%;
    background: var(--color-bg-white);
    border-radius: 8px 0 0 0;
    overflow: hidden;
  }
}
</style>
