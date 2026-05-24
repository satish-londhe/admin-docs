// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CMP Admin Documentation',
  tagline: 'Complete administrator guide for the Cloud Management Platform',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.stackconsole.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config — update if deploying to GitHub Pages
  organizationName: 'satish-londhe',
  projectName: 'admin-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Serve docs at root
          editUrl: 'https://github.com/satish-londhe/admin-docs/edit/main/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social card
      image: 'img/cmp-social-card.png',

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
            title: 'Quick Links',
            items: [
              { label: 'What is CMP?',         to: '/overview/what-is-cmp' },
              { label: 'Installation',          to: '/installation/prerequisites' },
              { label: 'CloudStack Setup',      to: '/orchestrators/cloudstack/' },
              { label: 'Billing Overview',      to: '/billing/overview' },
            ],
          },
          {
            title: 'Orchestrators',
            items: [
              { label: 'CloudStack',  to: '/orchestrators/cloudstack/' },
              { label: 'OpenStack',   to: '/orchestrators/openstack/' },
              { label: 'VMware',      to: '/orchestrators/vmware/' },
              { label: 'Proxmox',     to: '/orchestrators/proxmox/' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'FAQ',         to: '/faq/billing' },
              { label: 'Glossary',    to: '/overview/glossary' },
              { label: 'GitHub',      href: 'https://github.com/satish-londhe/admin-docs' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} StackConsole. Built with Docusaurus.`,
      },

      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['bash', 'nginx', 'sql', 'ini', 'yaml'],
      },

      // Algolia search — fill in your keys when ready
      // algolia: {
      //   appId: 'YOUR_APP_ID',
      //   apiKey: 'YOUR_SEARCH_API_KEY',
      //   indexName: 'cmp-admin-docs',
      // },
    }),
};

module.exports = config;
