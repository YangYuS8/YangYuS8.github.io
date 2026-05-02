# Classified Personnel File 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将当前根目录静态 `index.html` 页面重构为基于 Astro + Tailwind CSS 的单页个人主页，采用 `CLASSIFIED PERSONNEL FILE` 主题，并支持 GitHub Pages 静态部署。

**架构：** 使用 Astro 作为静态站点框架，`src/data` 持有全部文案与链接数据，`src/components/dossier` 下的展示组件负责各 section 渲染。全局视觉通过 Tailwind 和少量 `global.css` 自定义样式实现扫描线、噪点、水印、终端打字机和档案卡风格，部署流程改为构建 `dist/` 后上传 GitHub Pages。

**技术栈：** Astro、Tailwind CSS、TypeScript、GitHub Actions、GitHub Pages

---

## 文件结构

### 将要删除或替换的现有文件

- 删除：`index.html`
  - 旧的单文件静态页面，不再作为最终站点入口。
- 修改：`.github/workflows/deploy.yml`
  - 从“上传仓库根目录”改为“安装依赖、构建 Astro、上传 `dist/`”。

### 将要创建的配置与入口文件

- 创建：`package.json`
  - 定义 Astro、Tailwind、脚本和基础元信息。
- 创建：`astro.config.mjs`
  - 配置静态输出、GitHub Pages 兼容选项与站点 URL。
- 创建：`tsconfig.json`
  - TypeScript 配置，供 Astro 项目使用。
- 创建：`tailwind.config.mjs`
  - Tailwind 扫描路径和主题扩展。
- 创建：`postcss.config.cjs`
  - Tailwind 的 PostCSS 配置。
- 创建：`src/env.d.ts`
  - Astro TypeScript 环境声明。
- 创建：`src/pages/index.astro`
  - 单页入口，按固定顺序拼装所有 section。
- 创建：`src/layouts/BaseLayout.astro`
  - 页面 HTML 骨架、SEO、背景层和全局资源引入。
- 创建：`src/styles/global.css`
  - 基础排版、主题变量、扫描线、噪点、水印、打字机动画等样式。

### 将要创建的数据文件

- 创建：`src/data/profile.ts`
  - Hero、Profile Summary、Education、照片路径、档案编号、状态字段。
- 创建：`src/data/projects.ts`
  - `Case Files` 项目数据。
- 创建：`src/data/posts.ts`
  - `Field Logs` 精选文章数据。
- 创建：`src/data/links.ts`
  - GitHub、Blog、Email、Resume 等统一链接数据。

### 将要创建的组件文件

- 创建：`src/components/dossier/SectionFrame.astro`
  - 统一 section 标题、编号、辅助标签、边框容器。
- 创建：`src/components/dossier/TerminalTypewriter.astro`
  - Hero 终端打字效果展示。
- 创建：`src/components/dossier/Hero.astro`
  - 首屏双栏档案布局。
- 创建：`src/components/dossier/ProfileSummary.astro`
  - Summary 与 Education 卡片。
- 创建：`src/components/dossier/SkillClearance.astro`
  - `Operational Confidence` 矩阵。
- 创建：`src/components/dossier/CaseFiles.astro`
  - 三个项目档案卡。
- 创建：`src/components/dossier/FieldLogs.astro`
  - 精选文章卡与博客入口。
- 创建：`src/components/dossier/AccessRequest.astro`
  - GitHub、Blog、Email、Resume 入口区。

### 将要创建的静态资源文件

- 创建：`public/images/profile-photo.jpg`
  - 正式照片默认占位资源，后续可由用户自行替换。
- 创建：`public/resume.pdf`
  - 简历 PDF 默认文件，先放占位内容以保证链接有效。
- 视情况创建：`public/favicon.svg`
  - 站点图标，保持主题一致性。

## 任务 1：建立 Astro + Tailwind 项目骨架

**文件：**
- 创建：`package.json`
- 创建：`astro.config.mjs`
- 创建：`tsconfig.json`
- 创建：`tailwind.config.mjs`
- 创建：`postcss.config.cjs`
- 创建：`src/env.d.ts`

- [ ] **步骤 1：编写项目配置文件**

```json
{
  "name": "yangyus8-github-io",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.7.0"
  },
  "devDependencies": {
    "@astrojs/tailwind": "^6.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3"
  }
}
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://yangyus8.top',
  output: 'static',
  integrations: [tailwind()],
});
```

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dossier: {
          bg: '#050816',
          panel: '#0d1324',
          line: '#23304b',
          text: '#e8eef9',
          muted: '#8ea0bc',
          green: '#67ff9c',
          red: '#ff5c73'
        }
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
```

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

```ts
/// <reference types="astro/client" />
```

- [ ] **步骤 2：安装依赖验证骨架可用**

运行：`npm install`
预期：安装成功，生成 `package-lock.json`，无依赖解析错误。

- [ ] **步骤 3：运行 Astro 构建验证配置通过**

运行：`npm run build`
预期：构建流程启动；此时即使因为页面文件未创建而失败，也不应再出现“缺少 Astro 配置或依赖”的错误。

- [ ] **步骤 4：Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json tailwind.config.mjs postcss.config.cjs src/env.d.ts
git commit -m "chore: bootstrap Astro and Tailwind project"
```

## 任务 2：创建静态数据层

**文件：**
- 创建：`src/data/profile.ts`
- 创建：`src/data/projects.ts`
- 创建：`src/data/posts.ts`
- 创建：`src/data/links.ts`

- [ ] **步骤 1：定义 `profile.ts` 数据结构与内容**

```ts
export const profile = {
  fileLabel: 'CLASSIFIED DOSSIER / CASE FILE',
  title: 'CLASSIFIED PERSONNEL FILE',
  subject: 'YangYuS8',
  role: 'DevOps / Infrastructure / Full-stack Builder',
  focus: 'Linux · Docker · Kubernetes · Automation · Homelab',
  status: 'Seeking Internship / Entry-level Opportunities',
  fileNumber: 'YYS8-INT-2026',
  clearance: 'Candidate',
  location: 'China',
  track: 'DevOps / Infra',
  access: 'LIMITED RELEASE',
  verification: 'VERIFIED',
  photo: '/images/profile-photo.jpg',
  typewriterLines: [
    'decrypting profile...',
    'loading field records...',
    'verifying project evidence...',
    'access granted'
  ],
  summary:
    'DevOps-focused builder interested in infrastructure, Linux operations, containerized delivery, k3s, CI/CD automation, and practical full-stack execution.',
  education: {
    institution: 'University of Science and Technology Liaoning',
    major: 'Network Engineering',
    expectedGraduation: '2027',
    academicFocus: 'Operating Systems / Computer Networks / Infrastructure Practice'
  }
} as const;
```

- [ ] **步骤 2：定义 `projects.ts` 项目档案数据**

```ts
export const projects = [
  {
    id: 'CF-01',
    name: 'OpsPulse',
    objective: 'Terminal-first homelab heartbeat console.',
    stack: ['Go Agent', 'Go Server', 'SQLite', 'SSE', 'SvelteKit', 'Caddy'],
    status: 'ACTIVE BUILD',
    href: 'https://github.com/YangYuS8'
  },
  {
    id: 'CF-02',
    name: 'LWE',
    objective: 'Linux wallpaper engine.',
    stack: ['Rust', 'Tauri', 'Svelte', 'AppImage'],
    status: 'FIELD READY',
    href: 'https://github.com/YangYuS8'
  },
  {
    id: 'CF-03',
    name: 'CodeJudge',
    objective: 'Online judge system.',
    stack: ['Django', 'Vue', 'REST API', 'Monaco Editor'],
    status: 'ARCHIVED CASE',
    href: 'https://github.com/YangYuS8'
  }
] as const;
```

- [ ] **步骤 3：定义 `posts.ts` 与 `links.ts`**

```ts
export const posts = [
  {
    id: 'LOG-01',
    title: 'Running k3s in a constrained homelab',
    excerpt: 'Notes on keeping a small Kubernetes setup predictable and observable.',
    date: '2026-04-20',
    tags: ['k3s', 'homelab', 'ops'],
    href: 'https://blog.yangyus8.top'
  },
  {
    id: 'LOG-02',
    title: 'Shipping side projects with Docker Compose',
    excerpt: 'A practical deployment baseline for small services and internal tooling.',
    date: '2026-03-12',
    tags: ['docker', 'compose', 'deployment'],
    href: 'https://blog.yangyus8.top'
  },
  {
    id: 'LOG-03',
    title: 'Debugging service failures under pressure',
    excerpt: 'A troubleshooting routine for narrowing faults in Linux-based stacks.',
    date: '2026-02-08',
    tags: ['linux', 'debugging', 'troubleshooting'],
    href: 'https://blog.yangyus8.top'
  }
] as const;
```

```ts
export const links = {
  github: 'https://github.com/YangYuS8',
  blog: 'https://blog.yangyus8.top',
  email: 'mailto:your-email@example.com',
  resume: '/resume.pdf'
} as const;
```

- [ ] **步骤 4：运行 TypeScript 检查数据文件可被 Astro 解析**

运行：`npm run build`
预期：构建失败原因如果存在，应转移到“缺少页面/组件文件”，而不是数据文件语法错误。

- [ ] **步骤 5：Commit**

```bash
git add src/data/profile.ts src/data/projects.ts src/data/posts.ts src/data/links.ts
git commit -m "feat: add static dossier content data"
```

## 任务 3：实现基础布局与全局视觉层

**文件：**
- 创建：`src/layouts/BaseLayout.astro`
- 创建：`src/styles/global.css`
- 依赖：`src/data/profile.ts`

- [ ] **步骤 1：实现 `BaseLayout.astro` 页面骨架**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href="https://yangyus8.top/" />
  </head>
  <body class="bg-dossier-bg text-dossier-text antialiased">
    <div class="site-shell">
      <div class="noise-layer"></div>
      <div class="scanline-layer"></div>
      <div class="classified-watermark">CLASSIFIED</div>
      <slot />
    </div>
  </body>
</html>
```

- [ ] **步骤 2：实现 `global.css` 的主题样式**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  @apply min-h-screen bg-dossier-bg text-dossier-text font-sans;
  background-image: radial-gradient(circle at top, rgba(103, 255, 156, 0.08), transparent 32%);
}

.site-shell {
  position: relative;
  isolation: isolate;
  overflow: clip;
}

.noise-layer,
.scanline-layer,
.classified-watermark {
  pointer-events: none;
  position: fixed;
  inset: 0;
}

.scanline-layer {
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.035),
    rgba(255, 255, 255, 0.035) 1px,
    transparent 1px,
    transparent 4px
  );
  opacity: 0.12;
}

.classified-watermark {
  display: grid;
  place-items: center;
  font-size: clamp(4rem, 10vw, 10rem);
  letter-spacing: 0.4em;
  color: rgba(255, 92, 115, 0.04);
  font-weight: 800;
}

.panel-frame {
  @apply border border-dossier-line bg-white/5 backdrop-blur-sm;
  box-shadow: 0 0 0 1px rgba(103, 255, 156, 0.05), 0 24px 80px rgba(0, 0, 0, 0.4);
}

.terminal-caret {
  display: inline-block;
  width: 0.6ch;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
```

- [ ] **步骤 3：创建一个最小页面使用布局验证样式生效**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Test" description="Test">
  <main class="mx-auto max-w-6xl px-6 py-12">
    <section class="panel-frame rounded-3xl p-8">
      <h1 class="font-mono text-3xl text-dossier-green">CLASSIFIED PERSONNEL FILE</h1>
    </section>
  </main>
</BaseLayout>
```

- [ ] **步骤 4：运行构建确认全局层可用**

运行：`npm run build`
预期：构建成功，`dist/index.html` 生成，样式资源被正确打包。

- [ ] **步骤 5：Commit**

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css src/pages/index.astro
git commit -m "feat: add base dossier layout and theme styles"
```

## 任务 4：实现共享容器与 Hero 首屏

**文件：**
- 创建：`src/components/dossier/SectionFrame.astro`
- 创建：`src/components/dossier/TerminalTypewriter.astro`
- 创建：`src/components/dossier/Hero.astro`
- 修改：`src/pages/index.astro`

- [ ] **步骤 1：实现 `SectionFrame.astro`**

```astro
---
interface Props {
  eyebrow: string;
  title: string;
  id?: string;
}

const { eyebrow, title, id } = Astro.props;
---

<section id={id} class="mx-auto max-w-6xl px-6 py-8">
  <div class="mb-5 flex items-end justify-between gap-4">
    <div>
      <p class="font-mono text-xs uppercase tracking-[0.35em] text-dossier-green/80">{eyebrow}</p>
      <h2 class="mt-2 text-2xl font-semibold tracking-[0.08em] text-dossier-text">{title}</h2>
    </div>
  </div>
  <slot />
</section>
```

- [ ] **步骤 2：实现 `TerminalTypewriter.astro`**

```astro
---
interface Props {
  lines: readonly string[];
}

const { lines } = Astro.props;
---

<div class="panel-frame rounded-2xl p-4 font-mono text-sm text-dossier-green">
  {lines.map((line) => (
    <div class="flex gap-3">
      <span class="text-dossier-green/60">&gt;</span>
      <span>{line}</span>
    </div>
  ))}
  <span class="terminal-caret text-dossier-green">_</span>
</div>
```

- [ ] **步骤 3：实现 `Hero.astro`**

```astro
---
import { links } from '../../data/links';
import { profile } from '../../data/profile';
import TerminalTypewriter from './TerminalTypewriter.astro';
---

<section class="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[1.25fr_0.75fr] lg:py-20">
  <div class="panel-frame rounded-[2rem] p-8 lg:p-10">
    <p class="font-mono text-xs uppercase tracking-[0.35em] text-dossier-green/80">{profile.fileLabel}</p>
    <h1 class="mt-4 text-4xl font-semibold tracking-[0.08em] text-dossier-text sm:text-5xl">{profile.title}</h1>
    <dl class="mt-6 space-y-3 text-sm sm:text-base">
      <div><dt class="font-mono text-dossier-muted">Subject</dt><dd>{profile.subject}</dd></div>
      <div><dt class="font-mono text-dossier-muted">Role</dt><dd>{profile.role}</dd></div>
      <div><dt class="font-mono text-dossier-muted">Focus</dt><dd>{profile.focus}</dd></div>
      <div><dt class="font-mono text-dossier-muted">Status</dt><dd class="text-dossier-green">{profile.status}</dd></div>
    </dl>
    <div class="mt-6">
      <TerminalTypewriter lines={profile.typewriterLines} />
    </div>
    <div class="mt-6 flex flex-wrap gap-3">
      <a href="#case-files" class="rounded-full border border-dossier-green/50 px-5 py-3 font-mono text-sm text-dossier-green">Open Case Files</a>
      <a href="#field-logs" class="rounded-full border border-dossier-line px-5 py-3 font-mono text-sm text-dossier-text">View Field Logs</a>
      <a href={links.resume} class="rounded-full bg-dossier-red px-5 py-3 font-mono text-sm font-semibold text-white">Download Resume</a>
    </div>
  </div>

  <aside class="panel-frame rounded-[2rem] p-6">
    <img src={profile.photo} alt="Profile portrait" class="aspect-[4/5] w-full rounded-2xl border border-dossier-line object-cover" />
    <div class="mt-5 space-y-3 text-sm">
      <p class="font-mono text-xs uppercase tracking-[0.28em] text-dossier-red/80">Formal ID Record</p>
      <p><span class="text-dossier-muted">Clearance:</span> {profile.clearance}</p>
      <p><span class="text-dossier-muted">Location:</span> {profile.location}</p>
      <p><span class="text-dossier-muted">Track:</span> {profile.track}</p>
      <div class="mt-4 rounded-2xl border border-dossier-line p-4 font-mono text-xs text-dossier-muted">
        <p>FILE NO. {profile.fileNumber}</p>
        <p class="mt-2 text-dossier-green">STATUS: {profile.verification}</p>
        <p class="mt-2 text-dossier-red">ACCESS: {profile.access}</p>
      </div>
    </div>
  </aside>
</section>
```

- [ ] **步骤 4：更新入口页挂载 Hero**

```astro
---
import Hero from '../components/dossier/Hero.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="YangYuS8 | Classified Personnel File" description="DevOps / Infrastructure / Full-stack Builder">
  <main>
    <Hero />
  </main>
</BaseLayout>
```

- [ ] **步骤 5：运行构建并检查首屏静态渲染**

运行：`npm run build`
预期：构建成功，首屏 HTML 中可见 `CLASSIFIED PERSONNEL FILE`、Hero 字段和 3 个 CTA 文案。

- [ ] **步骤 6：Commit**

```bash
git add src/components/dossier/SectionFrame.astro src/components/dossier/TerminalTypewriter.astro src/components/dossier/Hero.astro src/pages/index.astro
git commit -m "feat: implement dossier hero section"
```

## 任务 5：实现 Profile Summary 与 Skill Clearance

**文件：**
- 创建：`src/components/dossier/ProfileSummary.astro`
- 创建：`src/components/dossier/SkillClearance.astro`
- 修改：`src/data/profile.ts`
- 修改：`src/pages/index.astro`

- [ ] **步骤 1：为 `profile.ts` 增加技能矩阵数据**

```ts
export const skillMatrix = [
  { name: 'Linux Systems', level: 5, label: 'Operational Confidence' },
  { name: 'Docker / Compose', level: 5, label: 'Operational Confidence' },
  { name: 'Nginx / Caddy', level: 4, label: 'Operational Confidence' },
  { name: 'GitHub Actions', level: 4, label: 'Operational Confidence' },
  { name: 'Kubernetes / k3s', level: 4, label: 'Operational Confidence' },
  { name: 'Monitoring / Observability', level: 3, label: 'Operational Confidence' },
  { name: 'Troubleshooting', level: 5, label: 'Operational Confidence' },
  { name: 'Full-stack Development', level: 4, label: 'Operational Confidence' }
] as const;
```

- [ ] **步骤 2：实现 `ProfileSummary.astro`**

```astro
---
import { profile } from '../../data/profile';
import SectionFrame from './SectionFrame.astro';
---

<SectionFrame id="profile-summary" eyebrow="EXECUTIVE BRIEF" title="PROFILE SUMMARY">
  <div class="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
    <article class="panel-frame rounded-[1.75rem] p-6 lg:p-8">
      <p class="max-w-3xl text-base leading-8 text-dossier-text/90">{profile.summary}</p>
    </article>
    <aside class="panel-frame rounded-[1.75rem] p-6 font-mono text-sm">
      <p class="text-xs uppercase tracking-[0.28em] text-dossier-green/80">Background / Education</p>
      <div class="mt-5 space-y-3 text-dossier-text">
        <p><span class="text-dossier-muted">Institution:</span> {profile.education.institution}</p>
        <p><span class="text-dossier-muted">Major:</span> {profile.education.major}</p>
        <p><span class="text-dossier-muted">Expected Graduation:</span> {profile.education.expectedGraduation}</p>
        <p><span class="text-dossier-muted">Academic Focus:</span> {profile.education.academicFocus}</p>
      </div>
    </aside>
  </div>
</SectionFrame>
```

- [ ] **步骤 3：实现 `SkillClearance.astro`**

```astro
---
import { skillMatrix } from '../../data/profile';
import SectionFrame from './SectionFrame.astro';
---

<SectionFrame id="skill-clearance" eyebrow="SYSTEM READINESS" title="SKILL CLEARANCE">
  <div class="panel-frame rounded-[1.75rem] p-6 lg:p-8">
    <div class="space-y-4">
      {skillMatrix.map((skill) => (
        <div class="grid gap-3 border-b border-dossier-line/70 pb-4 last:border-b-0 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="font-mono text-sm uppercase tracking-[0.2em] text-dossier-text">{skill.name}</p>
            <p class="mt-1 text-xs text-dossier-muted">{skill.label}</p>
          </div>
          <div class="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span class={index < skill.level ? 'h-3 w-8 rounded-full bg-dossier-green' : 'h-3 w-8 rounded-full bg-dossier-line'}></span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</SectionFrame>
```

- [ ] **步骤 4：更新 `index.astro` 拼装中段内容**

```astro
---
import Hero from '../components/dossier/Hero.astro';
import ProfileSummary from '../components/dossier/ProfileSummary.astro';
import SkillClearance from '../components/dossier/SkillClearance.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="YangYuS8 | Classified Personnel File" description="DevOps / Infrastructure / Full-stack Builder">
  <main>
    <Hero />
    <ProfileSummary />
    <SkillClearance />
  </main>
</BaseLayout>
```

- [ ] **步骤 5：运行构建验证中段区块内容完整**

运行：`npm run build`
预期：构建成功，HTML 中可见 `PROFILE SUMMARY`、`SKILL CLEARANCE`、`Operational Confidence` 和 8 条技能项。

- [ ] **步骤 6：Commit**

```bash
git add src/data/profile.ts src/components/dossier/ProfileSummary.astro src/components/dossier/SkillClearance.astro src/pages/index.astro
git commit -m "feat: add summary and skill clearance sections"
```

## 任务 6：实现 Case Files、Field Logs、Access Request

**文件：**
- 创建：`src/components/dossier/CaseFiles.astro`
- 创建：`src/components/dossier/FieldLogs.astro`
- 创建：`src/components/dossier/AccessRequest.astro`
- 修改：`src/pages/index.astro`

- [ ] **步骤 1：实现 `CaseFiles.astro`**

```astro
---
import { projects } from '../../data/projects';
import SectionFrame from './SectionFrame.astro';
---

<SectionFrame id="case-files" eyebrow="PROJECT EVIDENCE" title="CASE FILES">
  <div class="grid gap-5 lg:grid-cols-3">
    {projects.map((project) => (
      <article class="panel-frame rounded-[1.75rem] p-6">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-dossier-red/80">{project.id}</p>
        <h3 class="mt-4 text-2xl font-semibold text-dossier-text">{project.name}</h3>
        <p class="mt-3 text-sm leading-7 text-dossier-text/85">{project.objective}</p>
        <p class="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-dossier-green">Status: {project.status}</p>
        <ul class="mt-5 flex flex-wrap gap-2 text-xs text-dossier-muted">
          {project.stack.map((item) => <li class="rounded-full border border-dossier-line px-3 py-1">{item}</li>)}
        </ul>
        <a href={project.href} class="mt-6 inline-flex rounded-full border border-dossier-green/40 px-4 py-2 font-mono text-sm text-dossier-green">Open Evidence</a>
      </article>
    ))}
  </div>
</SectionFrame>
```

- [ ] **步骤 2：实现 `FieldLogs.astro`**

```astro
---
import { links } from '../../data/links';
import { posts } from '../../data/posts';
import SectionFrame from './SectionFrame.astro';
---

<SectionFrame id="field-logs" eyebrow="TECHNICAL RECORDS" title="FIELD LOGS">
  <div class="grid gap-5 lg:grid-cols-[1fr_1fr_1fr_auto]">
    {posts.map((post) => (
      <article class="panel-frame rounded-[1.75rem] p-6">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-dossier-green/80">{post.id}</p>
        <h3 class="mt-4 text-xl font-semibold">{post.title}</h3>
        <p class="mt-3 text-sm leading-7 text-dossier-text/85">{post.excerpt}</p>
        <p class="mt-4 font-mono text-xs text-dossier-muted">{post.date}</p>
        <ul class="mt-4 flex flex-wrap gap-2 text-xs text-dossier-muted">
          {post.tags.map((tag) => <li class="rounded-full border border-dossier-line px-3 py-1">{tag}</li>)}
        </ul>
      </article>
    ))}
    <a href={links.blog} class="panel-frame flex min-h-[220px] items-center justify-center rounded-[1.75rem] p-6 text-center font-mono text-sm uppercase tracking-[0.24em] text-dossier-green">
      Open Full Log Archive
    </a>
  </div>
</SectionFrame>
```

- [ ] **步骤 3：实现 `AccessRequest.astro`**

```astro
---
import { links } from '../../data/links';
import SectionFrame from './SectionFrame.astro';

const entries = [
  { label: 'GitHub', hint: 'source code archive', href: links.github },
  { label: 'Blog', hint: 'technical log archive', href: links.blog },
  { label: 'Email', hint: 'direct contact channel', href: links.email },
  { label: 'Resume', hint: 'static PDF dossier', href: links.resume }
];
---

<SectionFrame id="access-request" eyebrow="AUTHORIZED CHANNELS" title="ACCESS REQUEST">
  <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    {entries.map((entry) => (
      <a href={entry.href} class="panel-frame rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:border-dossier-green/50">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-dossier-red/80">Authorized Link</p>
        <h3 class="mt-4 text-xl font-semibold text-dossier-text">{entry.label}</h3>
        <p class="mt-3 text-sm text-dossier-muted">{entry.hint}</p>
      </a>
    ))}
  </div>
</SectionFrame>
```

- [ ] **步骤 4：更新 `index.astro` 挂载剩余区块**

```astro
---
import AccessRequest from '../components/dossier/AccessRequest.astro';
import CaseFiles from '../components/dossier/CaseFiles.astro';
import FieldLogs from '../components/dossier/FieldLogs.astro';
import Hero from '../components/dossier/Hero.astro';
import ProfileSummary from '../components/dossier/ProfileSummary.astro';
import SkillClearance from '../components/dossier/SkillClearance.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="YangYuS8 | Classified Personnel File" description="DevOps / Infrastructure / Full-stack Builder">
  <main>
    <Hero />
    <ProfileSummary />
    <SkillClearance />
    <CaseFiles />
    <FieldLogs />
    <AccessRequest />
  </main>
</BaseLayout>
```

- [ ] **步骤 5：运行构建确认完整页面可生成**

运行：`npm run build`
预期：构建成功，输出页面包含 `CASE FILES`、`FIELD LOGS`、`ACCESS REQUEST` 三个 section 标题。

- [ ] **步骤 6：Commit**

```bash
git add src/components/dossier/CaseFiles.astro src/components/dossier/FieldLogs.astro src/components/dossier/AccessRequest.astro src/pages/index.astro
git commit -m "feat: add projects logs and access sections"
```

## 任务 7：补齐主题细节、静态资源和交互润色

**文件：**
- 修改：`src/styles/global.css`
- 创建：`public/images/profile-photo.jpg`
- 创建：`public/resume.pdf`
- 视情况创建：`public/favicon.svg`

- [ ] **步骤 1：补充细节样式，强化档案系统质感**

```css
.panel-frame {
  position: relative;
}

.panel-frame::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(103, 255, 156, 0.06);
  border-radius: inherit;
  pointer-events: none;
}

a {
  transition: color 160ms ease, border-color 160ms ease, transform 160ms ease;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **步骤 2：添加可用的默认静态资源**

```text
public/images/profile-photo.jpg   # 放入一张合法的默认职业照占位图
public/resume.pdf                 # 放入一个最小可访问 PDF 文件
public/favicon.svg                # 可选，使用简单文件编号图形
```

- [ ] **步骤 3：运行构建确认静态资源路径生效**

运行：`npm run build`
预期：构建成功，`dist/images/profile-photo.jpg` 和 `dist/resume.pdf` 存在。

- [ ] **步骤 4：本地预览并人工检查页面**

运行：`npm run preview`
预期：页面可在本地预览，验证以下事项：

- Hero 双栏在桌面端正常显示
- 移动端下内容纵向堆叠
- 照片、简历和外链路径正确
- 氛围层不妨碍阅读

- [ ] **步骤 5：Commit**

```bash
git add src/styles/global.css public/images/profile-photo.jpg public/resume.pdf public/favicon.svg
git commit -m "feat: polish dossier visuals and static assets"
```

## 任务 8：更新 GitHub Pages 部署流程并清理旧入口

**文件：**
- 修改：`.github/workflows/deploy.yml`
- 删除：`index.html`
- 视情况保留：`CNAME`
- 视情况保留：`.nojekyll`

- [ ] **步骤 1：删除旧根目录 `index.html`**

```text
删除文件：index.html
```

- [ ] **步骤 2：改写 GitHub Pages 工作流**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Preserve CNAME
        run: cp CNAME dist/CNAME

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **步骤 3：运行本地构建，验证部署输入目录正确**

运行：`npm run build`
预期：`dist/` 目录生成，可作为 GitHub Pages artifact 上传目录。

- [ ] **步骤 4：检查 `.nojekyll` 是否仍需要保留**

运行：`ls dist`
预期：若 Astro 构建输出中无需要额外保留 `.nojekyll` 的场景，可不再依赖仓库根目录 `.nojekyll`；如保留更稳妥，则在工作流中一并复制到 `dist/.nojekyll`。

- [ ] **步骤 5：Commit**

```bash
git add .github/workflows/deploy.yml index.html CNAME .nojekyll
git commit -m "chore: update GitHub Pages deployment for Astro build"
```

## 任务 9：最终验证

**文件：**
- 验证：整个仓库

- [ ] **步骤 1：安装依赖并执行完整构建**

运行：`npm install && npm run build`
预期：构建通过，无 Astro、Tailwind、TypeScript 配置错误。

- [ ] **步骤 2：核查构建产物中的关键文件**

运行：`ls dist && ls dist/images`
预期：至少存在 `dist/index.html`、样式资源、`dist/CNAME`、`dist/resume.pdf`、`dist/images/profile-photo.jpg`。

- [ ] **步骤 3：人工核查内容覆盖规格要求**

核查清单：

- `Hero / Access Header` 已实现
- `Profile Summary` 已实现
- `Skill Clearance` 已实现
- `Case Files` 已实现 3 个项目
- `Field Logs` 已实现精选文章和博客入口
- `Access Request` 已实现 4 个固定入口
- 所有数据均位于 `src/data/*.ts`

- [ ] **步骤 4：检查移动端与桌面端阅读体验**

运行：`npm run preview`
预期：人工检查桌面端和窄屏布局，确认可读性、按钮点击区域和区块顺序符合规格。

- [ ] **步骤 5：Commit**

```bash
git add .
git commit -m "chore: verify final classified portfolio build"
```

## 自检结果

### 规格覆盖度

已覆盖的规格需求与对应任务：

- Astro + Tailwind 静态化重构：任务 1
- 数据放入 `src/data`：任务 2
- 首屏档案布局、打字机、照片位：任务 4
- `Profile Summary` 与教育信息：任务 5
- `Skill Clearance` 矩阵：任务 5
- 3 个 `Case Files` 项目：任务 6
- `Field Logs` 精选文章与博客入口：任务 6
- `Access Request` 联系和简历入口：任务 6
- 扫描线、噪点、水印、轻动效：任务 3、任务 7
- GitHub Pages 部署到 `dist/`：任务 8
- 最终构建与人工验证：任务 9

未发现缺失的规格章节。

### 占位符扫描

已检查计划中是否存在以下问题：

- `TODO`
- `待定`
- “后续实现”
- 未指明文件路径的模糊步骤
- 未给出命令的验证步骤

处理结果：

- 未保留 `TODO`、`待定` 等占位措辞。
- 所有任务均给出了明确文件路径。
- 所有验证步骤均给出了可执行命令。
- 唯一需要实现时补充的具体内容是默认照片和默认 PDF 的实际二进制文件，但路径和职责已明确，不影响实现边界。

### 类型与命名一致性

已统一以下命名：

- 页面标题：`CLASSIFIED PERSONNEL FILE`
- 技能区语义：`Operational Confidence`
- 项目区：`Case Files`
- 博客区：`Field Logs`
- 联系区：`Access Request`
- 数据目录：`src/data`

计划中的组件、数据键名和 section 名称保持一致，未发现前后引用不一致的问题。

计划已完成并保存到 `docs/superpowers/plans/2026-05-03-classified-personnel-file-implementation.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
