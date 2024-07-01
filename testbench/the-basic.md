# The Basic

[[toc]]

## Package Service Providers

To load your package service provider, override the `getPackageProviders`.

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Get package providers.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return array<int, class-string<\Illuminate\Support\ServiceProvider>>
     */
    protected function getPackageProviders($app) # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        return [ # [!code ++] # [!code focus]
            'Acme\AcmeServiceProvider', # [!code hl]
        ]; # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```

## Package Aliases

To load your package alias, override the `getPackageAliases`.

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Override application aliases.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return array<string, class-string<\Illuminate\Support\Facades\Facade>>
     */
    protected function getPackageAliases($app) # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        return [ # [!code ++] # [!code focus]
            'Acme' => 'Acme\Facade', # [!code hl]
        ]; # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```

## Package Auto-Discovery

By default Testbench doesn't enable any package discovery autoloading when running tests. However, you can change this to ignore specific packages using:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Ignore package discovery from.
     *
     * @return array<int, string>
     */
    public function ignorePackageDiscoveriesFrom() # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        return [  # [!code ++] # [!code focus]
            'laravel/passport', # [!code hl]
        ]; # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```

You may also enable auto-discovery for all vendor packages using the following:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Ignore package discovery from.
     *
     * @return array<int, string>
     */
    public function ignorePackageDiscoveriesFrom() # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        return []; # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```

You can also enable auto-discovery globally by setting the following property to your TestCase class:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Automatically enables package discoveries.
     *
     * @var bool
     */
    protected $enablesPackageDiscoveries = true; # [!code ++] # [!code focus]
}
```

::: warning Root Package Discovery

Be aware that the root package doesn't automate using package discovery on any version below `v7.11.0` and you need to define it using [Package Service Providers](#package-service-providers) or registering it to the application using `php vendor/bin/testbench package:discover` command.
:::

## Overriding Default Service Providers

You can also override the default application using the following commands:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Get package providers.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return array<class-string<\Illuminate\Support\ServiceProvider>, class-string<\Illuminate\Support\ServiceProvider>>
     */
    protected function overrideApplicationBindings($app) # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        return [ # [!code ++] # [!code focus]
            'Illuminate\View\ViewServiceProvider' => 'Acme\ViewServiceProvider', # [!code hl]
        ]; # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```


## Overriding `setUp()` method

Since `Orchestra\Testbench\TestCase` replace Laravel's `Illuminate\Foundation\Testing\TestCase`, if you need your own `setUp()` implementation, do not forget to call `parent::setUp()` and make sure proper declaration compatibility:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Setup the test environment.
     */
    protected function setUp(): void # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        // Code before application created. # [!code hl:10]

        $this->afterApplicationCreated(function () {
            // Code after application created.
        });

        $this->beforeApplicationDestroyed(function () {
            // Code before application destroyed.
        });

        parent::setUp(); # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```

## Overriding Console Kernel

You can easily swap Console Kernel for application bootstrap by overriding `resolveApplicationConsoleKernel()` method:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Resolve application Console Kernel implementation.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return void
     */
    protected function resolveApplicationConsoleKernel($app) # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        $app->singleton( # [!code ++] # [!code focus]
            'Illuminate\Contracts\Console\Kernel', # [!code ++] # [!code focus]
            'Tests\Console\Kernel' # [!code hl]
        ); # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```

## Overriding HTTP Kernel

You can easily swap HTTP Kernel for application bootstrap by overriding `resolveApplicationHttpKernel()` method:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Resolve application HTTP Kernel implementation.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return void
     */
    protected function resolveApplicationHttpKernel($app) # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        $app->singleton( # [!code ++] # [!code focus]
            'Illuminate\Contracts\Http\Kernel', # [!code ++] # [!code focus]
            'Tests\Http\Kernel' # [!code hl]
        ); # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```


## Using Custom Laravel Skeleton

By default, Testbench provides a basic Laravel Skeleton. However, you can override the `applicationBasePath()` method from your TestCase class:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Get Application base path.
     *
     * @return string
     */
    public static function applicationBasePath() # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        return __DIR__.'/../skeleton'; # [!code ++] # [!code focus]
    } # [!code ++] # [!code focus]
}
```

::: details FALLBACK METHOD

The method was only introduced in `v6.22.0`, if you need to override Laravel Skeleton on the project before the release then overrides `getBasePath` method instead:

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
use Illuminate\Foundation\Testing\Concerns\InteractsWithViews; # [!code ++]

class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    use InteractsWithViews; # [!code ++] # [!code focus]
}
```
