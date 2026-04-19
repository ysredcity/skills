#!/bin/bash
# 初始化原型工作区
# 用法: bash init-workspace.sh <目标目录> <skill根目录>
# 如果目标目录已有 node_modules，跳过 npm install

TARGET_DIR="$1"
SKILL_DIR="$2"
TEMPLATE_DIR="$SKILL_DIR/template-project"

if [ -z "$TARGET_DIR" ] || [ -z "$SKILL_DIR" ]; then
  echo "用法: bash init-workspace.sh <目标目录> <skill根目录>"
  exit 1
fi

# 如果目标目录不存在，从模板复制
if [ ! -f "$TARGET_DIR/package.json" ]; then
  echo "📦 从模板初始化工程..."
  mkdir -p "$TARGET_DIR"
  # 复制除 node_modules 和 dist 外的所有文件
  rsync -a --exclude='node_modules' --exclude='dist' "$TEMPLATE_DIR/" "$TARGET_DIR/"
fi

# 如果没有 node_modules，执行 npm install
if [ ! -d "$TARGET_DIR/node_modules" ]; then
  echo "📥 安装依赖（首次需要，后续跳过）..."
  cd "$TARGET_DIR" && npm install --silent
else
  echo "✅ 依赖已存在，跳过安装"
fi

echo "✅ 工作区就绪: $TARGET_DIR"
