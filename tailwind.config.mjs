export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dossier: {
          ink: 'var(--dossier-ink)',
          inkSoft: 'var(--dossier-ink-soft)',
          panel: 'var(--dossier-panel)',
          paper: 'var(--dossier-paper)',
          muted: 'var(--dossier-paper-dim)',
          accent: 'var(--dossier-accent)',
          line: 'var(--dossier-panel-edge)',
          alert: 'var(--dossier-alert)'
        }
      },
      boxShadow: {
        dossier: 'var(--dossier-shadow)'
      }
    }
  },
  plugins: []
};
