# 前端代码推送 GitHub 问题排查与解决

## 问题描述

在将 `project` 目录（前端代码）推送到 GitHub 仓库 `hollychina58-maker/MMES-website` 的过程中，遇到了多个技术问题，本文档详细记录每个问题的原因、排查过程和解决方案。

---

## 环境信息

- **操作系统**: Windows 11 Home China
- **Shell**: Git Bash / PowerShell
- **目标仓库**: https://github.com/hollychina58-maker/MMES-website
- **前端框架**: Next.js 16.2.4

---

## 问题一：node_modules 被意外提交

### 现象

首次执行 `git init` 和 `git add -A` 后，发现 `node_modules` 目录被添加到暂存区。

```
node_modules/zod/src/v4/core/tests/recursive-tuples.test.ts
node_modules/zod/src/v4/core/to-json-schema.ts
...（数千个文件）
```

### 原因分析

新初始化的 Git 仓库没有 `.gitignore` 文件，导致所有文件被跟踪。

### 解决方案

1. 创建 `.gitignore` 文件：

```gitignore
# Dependencies
node_modules/

# Build outputs
.next/
out/
build/

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store

# Logs
*.log
npm-debug.log*

# Testing
coverage/
test-results/
playwright-report/

# Misc
.cache/
*.tsbuildinfo
```

2. 从暂存区移除已跟踪的 node_modules：

```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
```

---

## 问题二：.next 构建缓存过大

### 现象

推送时报错：

```
remote: warning: File .next/dev/cache/turbopack/2275bd85/00001811.sst is 59.47 MB
remote: error: File .next/dev/cache/turbopack/2275bd85/00001807.sst is 242.60 MB
remote: error: File node_modules/@next/swc-win32-x64-msvc/next-swc.win32-x64-msvc.node is 130.50 MB
```

### 原因分析

`.next` 开发缓存和 `@next/swc-win32-x64-msvc` 预编译文件超过 GitHub 100MB 限制。

### 解决方案

1. 将 `.next` 和 `node_modules` 添加到 `.gitignore`（已完成）
2. 从 Git 历史中移除这些文件：

```bash
git rm -r --cached .next
git rm -r --cached node_modules
git commit -m "Remove build artifacts from tracking"
```

---

## 问题三：Git 历史中存在大文件导致推送失败

### 现象

即使添加了 `.gitignore`，之前的提交已经包含了 `node_modules` 和 `.next`，推送仍然失败：

```
remote: error: GH001: Large files detected.
You may want to try Git Large File Storage - https://git-lfs.github.com
```

### 原因分析

`.git` 对象库中已存在大文件，虽然最新的提交不再包含它们，但 Git 仍会尝试推送所有对象。

### 解决方案

由于历史提交中包含大文件，最有效的方案是重建 Git 历史：

```bash
# 方法：完全重建 .git 目录
rm -rf .git
git init

# 只添加源代码文件（不含 node_modules、.next 等）
git add .gitignore
git add src/
git add package.json
git add package-lock.json
git add next.config.ts
git add tsconfig.json
git add postcss.config.mjs
git add eslint.config.mjs
git add playwright.config.ts
git add jest.config.js

# 静态资源
git add public/
git add images/
git add data/

# 测试相关
git add e2e/
git add shared/
git add .env.example
git add next-env.d.ts
git add jest.setup.js

git commit -m "Initial frontend commit"

# 添加远程仓库
git remote add origin https://github.com/hollychina58-maker/MMES-website.git

# 重命名分支为 main
git branch -M main

# 推送并设置上游分支
git push -u origin main
```

---

## 问题四：playwright-report 和 test-results 被跟踪

### 现象

发现测试报告文件也被添加到仓库：

```
playwright-report/data/038eab9b2302b1b3d91985f03631adb8752ea507.md
test-results/.last-run.json
```

### 解决方案

将这些目录添加到 `.gitignore` 并从历史中移除：

```bash
git rm -r --cached playwright-report
git rm -r --cached test-results
git add .gitignore
git commit -m "Remove test artifacts from tracking"
```

---

## 完整推送流程（最终成功版本）

### Step 1: 检查当前状态

```bash
cd d:/projects/MMES-MCTI/project
git status
```

### Step 2: 备份重要文件

在重建 Git 前，确保以下文件存在：
- `.gitignore` - Git 忽略配置
- `package.json` - 项目依赖
- `next.config.ts` - Next.js 配置
- `tsconfig.json` - TypeScript 配置
- `src/` - 源代码目录
- `public/` - 静态资源
- `images/` - 图片资源
- `data/` - JSON 数据文件

### Step 3: 删除旧 Git 历史

```bash
# Windows PowerShell
Remove-Item -Recurse -Force '.git'
```

### Step 4: 初始化新 Git 仓库

```bash
git init
```

### Step 5: 创建 .gitignore

```bash
# 详细内容见上文问题一
```

### Step 6: 添加源代码文件

```bash
# 核心配置文件
git add .gitignore
git add package.json
git add package-lock.json
git add next.config.ts
git add tsconfig.json
git add postcss.config.mjs
git add eslint.config.mjs
git add playwright.config.ts
git add jest.config.js

# 源代码
git add src/

# 静态资源
git add public/
git add images/
git add data/

# 测试相关
git add e2e/
git add shared/
git add .env.example
git add next-env.d.ts
git add jest.setup.js
```

### Step 7: 提交更改

```bash
git commit -m "Initial frontend commit"
```

### Step 8: 连接远程仓库

```bash
git remote add origin https://github.com/hollychina58-maker/MMES-website.git
```

### Step 9: 重命名分支（可选）

```bash
git branch -M main
```

### Step 10: 推送到远程

```bash
git push -u origin main
```

---

## GitHub 文件大小限制说明

| 文件大小 | GitHub 限制 | 建议 |
|---------|-------------|------|
| < 50MB | 正常 | 无 |
| 50-100MB | 警告 | 建议优化 |
| > 100MB | 拒绝 | 必须移除或使用 LFS |

---

## .gitignore 最佳实践

```gitignore
# === 依赖 ===
node_modules/
.pnp/
.pnp.js/

# === 构建输出 ===
.next/
out/
build/
.nuxt/
dist/

# === 环境变量 ===
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# === 日志 ===
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# === 测试 ===
coverage/
.nyc_output/
test-results/
playwright-report/

# === 缓存 ===
.cache/
.parcel-cache/

# === IDE ===
.vscode/
.idea/
*.swp
*.swo
*~

# === OS ===
.DS_Store
Thumbs.db

# === 类型 ===
*.tsbuildinfo
next-env.d.ts

# === 其他 ===
# 避免提交压缩包
*.zip
*.tar
*.gz
```

---

## 验证推送结果

```bash
# 检查远程仓库
git remote -v

# 查看提交历史
git log --oneline

# 确认工作区干净
git status
```

---

## 经验总结

1. **始终先创建 .gitignore**：在第一个提交前就创建，避免提交大文件
2. **node_modules 不应进入 Git**：使用 npm/pnpm install 安装
3. **.next 是构建缓存**：每次构建都会变化，不应跟踪
4. **测试报告应忽略**：本地开发产物，不需要版本控制
5. **Windows 下慎用 rm -rf**：使用 PowerShell 的 Remove-Item 更安全

---

## 参考链接

- [GitHub 文件大小限制](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [Git LFS 官网](https://git-lfs.github.com)
- [规范化 .gitignore](https://github.com/github/gitignore)

---

*文档版本: 1.0*
*创建日期: 2026-04-19*
