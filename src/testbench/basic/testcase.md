# TestCase

To use Testbench Component, all you need to do is extend `Orchestra\Testbench\TestCase` instead of `PHPUnit\Framework\TestCase`. The fixture `app` booted by `Orchestra\Testbench\TestCase` is predefined to follow the base application skeleton of Laravel.

```php
<?php

namespace Tests;

class TestCase extends \Orchestra\Testbench\TestCase
{
    //
}
```

[[toc]]

## Custom Service Providers

To load your package service provider, override the `getPackageProviders`.

```php
/**
 * Get package providers.
 *
 * @param  \Illuminate\Foundation\Application  $app
 *
 * @return array
 */
protected function getPackageProviders($app)
{
    return [
        'Acme\AcmeServiceProvider',
    ];
}
```

## Custom Aliases

To load your package alias, override the `getPackageAliases`.

```php
/**
 * Get package aliases.
 *
 * @param  \Illuminate\Foundation\Application  $app
 *
 * @return array
 */
protected function getPackageAliases($app)
{
    return [
        'Acme' => 'Acme\Facade',
    ];
}
```

## Overriding setUp() method

Since `Orchestra\Testbench\TestCase` replace Laravel's `Illuminate\Foundation\Testing\TestCase`, if you need your own `setUp()` implementation, do not forget to call `parent::setUp()` and make sure proper declaration compatibility:

```php
/**
 * Setup the test environment.
 */
protected function setUp(): void
{
    // Code before application created.

    parent::setUp();

    // Code after application created.
}
```

## Overriding Console Kernel

You can easily swap Console Kernel for application bootstrap by overriding `resolveApplicationConsoleKernel()` method:

```php
/**
 * Resolve application Console Kernel implementation.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return void
 */
protected function resolveApplicationConsoleKernel($app)
{
    $app->singleton('Illuminate\Contracts\Console\Kernel', 'Tests\Console\Kernel');
}
```

## Overriding HTTP Kernel

You can easily swap HTTP Kernel for application bootstrap by overriding `resolveApplicationHttpKernel()` method:

```php
/**
 * Resolve application HTTP Kernel implementation.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return void
 */
protected function resolveApplicationHttpKernel($app)
{
    $app->singleton('Illuminate\Contracts\Http\Kernel', 'Tests\Http\Kernel');
}
```
