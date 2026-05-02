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

export type Project = (typeof projects)[number];
