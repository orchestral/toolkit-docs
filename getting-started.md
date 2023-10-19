---
next:
  text: 'Configuration'
  link: '/getting-started/configuration'
---

# Introduction

Packages Toolkit for Laravel is a collection of packages that have been designed to write, test, and preview your Laravel packages.

Before going through the rest of this documentation, please take some time to read the [Package Development](https://laravel.com/docs/packages) section of Laravel's own documentation, if you haven't done so yet.

[[toc]]

## Installation

To start using Packages Toolkit for Laravel you can first install the components:

```bash
composer require --dev "orchestra/testbench"
```

Alternatively, if you need to run Dusk tests on your Laravel package you should install the following dependency instead:

```bash
composer require --dev "orchestra/testbench-dusk"
```

### Setup

Next, you can run the following command to scaffold your package with the recommended setup:

```bash
vendor/bin/testbench workbench:install
```

## Components

### Testbench

Testbench simplifies the process to create feature and integration tests for your Laravel packages without massive configuration and build steps. 

##### Version Compatibility

 Laravel  | Testbench | Recommended Versions
:---------|:----------|:----------
 8.x      | 6.x       | `^6.37`
 9.x      | 7.x       | `^7.34`
 10.x     | 8.x       | `^8.14`
 11.x     | 9.x       | `^9.0`

### Testbench Dusk

Testbench Dusk is built on top of Testbench to provide support running browser-based tests for your Laravel packages using [Laravel Dusk](https://laravel.com/docs/dusk). 

##### Version Compatibility

 Laravel  | Testbench Dusk | Recommended Versions
:---------|:---------------|:----------
 8.x      | 6.x            | `^6.38`
 9.x      | 7.x            | `^7.33`
 10.x     | 8.x            | `^8.14`
 11.x     | 9.x            | `^9.0`

### Testbench Core

Testbench Core provides the full testing API and CLI `testbench` binary which is being used by **Testbench**, **Testbench Dusk**, and **Workbench**. This component is accessible via `orchestra/testbench` without any further requirements.

##### Version Compatibility

 Laravel  | Testbench Core   
:---------|:-----------
 8.x      | 6.x
 9.x      | 7.x
 10.x     | 8.x

### Canvas

Canvas replicates all of the `make` artisan commands available in your basic Laravel application to speed up your Laravel package development.

##### Version Compatibility

 Laravel  | Canvas   | Recommended Versions
:---------|:---------|:----------
 8.x      | 6.x      | `^6.10`
 9.x      | 7.x      | `^7.11`
 10.x     | 8.x      | `^8.11`

### Workbench

Workbench provides a set of configurable actions and commands to allow previewing, interacting, and serving your Laravel packages during development. This component is accessible via `orchestra/testbench` without any further requirements.

##### Version Compatibility

 Laravel  | Workbench | Recommended Versions
:---------|:----------|:----------
 8.x      | -         | -
 9.x      | 1.x       | `^1.0`
 10.x     | 1.x       | `^1.0`
