---
name: task-007
description: 修复Instagram分享按钮缺失
type: project
status: 已完成
agent: tech-director
---

# 任务007：修复Instagram分享按钮缺失

## 任务描述
审核发现：分享功能缺少Instagram按钮（需求明确列出7个平台，但只实现了6个）

## 问题说明
- 需求要求7个分享平台：Facebook, Twitter(X), Instagram, LinkedIn, WhatsApp, Pinterest, Email
- 实际只实现了6个，缺少Instagram
- 影响范围：所有产品详情页 (imu.html, ahrs.html, vg.html, las-lam.html, arg.html, gs.html, c3000.html)

## 修复方案
由于Instagram官方不支持网页分享链接，采用以下方案：
- 在分享按钮区域添加Instagram按钮
- 点击Instagram按钮后显示提示信息："Instagram分享需要使用Instagram App"
- 或打开 Instagram App（如果检测到移动设备）

## 项目路径
`D:\projects\MEMS-MCTI`

## 依赖任务
task-006（审核完成后进行修复）

## 产出物
修复后的所有产品详情页（添加Instagram分享按钮）

## 状态
[已完成]

## 执行要求
1. 在 `js/sharing.js` 中添加 Instagram 分享函数
2. 在所有产品详情页添加 Instagram 分享按钮
3. 更新语言文件，添加 Instagram 相关文案
4. 完成后更新任务状态为 [已完成]
