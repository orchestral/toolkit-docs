# Introduction

Testbench Component is the de-facto package that has been designed to help you write tests for your Laravel package.

Before going through the rest of this documentation, please take some time to read the [Package Development](https://laravel.com/docs/8.x/packages) section of Laravel's own documentation, if you haven't done so yet.

[[toc]]

## Installation

To install through composer, run the following command from terminal:

```bash
composer require --dev "orchestra/testbench"
```

## Setup

Next, to setup the default `"scripts"` in `composer.json` and setup **Workbench** for the package you can run the following command:

```bash
vendor/bin/testbench workbench:install
```

## Version Compatibility

 Laravel  | Testbench
:---------|:----------
 5.x.x    | 3.x.x
 6.x      | 4.x
 7.x      | 5.x
 8.x      | 6.x
 9.x      | 7.x
 10.x     | 8.x

