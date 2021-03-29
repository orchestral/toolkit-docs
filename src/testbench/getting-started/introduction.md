# Introduction

Testbench Component is the de-facto package that has been designed to help you write tests for your Laravel package.

Before going through the rest of this documentation, please take some time to read the [Package Development](https://laravel.com/docs/8.x/packages) section of Laravel's own documentation, if you haven't done so yet.

[[toc]]

## Installation

To install through composer, run the following command from terminal:

    composer require --dev "orchestra/testbench"

You can also setup Testbench to auto discover packages by updating `"scripts"` on the package `composer.json`:

```json
    "scripts": {
        "post-autoload-dump": [
            "@php ./vendor/bin/testbench package:discover --ansi"
        ]
    },
```

## Version Compatibility

 Laravel  | Testbench
:---------|:----------
 5.x.x    | 3.x.x
 6.x      | 4.x
 7.x      | 5.x
 8.x      | 6.x

