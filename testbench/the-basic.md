# The Basic

[[toc]]

## Package Service Providers

To load your package service provider, override the `getPackageProviders`.

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
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
}
```

## Package Aliases

To load your package alias, override the `getPackageAliases`.

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
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
}
```

## Package Auto-Discovery

By default Testbench doesn't enable any package discovery autoloading when running tests, however you can change this to ignore specific package using:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Ignore package discovery from.
     *
     * @return array<int, string>
     */
    public function ignorePackageDiscoveriesFrom()
    {
        return ['laravel/passport'];
    }
}
```

You may also enable auto discovery for all vendor packages using the following:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Ignore package discovery from.
     *
     * @return array<int, string>
     */
    public function ignorePackageDiscoveriesFrom()
    {
        return [];
    }
}
```

You can also enable auto discovery globally by setting the following property to your TestCase class:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Automatically enables package discoveries.
     *
     * @var bool
     */
    protected $enablesPackageDiscoveries = true;
}
```

::: warning Root Package Discovery

Be aware that root package doesn't automate using package discovery on any version below `v7.11.0` and you need to define it using [Package Service Providers](#package-service-providers) or registering it to the application using `php vendor/bin/testbench package:discover` command.
:::

## Overriding Default Service Providers

You can also override the default application using the following commands:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
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
}
```


## Overriding `setUp()` method

Since `Orchestra\Testbench\TestCase` replace Laravel's `Illuminate\Foundation\Testing\TestCase`, if you need your own `setUp()` implementation, do not forget to call `parent::setUp()` and make sure proper declaration compatibility:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Setup the test environment.
     */
    protected function setUp(): void
    {
        // Code before application created.

        parent::setUp();

        // Code after application created.
    }
}
```

## Overriding Console Kernel

You can easily swap Console Kernel for application bootstrap by overriding `resolveApplicationConsoleKernel()` method:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Resolve application Console Kernel implementation.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return void
     */
    protected function resolveApplicationConsoleKernel($app)
    {
        $app->singleton(
            'Illuminate\Contracts\Console\Kernel', 
            'Tests\Console\Kernel'
        );
    }
}
```

## Overriding HTTP Kernel

You can easily swap HTTP Kernel for application bootstrap by overriding `resolveApplicationHttpKernel()` method:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Resolve application HTTP Kernel implementation.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return void
     */
    protected function resolveApplicationHttpKernel($app)
    {
        $app->singleton(
            'Illuminate\Contracts\Http\Kernel', 
            'Tests\Http\Kernel'
        );
    }
}
```


## Using Custom Laravel Skeleton

By default Testbench provide a basic Laravel Skeleton. However, you can override the `applicationBasePath()` method from your TestCase class:

```php
class TestCase extends \Orchestra\Testbench\TestCase 
{
    /**
     * Get Application base path.
     *
     * @return string
     */
    public static function applicationBasePath()
    {
        return __DIR__.'/../skeleton';
    }
}
```

::: details FALLBACK METHOD

The method was only introduced in `v6.22.0`, if you need to override Laravel Skeleton on project before the release then override `getBasePath` method instead:

```php
class TestCase extends \Orchestra\Testbench\TestCase 
{
    /**
     * Get base path.
     *
     * @return string
     */
    protected function getBasePath() 
    {
        return __DIR__.'/../skeleton';
    }
}
```
:::

## Testing Blade components

You can easily test blade components with Laravel's `Illuminate\Foundation\Testing\Concerns\InteractsWithViews` trait.

```php
<?php
use Illuminate\Foundation\Testing\Concerns\InteractsWithViews;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use InteractsWithViews;
}
```
