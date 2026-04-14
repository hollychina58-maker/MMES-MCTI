---
name: task-006
description: 最终审核
type: project
status: 待认领
agent: review-director
---

# 任务006：最终审核

## 任务描述
审核网站是否符合所有用户需求：

### 审核清单
- [ ] 是否参考苹果/WordPress科技模板风格
- [ ] 是否有滚动动效（渐现、上浮、视差）
- [ ] 是否支持8种语言切换
- [ ] 阿拉伯文/波斯文是否RTL布局
- [ ] 语言切换器是否在顶部导航栏右侧
- [ ] 每个产品是否有独立详情页
- [ ] 是否有分享功能（7个平台）
- [ ] 是否有询价表单（4个字段）
- [ ] 表单是否使用EmailJS
- [ ] 公司名称是否为"测控与导航专业公司"
- [ ] **全站是否无任何联系电话**
- [ ] 图片是否从images/目录引用
- [ ] 响应式布局是否正常

## 项目路径
`D:\projects\MEMS-MCTI`

## 依赖任务
task-005（测试完成后再进行审核）

## 产出物
审核结论：`D:\projects\MEMS-MCTI\shared\artifacts\review\review-report.md`

## 状态
[需修改]

## 审核结果
- 审核报告已生成: `D:\projects\MEMS-MCTI\shared\artifacts\review\review-report.md`
- 通过率: 97.4% (18.5/19项)
- 发现问题: 分享功能缺少Instagram按钮（需求明确列出7个平台，但只实现了6个）

## 需要修复
1. 在所有产品详情页添加Instagram分享按钮
2. 由于Instagram官方不支持网页分享链接，可考虑：
   - 链接到公司Instagram主页，或
   - 点击后显示提示信息

## 执行要求
1. 全面检查网站质量
2. 如果发现问题，标记为 [需修改] 并说明原因
3. 如果通过，更新任务状态为 [已完成] 并向项目总监报告
