# 静态个人主页重构设计：CLASSIFIED PERSONNEL FILE

## 1. 背景

当前仓库是一个直接发布到 GitHub Pages 的静态单页站点，根目录仅包含 `index.html`、`CNAME`、`.nojekyll` 和一个上传根目录产物的 GitHub Actions 工作流。

本次重构目标不是在现有页面上继续追加内容，而是将站点整体重建为一个基于 Astro + Tailwind CSS 的静态个人主页，用作在线简历与个人品牌入口。

本项目必须满足以下边界：

- 仅做静态前端站点。
- 不实现后端。
- 不实现真实 Dashboard。
- 不实现 Agent。
- 不接入真实监控或实时数据。
- 所有页面内容通过静态配置文件维护，便于后续改文案。
- 支持部署到 GitHub Pages，并兼容当前仓库的自定义域名使用方式。

## 2. 目标

构建一个主题为 `CLASSIFIED HACKER DOSSIER / 机密黑客档案 / 人才情报档案` 的单页个人主页，使用户一打开页面就像进入一个机密档案系统，同时能快速获取以下信息：

- 个人简介
- 技术方向
- 技能矩阵
- 代表项目
- 博客与技术文章入口
- 联系方式与简历下载入口

该页面的本质是个人主页与在线简历，不是新的全栈产品，也不是概念型交互实验页。

## 3. 成功标准

页面完成后，应满足以下结果：

- 首屏在 5 到 10 秒内能让招聘方读懂用户是谁、关注什么方向、当前求职状态如何。
- 整体风格明显带有 `classified dossier` 与 `terminal system` 气质，但不会影响阅读效率。
- 页面结构清晰，内容维护集中在 `src/data` 下的静态文件中，不需要改组件才能更新文案。
- 页面构建结果可直接发布到 GitHub Pages。
- 页面在桌面端和移动端都能正常阅读，不依赖复杂脚本交互。

## 4. 设计方向结论

已确认采用方案：`Personnel Dossier`。

该方向的核心特征如下：

- 以“人才档案 / 人员卷宗”为主叙事。
- 使用档案卡、编号、状态标签、系统字段、终端日志等元素建立主题感。
- 保持专业、克制、偏简历导向的阅读体验。
- 局部吸收终端系统和证据板风格，但不把页面做成重交互概念展示。

## 5. 视觉语言

### 5.1 色彩

主色彩策略：

- 深色背景
- 终端绿
- 冷白
- 警告红

颜色职责如下：

- 深色背景：承载整体档案系统氛围
- 终端绿：状态、终端文本、矩阵高亮
- 冷白：正文、标题、表格信息
- 警告红：印章、限制状态、次级警示标识

### 5.2 纹理与气氛

允许使用的氛围层：

- 轻微扫描线
- 微弱噪点
- `CLASSIFIED` 水印
- 档案编号
- 终端窗口边框
- 状态戳记，如 `ACCESS GRANTED`、`LIMITED RELEASE`

这些元素的目标是辅助主题，而不是压过内容本身。

### 5.3 动效原则

动效强度定为 `Subtle system motion`。

允许的动画类型：

- 打字机效果
- 轻微状态闪烁
- 低强度 hover 高亮
- 小幅入场过渡
- 细微扫描层或噪点层动态

不应实现的内容：

- 重型终端特效
- 高频闪烁
- 大范围视差
- 影响内容阅读的复杂过场

## 6. 页面信息架构

页面采用单页长滚动结构，并保持以下固定顺序：

1. `Hero / Access Header`
2. `Profile Summary`
3. `Skill Clearance`
4. `Case Files`
5. `Field Logs`
6. `Access Request`

补充规则：

- `Education` 不作为单独大区块存在。
- `Education` 被整合进 `Profile Summary` 附近的小型背景卡片中。
- 照片位放在首屏档案卡中，不单独做一整块内容。
- 博客作为外部站点跳转，不在当前仓库内实现文章系统。

## 7. 首屏设计

### 7.1 布局

首屏采用双栏结构：

- 左栏：主档案信息与终端引导
- 右栏：正式档案身份卡

在移动端下改为纵向堆叠，优先展示左栏主信息，再展示右侧身份卡。

### 7.2 左栏内容

左栏内容固定包含以下模块：

1. 小号系统标签，例如 `CLASSIFIED DOSSIER / CASE FILE`
2. 主标题：`CLASSIFIED PERSONNEL FILE`
3. 机读字段：
   - `Subject: YangYuS8`
   - `Role: DevOps / Infrastructure / Full-stack Builder`
   - `Focus: Linux · Docker · Kubernetes · Automation · Homelab`
   - `Status: Seeking Internship / Entry-level Opportunities`
4. 终端打字区域，按以下顺序展示：
   - `decrypting profile...`
   - `loading field records...`
   - `verifying project evidence...`
   - `access granted`
5. 主操作入口：
   - `Open Case Files`
   - `View Field Logs`
   - `Download Resume`

### 7.3 右栏内容

右栏是 `Formal ID card style` 的身份档案卡。

内容包括：

- 正式照片预留位
- 基础身份信息
- 档案编号
- 状态标签
- 访问级别标签

身份卡字段如下：

- `Clearance: Candidate`
- `Location: China`
- `Track: DevOps / Infra`
- `FILE NO. YYS8-INT-2026`
- `STATUS: VERIFIED`
- `ACCESS: LIMITED RELEASE`

照片位需适配正式证件照或职业半身照，不做娱乐化头像处理。

## 8. Profile Summary

该区块承担“档案摘要 / Executive Brief”功能，不写成长篇自述。

### 8.1 内容目标

用 1 段简洁英文文案说明以下重点：

- 关注 DevOps
- 关注技术运营与基础设施
- 关注 Linux、Docker、k3s、CI/CD
- 具备全栈交付能力

语气要求：

- 冷静
- 专业
- 像档案摘要
- 不写成情绪化自我介绍

### 8.2 教育信息

教育信息作为一个紧凑的辅助卡片出现，放在该区块同层。

教育卡字段如下：

- `Institution`
- `Major`
- `Expected Graduation`
- `Academic Focus`

教育信息需要可见，但不能压过工程与项目能力的主体叙事。

## 9. Skill Clearance

### 9.1 展示方式

技能区采用 `clearance matrix` 形式，而不是普通 tag 云。

每项技能一行，至少包含：

- 技能名称
- 评级可视化
- 简短状态语义

可视化形式固定为“分段矩阵格 + 简短状态语义”。

最终目标是让访问者一眼看出相对强弱，而不是阅读传统“精通 / 熟练 / 了解”字样。

### 9.2 固定技能项

本区块固定包含以下条目：

- `Linux Systems`
- `Docker / Compose`
- `Nginx / Caddy`
- `GitHub Actions`
- `Kubernetes / k3s`
- `Monitoring / Observability`
- `Troubleshooting`
- `Full-stack Development`

### 9.3 语义风格

技能等级语义固定为 `Operational Confidence`。

语义需要贴合主题，但不能让招聘方看不懂。

## 10. Case Files

### 10.1 区块定位

`Case Files` 是主页中的项目证据区，用于展示 3 个代表项目。

每个项目使用统一结构的项目档案卡，强调“证据材料”而不是普通卡片式作品列表。

### 10.2 项目列表

固定展示以下 3 个项目：

1. `OpsPulse`
   - 描述：`terminal-first homelab heartbeat console`
   - 技术栈：`Go Agent / Go Server / SQLite / SSE / SvelteKit / Caddy`
2. `LWE`
   - 描述：`Linux wallpaper engine`
   - 技术栈：`Rust / Tauri / Svelte / AppImage`
3. `CodeJudge`
   - 描述：`online judge system`
   - 技术栈：`Django / Vue / REST API / Monaco Editor`

### 10.3 项目卡结构

每张卡片固定字段如下：

- `Case File ID`
- `Objective`
- `Stack`
- `Status`
- `Evidence Link`

这样做可以确保后续替换项目时只需要改静态数据，不需要重写布局逻辑。

## 11. Field Logs

### 11.1 区块定位

`Field Logs` 是博客与技术文章入口，不实现真实博客系统。

### 11.2 内容形式

该区块展示：

- 2 到 4 篇精选文章
- 1 个完整博客入口

每篇文章卡片固定包含：

- `Log ID`
- 标题
- 摘要
- 发布日期
- 标签

区块角落或底部需提供明确入口：

- `Open Full Log Archive`

其行为是跳转到外部博客站点。

## 12. Access Request

### 12.1 区块定位

页面底部作为联系与转化区，承担简历下载和外部链接出口功能。

### 12.2 固定入口

必须包含以下入口：

- `GitHub`
- `Blog`
- `Email`
- `Resume Download`

呈现方式：

- 类似系统授权面板或访问请求面板
- 入口可带简短说明文案
- 不做表单
- 不做后端交互

辅助文案风格示例：

- `source code archive`
- `technical log archive`
- `direct contact channel`
- `static PDF dossier`

## 13. 文案语言策略

语言方向已确定为：`英文为主`。

规则如下：

- 页面主标题、区块标题、状态标签、交互按钮以英文为主。
- 如需补充说明，可在极少量位置保留中文语义，但不能破坏主视觉一致性。
- 页面整体阅读体验应首先服务英文信息架构。

## 14. 静态数据组织

页面所有内容必须从静态数据文件中读取，避免把文案硬编码进组件。

数据结构如下：

```text
src/data/
  profile.ts
  projects.ts
  posts.ts
  links.ts
```

各文件职责：

- `profile.ts`
  - 姓名
  - 角色
  - focus
  - 求职状态
  - summary
  - education
  - 档案编号
  - 照片路径
- `projects.ts`
  - 项目标题
  - 描述
  - 技术栈
  - case id
  - 状态
  - 项目链接
- `posts.ts`
  - 精选文章标题
  - 摘要
  - 日期
  - 标签
  - 链接
- `links.ts`
  - GitHub
  - Blog
  - Email
  - Resume

## 15. 组件与目录结构

目录结构如下：

```text
src/
  components/
    dossier/
      Hero.astro
      ProfileSummary.astro
      SkillClearance.astro
      CaseFiles.astro
      FieldLogs.astro
      AccessRequest.astro
      SectionFrame.astro
      TerminalTypewriter.astro
  data/
    profile.ts
    projects.ts
    posts.ts
    links.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    global.css
public/
  images/
    profile-photo.jpg
  resume.pdf
```

说明：

- `SectionFrame.astro` 用于统一 section 标题、边框、编号、水印等结构。
- `TerminalTypewriter.astro` 专门负责首屏终端文案的轻量展示。
- 页面仅保留一个 `index.astro`，博客不在此仓库内实现。
- `public/images/profile-photo.jpg` 是正式照片资源路径，后续直接替换为用户自己的证件照或职业半身照即可。
- `public/resume.pdf` 是简历下载入口目标。

## 16. GitHub Pages 部署要求

当前仓库的 GitHub Pages 工作流直接上传仓库根目录内容。重构后需调整为 Astro 构建产物部署。

部署要求如下：

- 使用 Astro 静态输出
- 构建产物目录为 `dist/`
- GitHub Actions 在构建后上传 `dist/`
- 保留 GitHub Pages 所需配置
- 兼容自定义域名文件 `CNAME`
- 兼容 `.nojekyll` 场景或由构建结果正确覆盖

## 17. 响应式与可用性要求

### 17.1 桌面端

- Hero 保持双栏布局
- 技能矩阵、项目档案卡、文章卡展示完整信息
- 氛围层细节完整保留

### 17.2 移动端

- Hero 改为纵向堆叠
- 所有内容保持可读，避免横向溢出
- 技能矩阵可压缩为更紧凑的列表形式
- CTA 入口需易于点击

### 17.3 无障碍与体验

- 保证文字和背景对比度
- 动效不应影响内容识别
- 打字机效果不能阻塞主信息出现
- 所有外链具有明确目标含义

## 18. 明确不做的内容

本次重构不包括以下内容：

- 后端 API
- 管理后台
- 真实监控面板
- Agent 功能
- 内嵌博客系统
- CMS
- 联系表单提交
- 动态数据抓取

## 19. 实现阶段约束

实现时应遵循以下约束：

- 尽量保持组件职责单一
- 尽量让静态数据驱动页面内容
- 不为未来不存在的需求添加兼容代码
- 在保证主题完成度的前提下，优先选择更小、更稳定的实现方案
- Tailwind 负责大部分样式，必要时在全局样式中补充扫描线、噪点、水印和少量动画

## 20. 实现后验证项

实现完成后，至少需要验证：

- Astro 项目能正常安装依赖并构建
- 本地预览页面结构正确
- GitHub Pages 工作流配置与构建产物路径一致
- 页面在移动端和桌面端布局正常
- 所有静态链接路径可访问，包括照片、简历、GitHub、Blog、Email

## 21. 最终结论

本次重构将把当前静态 `index.html` 页面升级为一个基于 Astro + Tailwind CSS 的单页在线简历站点，采用 `Personnel Dossier` 作为核心视觉方向，以 `CLASSIFIED PERSONNEL FILE` 为首屏主题，围绕 `Profile Summary`、`Skill Clearance`、`Case Files`、`Field Logs` 和 `Access Request` 建立完整的信息链路。

该设计优先保证三件事：

- 主题辨识度足够强
- 简历阅读效率足够高
- 后续维护成本足够低
