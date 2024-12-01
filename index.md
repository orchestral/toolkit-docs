---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Packages Toolkit for Laravel"
  text: ''
  tagline: "Documentation for Canvas, Testbench, and Workbench"
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: Testbench
      link: /testbench

features:
  - title: Testbench
    details: Simplify the process to create feature and integration tests for your Laravel packages without massive configuration and build steps.
  - title: Testbench Dusk
    details: Built on top Testbench to provide support running browser-based tests for your Laravel's packages using Laravel Dusk
  - title: Canvas
    details: Canvas replicates all of the <code>make</code> artisan commands available in your basic Laravel application to speed up your Laravel's package development.
  - title: Workbench
    details: Workbench provides a set of configurable actions and commands to allow previewing, interacting, and serving your Laravel's packages during development
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/crynobone.png',
    name: 'Mior Muhammad Zaki',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/crynobone' },
      { icon: 'twitter', link: 'https://twitter.com/crynobone' }
    ],
    sponsor: 'https://github.com/sponsors/crynobone'
  },
]
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1152px;
  padding-top: 20px;
}
</style>

<div class="container">
  <VPTeamMembers size="medium" :members="members" />
</div>
