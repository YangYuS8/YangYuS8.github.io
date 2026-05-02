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
  photo: '/images/profile-photo.svg',
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
  },
  skillMatrix: [
    {
      domain: 'Linux Systems',
      confidence: 'Operational Confidence',
      score: 5,
      evidence: 'Daily Linux workflow, shell automation, server administration, and homelab upkeep.'
    },
    {
      domain: 'Docker / Compose',
      confidence: 'Operational Confidence',
      score: 5,
      evidence: 'Dockerized services, image workflows, and practical deployment pipelines across personal projects.'
    },
    {
      domain: 'Nginx / Caddy',
      confidence: 'Operational Confidence',
      score: 4,
      evidence: 'Reverse proxy setup, site routing, HTTPS exposure, and service publishing in practical deployments.'
    },
    {
      domain: 'GitHub Actions',
      confidence: 'Operational Confidence',
      score: 4,
      evidence: 'Build and release automation, repeatable scripts, and infrastructure-oriented workflow tooling.'
    },
    {
      domain: 'Kubernetes / k3s',
      confidence: 'Operational Confidence',
      score: 4,
      evidence: 'Hands-on cluster practice with k3s, service exposure, workload iteration, and platform experimentation.'
    },
    {
      domain: 'Monitoring / Observability',
      confidence: 'Operational Confidence',
      score: 3,
      evidence: 'Growing practical exposure to service visibility, runtime inspection, and stability-focused iteration.'
    },
    {
      domain: 'Troubleshooting',
      confidence: 'Operational Confidence',
      score: 5,
      evidence: 'Comfortable isolating runtime issues across Linux, networking, container, and deployment layers.'
    },
    {
      domain: 'Full-stack Development',
      confidence: 'Operational Confidence',
      score: 4,
      evidence: 'Capable of shipping end-to-end features that support infrastructure goals and product validation.'
    }
  ]
} as const;

export type Profile = typeof profile;
