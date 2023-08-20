# Configuration

Testbench utilised `phpunit.xml` configuration and `TestCase` methods and properties to setup environment variables value as global value for every tests.

[[toc]]

## In-Memory SQLite Connection

To reduce setup configuration, you could use `testing` database connection (`:memory:` with `sqlite` driver) by defining it under PHPUnit Configuration File:

```xml
<phpunit>

    // ...

    <php>
        <env name="DB_CONNECTION" value="testing"/>
    </php>

</phpunit>
```

Alternatively, you can also explicitly setting it up under `defineEnvironment()`:

```php
class TestCase extends \Orchestra\Testbench\TestCase 
{
    /**
     * Define environment setup.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return void
     */
    protected function defineEnvironment($app)
    {
        $app['config']->set('database.default', 'testing');
    }
}
```

## Application Timezone

You can also easily override application default timezone, instead of the default `"UTC"`:

```php
class TestCase extends \Orchestra\Testbench\TestCase 
{
    /**
     * Get application timezone.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return string|null
     */
    protected function getApplicationTimezone($app)
    {
        return 'Asia/Kuala_Lumpur';
    }
}
```

## Using `.env` Environment Variables

By default Testbench will load `.env` file when booting the application. You can change to completely ignores `.env` file by setting `TestCase::$loadEnvironmentVariables` property to `false`:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    protected $loadEnvironmentVariables = false;

    // 
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

### Autoloading using `testbench.yaml`

Testbench will use the configuration values defined in `testbench.yaml` and use it's value when the `TestCase` class uses `Orchestra\Testbench\Concerns\WithWorkbench` trait:

```php
use Orchestra\Testbench\Concerns\WithWorkbench;


class TestCase extends \Orchestra\Testbench\TestCase 
{
    use WithWorkbench;
}
```

Using `WithWorkbench` will make `TestCase` uses `laravel` configuration value from `testbench.yaml`:

```yaml
laravel: ./skeleton
```
