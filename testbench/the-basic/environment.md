# Define Environment

Testbench utilized `phpunit.xml` configuration and `TestCase` methods and properties to setup environment variables values as global values for every test.

[[toc]]

## `defineEnvironment()` Method

If you need to add something early in the application bootstrapping process (which is executed between registering service providers and booting service providers) you could use the `defineEnvironment()` method:

```php{11-28}
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

You can also use `@define-env` annotation to customize the use of `defineEnvironment()` for specific tests.

```php{3-6,8-11,15,24}
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

## Using Attribute

You can also use `Orchestra\Testbench\Attributes\DefineEnvironment` attribute to customize the use of `defineEnvironment()` for specific tests.

```php{1,6-9,11-14,17,24}
use Orchestra\Testbench\Attributes\DefineEnvironment;
use PHPUnit\Framework\Attributes\Test;

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

    #[Test]
    #[DefineEnvironment('usesMySqlConnection')]
    public function it_can_be_connected_with_mysql()
    {
        // write your tests
    }

    #[Test]
    #[DefineEnvironment('usesSqliteConnection')]
    public function it_can_be_connected_with_sqlite()
    {
        // write your tests
    }
}
```

## Application Key

Most applications would require `APP_KEY` to be defined in order to use encryption:

```xml{4}
<phpunit>
    // ...
    <php>
        <env name="APP_KEY" value="AckfSECXIvnK5r28GVIWUAxmbBSjTsmF"/>
    </php>
</phpunit>
```

Alternatively, you can also explicitly set it up under `defineEnvironment()`:

```php{9-12}
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

## Application Timezone

You can also easily override the application's default timezone, instead of the default `"UTC"`:

```php{9-12}
class TestCase extends \Orchestra\Testbench\TestCase 
{
    /**
     * Get the application timezone.
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

By default, Testbench will load `.env` file when booting the application if the file exists. You can change to completely ignores `.env` file by setting `TestCase::$loadEnvironmentVariables` property to `false`:

```php{3}
class TestCase extends \Orchestra\Testbench\TestCase
{
    protected $loadEnvironmentVariables = false;

    // 
}  
```
