import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// ── Lucide-style inline SVG icons ─────────────────────────────────

function ServerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="6" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────

type FeatureLink = { label: string; to: string };
type Feature = {
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
  darkBgColor: string;
  title: string;
  description: string;
  primaryLink: FeatureLink;
  links: FeatureLink[];
};

const FEATURES: Feature[] = [
  {
    icon: <ServerIcon />,
    accentColor: '#1a56db',
    bgColor: '#eff6ff',
    darkBgColor: 'rgba(26,86,219,0.15)',
    title: 'Platform Overview',
    description: 'Architecture, core concepts, and how CMP fits into your cloud infrastructure.',
    primaryLink: { label: 'Start here →', to: '/overview/what-is-cmp' },
    links: [
      { label: 'What is CMP?', to: '/overview/what-is-cmp' },
      { label: 'Architecture Overview', to: '/overview/architecture-overview' },
      { label: 'Glossary & Terms', to: '/overview/glossary' },
    ],
  },
  {
    icon: <RocketIcon />,
    accentColor: '#7c3aed',
    bgColor: '#f5f3ff',
    darkBgColor: 'rgba(124,58,237,0.15)',
    title: 'CloudStack Setup',
    description: 'Connect CloudStack, configure zones, templates, and packages.',
    primaryLink: { label: 'Connect CloudStack →', to: '/orchestrators/cloudstack/connecting' },
    links: [
      { label: 'Connecting CMP', to: '/orchestrators/cloudstack/connecting' },
      { label: 'Zones', to: '/orchestrators/cloudstack/zones' },
      { label: 'Templates', to: '/orchestrators/cloudstack/templates/' },
    ],
  },
  {
    icon: <LayersIcon />,
    accentColor: '#059669',
    bgColor: '#ecfdf5',
    darkBgColor: 'rgba(5,150,105,0.15)',
    title: 'Orchestrators',
    description: 'Connect cloud backends — CloudStack, OpenStack, VMware, Proxmox and more.',
    primaryLink: { label: 'Connect backend →', to: '/orchestrators/cloudstack/' },
    links: [
      { label: 'Apache CloudStack', to: '/orchestrators/cloudstack/' },
      { label: 'OpenStack', to: '/orchestrators/openstack/' },
      { label: 'VMware vSphere', to: '/orchestrators/vmware/' },
    ],
  },
  {
    icon: <WrenchIcon />,
    accentColor: '#d97706',
    bgColor: '#fffbeb',
    darkBgColor: 'rgba(217,119,6,0.15)',
    title: 'Operations',
    description: 'Billing, quota management, authentication, and day-to-day administration.',
    primaryLink: { label: 'Explore ops →', to: '/billing/overview' },
    links: [
      { label: 'Billing & Invoicing', to: '/billing/overview' },
      { label: 'Quota Management', to: '/quota/global-quotas' },
      { label: 'Keycloak SSO & 2FA', to: '/auth/keycloak' },
    ],
  },
];

const ONBOARDING_STEPS = [
  {
    step: '01',
    title: 'Connect Orchestrator',
    description: 'Register your CloudStack (or other) backend and complete the provider setup wizard.',
    link: '/orchestrators/cloudstack/connecting',
    linkLabel: 'Connecting guide',
  },
  {
    step: '02',
    title: 'Configure Zones & Templates',
    description: 'Map datacenter zones and configure OS templates for customer provisioning.',
    link: '/orchestrators/cloudstack/zones',
    linkLabel: 'Zone configuration',
  },
  {
    step: '03',
    title: 'Create Packages & Pricing',
    description: 'Map CloudStack offerings to CMP packages and set billing rates.',
    link: '/orchestrators/cloudstack/offering-sync-and-packages/',
    linkLabel: 'Package setup',
  },
  {
    step: '04',
    title: 'Configure & Launch',
    description: 'Set up billing, quotas, and invite customers to the portal.',
    link: '/packages/overview',
    linkLabel: 'Configure platform',
  },
];

const DOC_CATEGORIES = [
  {
    icon: <GridIcon />,
    title: 'Zones & Regions',
    description: 'Create availability zones, manage cloud regions, and configure zone settings.',
    link: '/orchestrators/cloudstack/zones',
    color: '#1a56db',
  },
  {
    icon: <CreditCardIcon />,
    title: 'Packages & Billing',
    description: 'Define VM packages, configure pricing tiers, and manage billing models.',
    link: '/packages/overview',
    color: '#7c3aed',
  },
  {
    icon: <GridIcon />,
    title: 'Quota Management',
    description: 'Set global, account, and project-level resource quotas and enforce limits.',
    link: '/quota/global-quotas',
    color: '#059669',
  },
  {
    icon: <ShieldIcon />,
    title: 'Authentication & SSO',
    description: 'Configure Keycloak SSO, enforce 2FA, and manage administrative access.',
    link: '/auth/keycloak',
    color: '#d97706',
  },
  {
    icon: <HelpCircleIcon />,
    title: 'FAQ & Troubleshooting',
    description: 'Common questions, known issues, and step-by-step debugging procedures.',
    link: '/faq/general',
    color: '#dc2626',
  },
  {
    icon: <BookIcon />,
    title: 'All Orchestrators',
    description: 'Full reference for CloudStack, OpenStack, VMware, Proxmox, and OpenNebula.',
    link: '/orchestrators/cloudstack/',
    color: '#0891b2',
  },
];

const ORCHESTRATORS = [
  'Apache CloudStack',
  'OpenStack',
  'VMware vSphere',
  'Proxmox VE',
  'OpenNebula',
  'CEPH Storage',
  'PowerDNS',
];

// ── Page component ────────────────────────────────────────────────

export default function HomePage(): React.JSX.Element {
  return (
    <Layout
      title="StackConsole Documentation"
      description="Complete reference for deploying and operating the StackConsole Cloud Management Platform — from initial setup to production orchestration."
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>Cloud Management Platform</div>
          <h1 className={styles.heroTitle}>
            StackConsole
            <br />
            <span className={styles.heroAccent}>Documentation</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Complete reference for deploying, configuring, and operating the StackConsole
            Cloud Management Platform — from initial server setup to production-scale
            multi-cloud orchestration.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/orchestrators/cloudstack/connecting" className={styles.btnPrimary}>
              Get Started <ArrowRightIcon />
            </Link>
            <Link to="/overview/what-is-cmp" className={styles.btnOutline}>
              What is CMP?
            </Link>
          </div>
        </div>

        <div className={styles.platformsRow}>
          <span className={styles.platformsLabel}>Supports</span>
          <div className={styles.platformsList}>
            {ORCHESTRATORS.map((name) => (
              <span key={name} className={styles.platformChip}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Everything you need</h2>
            <p className={styles.sectionSub}>
              Start with what's most relevant to your role and environment.
            </p>
          </header>
          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div
                  className={styles.featureIconWrap}
                  style={
                    {
                      '--icon-color': f.accentColor,
                      '--icon-bg': f.bgColor,
                      '--icon-bg-dark': f.darkBgColor,
                    } as React.CSSProperties
                  }
                >
                  {f.icon}
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.description}</p>
                <ul className={styles.featureLinks}>
                  {f.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className={styles.featureLink}>
                        <ArrowRightIcon />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={f.primaryLink.to}
                  className={styles.featurePrimary}
                  style={{ color: f.accentColor }}
                >
                  {f.primaryLink.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Onboarding ───────────────────────────────── */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <div className={styles.sectionBadge}>Customer Onboarding</div>
            <h2 className={styles.sectionTitle}>Get up and running in 4 steps</h2>
            <p className={styles.sectionSub}>
              Follow this path to deploy CMP and onboard your first cloud customers.
            </p>
          </header>
          <div className={styles.stepsGrid}>
            {ONBOARDING_STEPS.map((s) => (
              <Link key={s.step} to={s.link} className={styles.stepCard}>
                <span className={styles.stepNum}>{s.step}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
                <span className={styles.stepCta}>{s.linkLabel} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documentation categories ──────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Explore documentation</h2>
            <p className={styles.sectionSub}>
              Deep-dive into specific areas of the CMP platform.
            </p>
          </header>
          <div className={styles.catGrid}>
            {DOC_CATEGORIES.map((c) => (
              <Link
                key={c.title}
                to={c.link}
                className={styles.catCard}
                style={{ '--cat-color': c.color } as React.CSSProperties}
              >
                <div className={styles.catIconWrap}>{c.icon}</div>
                <h3 className={styles.catTitle}>{c.title}</h3>
                <p className={styles.catDesc}>{c.description}</p>
                <span className={styles.catArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className={styles.ctaBand}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Ready to configure?</h2>
            <p className={styles.ctaSub}>
              Connect your CloudStack environment and configure zones, templates, and packages.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/orchestrators/cloudstack/connecting" className={styles.btnPrimary}>
                CloudStack Setup <ArrowRightIcon />
              </Link>
              <Link to="/faq/general" className={styles.btnOutlineLight}>
                FAQ & Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
