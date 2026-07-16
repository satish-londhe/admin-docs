import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'StackConsole Docs',
  tagline: 'CMP Administrator Guide',
  favicon: 'img/favicon.png',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/apple-touch-icon.png',
      },
    },
  ],

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

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarPosition: 'right',
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    announcementBar: {
      id: 'docs_ai_review_2026',
      content:
        '⚠️ Documentation preview — This site is AI-assisted and under active review. We update sections regularly. If anything does not match the product, please confirm with the <a target="_blank" rel="noopener noreferrer" href="https://stackconsole.io">StackConsole</a> team.',
      isCloseable: false,
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
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
          href: 'https://stackconsole.io',
          label: 'stackconsole.io',
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
            {label: 'Rate Cards', to: '/rate-cards/'},
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
