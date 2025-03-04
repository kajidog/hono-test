// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Hono + Bun アプリケーション",
  tagline: "高速なWebアプリケーションのドキュメント",
  url: "https://kajidog.github.io",
  baseUrl: "/hono-test/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "kajidog",
  projectName: "hono-test",
  trailingSlash: false,
  customFields: {
    deploymentBranch: "gh-pages",
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/kajidog/hono-test/edit/main/docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Hono + Bun ドキュメント",
        logo: {
          alt: "Hono + Bun Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "ドキュメント",
          },
          {
            href: "https://github.com/kajidog/hono-test",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "ドキュメント",
            items: [
              {
                label: "API仕様",
                to: "/docs/api/auth",
              },
            ],
          },
          {
            title: "リソース",
            items: [
              {
                label: "Hono",
                href: "https://honojs.dev/",
              },
              {
                label: "Bun",
                href: "https://bun.sh/",
              },
            ],
          },
          {
            title: "その他",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/kajidog/hono-test",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hono + Bun アプリケーション. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      mermaid: {
        theme: { light: "neutral", dark: "forest" },
        options: {
          maxTextSize: 5000,
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
          },
        },
      },
    }),
};

module.exports = config;
