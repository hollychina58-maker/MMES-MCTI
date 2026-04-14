---
name: task-001
description: 从PDF提取产品信息
type: project
status: 已完成
agent: free-agent
completed-by: Claude
---

# 任务001：从PDF提取产品信息

## 任务描述
从PDF文件 `D:\projects\MEMS-MCTI\docs\精准测控产品宣传手册.pdf` 中提取：
- 公司介绍
- 所有产品分类（AHRS、IMU、ARG、GS、VG、LAS/LAM、C3000等）
- 每个产品的详细特性列表
- 产品技术参数
- 应用领域
- **不得提取任何联系电话**

## 项目路径
`D:\projects\MEMS-MCTI`

## 产出物
将提取的内容保存到 `D:\projects\MEMS-MCTI\shared\artifacts\resources\product-info.md`

## 状态
[待认领]

## 执行要求
1. 读取PDF文件内容
2. 整理并结构化输出到 markdown 文件
3. **重要**：所有内容需提供多语言版本（中文、英文）
4. 完成后更新任务状态为 [已完成]
