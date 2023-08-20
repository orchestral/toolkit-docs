# Define Environment

Testbench utilised `phpunit.xml` configuration and `TestCase` methods and properties to setup environment variables value as global value for every tests.

[[toc]]

## `defineEnvironment()` Method

If you need to add something early in the application bootstrapping process (which executed between registering service providers and booting service providers) you could use the `defineEnvironment()` method:

```php
use Illuminate\Contracts\Config\Repository;

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
        // Setup default database to use sqlite :memory:
        tap($app['config'], function (Repository $config) {
            $config->set('database.default', 'testbench');
            $config->set('database.connections.testbench', [
                'driver'   => 'sqlite',
                'database' => ':memory:',
                'prefix'   => '',
            ]);
            
            // Setup queue database connections.
            $config([
                'queue.batching.database' => 'testbench',
                'queue.failed.database' => 'testbench',
            ]);
        });
    }
}
```

::: details FALLBACK METHOD

You can still use predecessor method `getEnvironmentSetup()` for backward compatibility:

```php
/**
 * Define environment setup.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return void
 */
protected function getEnvironmentSetup($app)
{
    //
}
```
:::

## Using Annotation

You can also use `@define-env` annotation to customise use of `defineEnvironment()` for specific test.

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    protected function usesMySqlConnection($app) 
    {
        $app['config']->set('database.default', 'mysql');
    }

    protected function usesSqliteConnection($app)
    {
        $app['config']->set('database.default', 'sqlite');
    }

    /**
     * @test
     * @define-env usesMySqlConnection
     */
    public function it_can_be_connected_with_mysql()
    {
        // write your tests
    }

    /**
     * @test
     * @define-env usesSqliteConnection
     */
    public function it_can_be_connected_with_sqlite()
    {
        // write your tests
    }
}
```

## Application Key

Most application would require `APP_KEY` to be defined in order to use encryption:

```xml
<phpunit>

    // ...

    <php>
        <env name="APP_KEY" value="AckfSECXIvnK5r28GVIWUAxmbBSjTsmF"/>
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
        $app['config']->set('app.key', 'AckfSECXIvnK5r28GVIWUAxmbBSjTsmF');
    }
}
```

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
