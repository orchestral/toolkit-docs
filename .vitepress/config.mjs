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
    ],

    sidebar: [
      {
        text: 'Testbench',
        items: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Introduction', link: '/testbench/getting-started' },
              // { text: 'Configuration', link: '/testbench/getting-started/configuration' }
            ],
          },
          {
            text: 'The Basic',
            items: [
              { text: 'TestCase', link : '/testbench/the-basic' },
              { text: 'Define Environment', link : '/testbench/the-basic/environment' },
              { text: 'Define Databases', link : '/testbench/the-basic/databases' },
            ],
          },
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
