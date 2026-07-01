import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'StackConsole Docs',
  tagline: 'CMP Administrator Guide',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.stackconsole.io',
  baseUrl: '/',

  organizationName: 'satish-londhe',
  projectName: 'admin-docs',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    announcementBar: {
      id: 'docs_v1',
      content: '📘 CMP Admin Docs are now live — <a href="/overview/what-is-cmp">Start with the Overview →</a>',
      isCloseable: true,
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    algolia: {
      appId: '296NWKX1XL',
      apiKey: '61b3d104decfcd1715ffaa8dd94f2dd0',
      indexName: 'CMP Admin Doc',
      contextualSearch: true,
      searchPagePath: 'search',
    },

    navbar: {
      logo: {
        alt: 'StackConsole',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        width: 115,
        height: 33,
      },
      title: '',
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'adminSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://stackconsole.io',
          label: 'stackconsole.io',
          position: 'right',
        },
        {
          href: 'https://github.com/satish-londhe/admin-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      logo: {
        alt: 'StackConsole',
        src: 'img/logo-dark.svg',
        width: 120,
        height: 35,
        href: 'https://stackconsole.io',
      },
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'What is CMP?',          to: '/overview/what-is-cmp'},
            {label: 'Architecture Overview', to: '/overview/architecture-overview'},
            {label: 'Glossary',              to: '/overview/glossary'},
          ],
        },
        {
          title: 'Infrastructure',
          items: [
            {label: 'Apache CloudStack', to: '/orchestrators/cloudstack/'},
            {label: 'OpenStack',         to: '/orchestrators/openstack/'},
            {label: 'VMware vSphere',    to: '/orchestrators/vmware/'},
            {label: 'Proxmox VE',        to: '/orchestrators/proxmox/'},
            {label: 'OpenNebula',        to: '/orchestrators/opennebula/'},
          ],
        },
        {
          title: 'Operations',
          items: [
            {label: 'Packages & Pricing', to: '/packages/overview'},
            {label: 'Billing & Invoicing', to: '/billing/overview'},
            {label: 'Quota Management',   to: '/quota/global-quotas'},
            {label: 'Auth & SSO',         to: '/auth/keycloak'},
            {label: 'FAQ',                to: '/faq/general'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'StackConsole',        href: 'https://stackconsole.io'},
            {label: 'GitHub',              href: 'https://github.com/satish-londhe/admin-docs'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} StackConsole. All rights reserved.`,
    },

    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'nginx', 'sql', 'ini', 'yaml', 'php'],
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
