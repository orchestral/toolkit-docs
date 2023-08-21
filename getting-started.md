---
outline: 2
next:
  text: 'Configuration'
  link: '/getting-started/configuration'
---

# Introduction

Packages Toolkit for Laravel is a collections packages that has been designed to write, tests and preview your Laravel packages.

Before going through the rest of this documentation, please take some time to read the [Package Development](https://laravel.com/docs/packages) section of Laravel's own documentation, if you haven't done so yet.

[[toc]]

## Installation

To start using Packages Toolkit for Laravel you can first install Testbench component:

```bash
composer require --dev "orchestra/testbench" "orchestra/canvas"
```

To allow using Testbench Dusk, you can run the following command:

```bash
composer require --dev "orchestra/testbench-dusk"
```

Next, you can run the following command to scaffold your package with the recommended setup:

```bash
vendor/bin/testbench workbench:install
```

## Components

### Testbench

Testbench simplify the process to create feature and integration tests for your Laravel's packages without massive configuration and build steps. 

#### Version Compatibility

 Laravel  | Testbench | Recommended Versions
:---------|:----------|:----------
 8.x      | 6.x       | `^6.35`
 9.x      | 7.x       | `^7.29`
 10.x     | 8.x       | `^8.9`

### Testbench Dusk

Testbench Dusk built on top Testbench to provide support running browser based tests for your Laravel's packages using [Laravel Dusk](https://laravel.com/docs/dusk). 

#### Version Compatibility

 Laravel  | Testbench Dusk | Recommended Versions
:---------|:---------------|:----------
 8.x      | 6.x            | `^6.34`
 9.x      | 7.x            | `^7.29`
 10.x     | 8.x            | `^8.9`

### Testbench Core

Testbench Core provides the full testing API and CLI `testbench` binary which is being used by **Testbench**, **Testbench Dusk** and **Workbench**. This component is accessible via `orchestra/testbench` without any further requirement.

#### Version Compatibility

 Laravel  | Testbench Core   
:---------|:-----------
 8.x      | 6.x
 9.x      | 7.x
 10.x     | 8.x

### Canvas

Canvas replicates all of the `make` artisan commands available in your basic Laravel application to speed up your Laravel's package development.

#### Version Compatibility

 Laravel  | Canvas   | Recommended Versions
:---------|:---------|:----------
 8.x      | 6.x      | `^6.10`
 9.x      | 7.x      | `^7.5`
 10.x     | 8.x      | `^8.4`

### Workbench

Workbench provides a set of configurable actions and commands to allow previewing, interacting and serving your Laravel's packages during development. This component is accessible via `orchestra/testbench` without any further requirement.

#### Version Compatibility

 Laravel  | Workbench   
:---------|:-----------
 8.x      | -
 9.x      | 0.1.x
 10.x     | 0.1.x
