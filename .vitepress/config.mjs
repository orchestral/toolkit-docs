import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Laravel Packages Toolkit",
  description: "Documentation for Canvas, Testbench and Workbench",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Testbench', link: '/testbench/getting-started' },
      { text: 'Testbench', link: '/testbench/getting-started' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installing', link: 'getting-started' },
          { text: 'Setup', link: 'getting-started/setup' },
        ],
      },
      {
        text: 'Testbench',
        items: [
          {
            text: 'The Basic',
            link : '/testbench/the-basic',
            items: [
              { text: 'Define Environment', link : '/testbench/the-basic/environment' },
              { text: 'Define Databases', link : '/testbench/the-basic/databases' },
              { text: 'Define Routes', link : '/testbench/the-basic/routes' },
            ],
          },
          { text: 'Command-line Interface', link: '/testbench/cli' },
          { text: 'Integrations', link: '/testbench/integrations' },
          { text: 'Troubleshooting', link: '/testbench/troubleshooting' },
        ],
      },
      // { text: 'Testbench Dusk', items: [] },
      // { text: 'Workbench', items: [] }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/orchestral/testbench' }
    ]
  }
})
