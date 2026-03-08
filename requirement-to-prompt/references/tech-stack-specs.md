# 技术栈规范

## 目录
1. 概览
2. 前端技术栈
3. 响应式适配规范
4. 交互组件规范
5. 数据处理规范
6. 代码组织规范

## 概览
本文档定义了生成原型时使用的技术栈规范。在补充实现要求时，确保符合以下标准。

## 前端技术栈

### 默认技术栈
```
- HTML5：语义化标签
- Tailwind CSS：通过 CDN 引入，使用 utility class
- 原生 JavaScript：ES6+ 语法，不依赖框架
```

### CDN 引用方式
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
<!-- 图标库（可选） -->
<script src="https://unpkg.com/@phosphor-icons/web"></script>
```

### 配置说明
- Tailwind：直接使用 CDN，无需配置文件
- 自定义样式：在 `<style>` 标签中补充
- 全局样式：重置样式、基础样式

## 响应式适配规范

### 断点定义
```
- 移动端：< 640px（sm）
- 平板端：640px - 1024px（md）
- PC端：>= 1024px（lg）
```

### 适配策略
```html
<!-- 布局适配 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- 移动端1列，平板2列，PC端4列 -->
</div>

<!-- 字号适配 -->
<h1 class="text-xl md:text-2xl lg:text-3xl">
  <!-- 移动端20px，平板24px，PC端30px -->
</h1>

<!-- 隐藏显示 -->
<div class="hidden md:block">
  <!-- 移动端隐藏，平板及以上显示 -->
</div>
```

### 交互适配
- 触摸目标：移动端最小 44×44px
- 间距：移动端间距更大，避免误触
- 输入方式：移动端优化虚拟键盘弹出
- 滚动：移动端支持原生滚动，PC端支持滚轮和拖拽

## 交互组件规范

### 表单组件
```html
<!-- 文本输入框 -->
<input type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">

<!-- 下拉选择 -->
<select class="w-full px-4 py-2 border rounded-lg bg-white">
  <option>选项1</option>
  <option>选项2</option>
</select>

<!-- 文本域 -->
<textarea class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
```

### 按钮组件
```html
<!-- 主按钮 -->
<button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  提交
</button>

<!-- 次按钮 -->
<button class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
  取消
</button>

<!-- 危险按钮 -->
<button class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
  删除
</button>
```

### 反馈组件
```html
<!-- 加载状态 -->
<div class="flex items-center justify-center py-8">
  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  <span class="ml-2">加载中...</span>
</div>

<!-- 错误提示 -->
<div class="px-4 py-2 bg-red-100 text-red-700 rounded-lg">
  <span class="font-bold">错误：</span>请检查输入内容
</div>

<!-- 成功提示 -->
<div class="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
  <span class="font-bold">成功：</span>操作已完成
</div>
```

### 模态框组件
```html
<!-- 遮罩层 -->
<div id="modal-overlay" class="fixed inset-0 bg-black bg-opacity-50 hidden z-40">
  <!-- 弹窗 -->
  <div class="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] bg-white rounded-lg shadow-xl z-50">
    <!-- 标题栏 -->
    <div class="flex items-center justify-between px-6 py-4 border-b">
      <h2 class="text-xl font-bold">标题</h2>
      <button class="text-gray-500 hover:text-gray-700">✕</button>
    </div>
    <!-- 内容区 -->
    <div class="px-6 py-4">
      <!-- 弹窗内容 -->
    </div>
    <!-- 操作栏 -->
    <div class="flex justify-end gap-3 px-6 py-4 border-t">
      <button class="px-4 py-2 border rounded-lg">取消</button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">确认</button>
    </div>
  </div>
</div>
```

## 数据处理规范

### Mock 数据定义
```javascript
// 示例数据
const mockData = {
  userList: [
    { id: 1, name: '张三', role: '管理员', status: '正常', createTime: '2024-01-01 10:00:00' },
    { id: 2, name: '李四', role: '普通用户', status: '禁用', createTime: '2024-01-02 14:30:00' }
  ],
  productInfo: {
    name: '示例商品',
    category: '电子',
    price: 999,
    stock: 100
  }
};
```

### 数据渲染
```javascript
// 渲染列表
function renderList(data) {
  const container = document.getElementById('list-container');
  container.innerHTML = data.map(item => `
    <div class="p-4 border rounded-lg hover:bg-gray-50">
      <div class="font-bold">${item.name}</div>
      <div class="text-sm text-gray-500">${item.status}</div>
    </div>
  `).join('');
}
```

### 表单处理
```javascript
// 获取表单数据
function getFormData(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

// 表单验证
function validateForm(data) {
  const errors = [];
  if (!data.name) errors.push('名称不能为空');
  if (!data.email) errors.push('邮箱不能为空');
  return errors;
}
```

### 交互逻辑
```javascript
// 显示/隐藏元素
function toggleElement(id, show) {
  const element = document.getElementById(id);
  if (show) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

// 显示提示信息
function showMessage(message, type = 'success') {
  const alertClass = type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  const alertHtml = `<div class="px-4 py-2 ${alertClass} rounded-lg">${message}</div>`;
  // 添加到页面并自动消失
}
```

## 代码组织规范

### 文件结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
  <!-- 1. CDN 引用 -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- 2. 自定义样式 -->
  <style>
    /* 自定义样式 */
  </style>
</head>
<body>
  <!-- 3. 页面结构 -->
  <div id="app">
    <!-- 页面内容 -->
  </div>

  <!-- 4. JavaScript 代码 -->
  <script>
    // 4.1 Mock 数据
    const mockData = {};

    // 4.2 工具函数
    function helperFunction() {}

    // 4.3 渲染函数
    function render() {}

    // 4.4 事件处理
    document.addEventListener('DOMContentLoaded', function() {
      // 初始化代码
    });
  </script>
</body>
</html>
```

### 命名规范
- 函数：驼峰命名法（`renderList`、`handleSubmit`）
- 常量：大写下划线（`API_URL`、`MAX_COUNT`）
- ID：短横线连接（`list-container`、`submit-button`）
- 类名：短横线连接（`btn-primary`、`input-text`）

### 注释规范
```javascript
// 单行注释：说明代码用途

/**
 * 多行注释：函数说明
 * @param {string} param1 - 参数说明
 * @returns {void} 返回值说明
 */
function functionExample(param1) {
  // 代码实现
}
```

## 最佳实践

### 性能优化
- 避免频繁 DOM 操作，使用文档片段批量更新
- 事件委托：减少事件监听器数量
- 懒加载：延迟加载非首屏内容

### 可访问性
- 语义化 HTML 标签
- 表单标签关联
- 键盘导航支持
- ARIA 属性补充

### 错误处理
```javascript
try {
  // 可能出错的代码
} catch (error) {
  console.error('操作失败:', error);
  showMessage('操作失败，请重试', 'error');
}
```
