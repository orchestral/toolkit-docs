import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Packages Toolkit",
  description: "Documentation for Canvas, Testbench and Workbench",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Testbench', link: '/testbench/the-basic' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        link: 'getting-started',
        items: [
          { text: 'Configuration', link: 'getting-started/configuration' },
        ],
      },
      {
        text: 'Testbench',
        items: [
          { text: 'Introduction', link: 'getting-started#testbench' },
          {
            text: 'The Basic',
            link : '/testbench/the-basic',
            items: [
              { text: 'Define Environment', link : '/testbench/the-basic/environment' },
              { text: 'Define Databases', link : '/testbench/the-basic/databases' },
              { text: 'Define Routes', link : '/testbench/the-basic/routes' },
              { text: 'Define using YAML', link : '/testbench/the-basic/workbench' },
            ],
          },
          { text: 'Command-line Interface', link: '/testbench/cli' },
          { text: 'Integrations', link: '/testbench/integrations' },
          { text: 'Troubleshooting', link: '/testbench/troubleshooting' },
        ],
      },
      // { text: 'Testbench Dusk', items: [] },
      {
        text: 'Workbench',
        items: [
          { text: 'Introduction', link: 'getting-started#workbench' },
          { text: 'Configuration', link: 'getting-started/configuration#workbench-configuration' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/orchestral/testbench' }
    ]
  }
})
