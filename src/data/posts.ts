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

export type Post = (typeof posts)[number];
