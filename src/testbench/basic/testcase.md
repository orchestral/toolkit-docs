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

## Package Service Providers

To load your package service provider, override the `getPackageProviders`.

```php
/**
 * Get package providers.
 *
 * @param  \Illuminate\Foundation\Application  $app
 *
 * @return array<int, class-string<\Illuminate\Support\ServiceProvider>>
 */
protected function getPackageProviders($app)
{
    return [
        'Acme\AcmeServiceProvider',
    ];
}
```

## Package Aliases

To load your package alias, override the `getPackageAliases`.

```php
/**
 * Override application aliases.
 *
 * @param  \Illuminate\Foundation\Application  $app
 *
 * @return array<string, class-string<\Illuminate\Support\Facades\Facade>>
 */
protected function getPackageAliases($app)
{
    return [
        'Acme' => 'Acme\Facade',
    ];
}
```

## Package Auto-Discovery

By default Testbench doesn't enable any package discovery autoloading when running tests, however you can change this to ignore specific package using:

```php
/**
 * Ignore package discovery from.
 *
 * @return array<int, string>
 */
public function ignorePackageDiscoveriesFrom()
{
    return ['laravel/passport'];
}
```

You may also enable auto discovery for all vendor packages using the following:

```php
/**
 * Ignore package discovery from.
 *
 * @return array<int, string>
 */
public function ignorePackageDiscoveriesFrom()
{
    return [];
}
```

You can also enable auto discovery globally by setting the following property to your TestCase class:

```php
/**
 * Automatically enables package discoveries.
 *
 * @var bool
 */
protected $enablesPackageDiscoveries = true;
```

::: warning Root Package Discovery

Be aware that root package doesn't automate using package discovery on any version below `v7.11.0` and you need to define it using [Package Service Providers](#package-service-providers) or registering it to the application using `php vendor/bin/testbench package:discover` command.
:::

## Overriding Default Service Providers

You can also override the default application using the following commands:

```php
/**
 * Get package providers.
 *
 * @param  \Illuminate\Foundation\Application  $app
 *
 * @return array<class-string<\Illuminate\Support\ServiceProvider>, class-string<\Illuminate\Support\ServiceProvider>>
 */
protected function overrideApplicationBindings($app)
{
    return [
        'Illuminate\View\ViewServiceProvider' => 'Acme\ViewServiceProvider',
    ];
}
```


## Overriding `setUp()` method

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

## Testing Blade components

You can easily test blade components with Laravel's `Illuminate\Foundation\Testing\Concerns\InteractsWithViews` trait.

```php
<?php

namespace Tests;

use Illuminate\Foundation\Testing\Concerns\InteractsWithViews;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use InteractsWithViews;
}
```

## Testing Controller with Inertia

If one of your controllers returns an Inertia response, you need to follow these steps:

1. Ensure that your HandleInertiaMiddleware is correctly registered.
2. Create a new file named app.blade.php in your package's resources/views directory.
3. Register the Inertia ServiceProvider in your BaseTest.
4. In your setUp function, register the location of your dummy blade file.
5. (Optional) Register a custom file finder to ensure that your pages are correctly resolved.

```php
use Inertia\ServiceProvider;

class BaseTest extends TestCase
{
    protected function getPackageProviders($app)
    {
        return [
            ServiceProvider::class,
        ];
    }

    public function setUp(): void
    {
        View::addLocation('resources/views'); // or some custom path
        // If you have custom page namespaces separated by '::', register them:
        $this->app->bind('inertia.testing.view-finder', function ($app) {
            $viewFinder = new \Illuminate\View\FileViewFinder(
                $app['files'],
                array_merge($app['config']->get('inertia.testing.page_paths'), ['path_to_your_pages']),
                array_merge($app['config']->get('inertia.testing.page_extensions'), ['vue', 'js', 'jsx', 'ts', 'tsx', 'html', 'php'])
            );
            $viewFinder->addNamespace('WD', 'UI/resources/app/Pages');

            return $viewFinder;
        });
    }
}
    
``` 
