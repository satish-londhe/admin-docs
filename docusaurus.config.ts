import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CMP Admin Docs',
  tagline: 'Cloud Management Platform Administrator Guide',
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
    colorMode: {
      respectPrefersColorScheme: true,
    },
    algolia: {
      appId: process.env.ALGOLIA_APP_ID ?? 'YOUR_APP_ID',
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY ?? 'YOUR_SEARCH_API_KEY',
      indexName: process.env.ALGOLIA_INDEX_NAME ?? 'cmp-admin-docs',
      contextualSearch: true,
      searchPagePath: 'search',
    },
    navbar: {
      title: 'CMP Admin Docs',
      logo: {
        alt: 'CMP Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'adminSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'search',
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
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Overview', to: '/overview/what-is-cmp'},
            {label: 'Installation', to: '/installation/prerequisites'},
            {label: 'CloudStack', to: '/orchestrators/cloudstack/'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/satish-londhe/admin-docs',
            },
            {
              label: 'StackConsole',
              href: 'https://stackconsole.io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} StackConsole. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
