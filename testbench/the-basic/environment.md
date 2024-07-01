# Define Environment

Testbench utilized `phpunit.xml` configuration and `TestCase` methods and properties to setup environment variables values as global values for every test.

[[toc]]

## `defineEnvironment()` Method

If you need to add something early in the application bootstrapping process (which is executed between registering service providers and booting service providers) you could use the `defineEnvironment()` method:

```php
use Illuminate\Contracts\Config\Repository; # [!code hl]

class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Define environment setup.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return void
     */
    protected function defineEnvironment($app) # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        // Setup default database to use sqlite :memory: # [!code hl:15]
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
    } # [!code ++] # [!code focus]
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
protected function getEnvironmentSetup($app) # [!code focus:4]
{
    //
}
```
:::

### Using Attribute

You can also use `Orchestra\Testbench\Attributes\DefineEnvironment` attribute to customize the use of `defineEnvironment()` for specific tests.

```php
use Orchestra\Testbench\Attributes\DefineEnvironment; # [!code ++] # [!code focus]
use PHPUnit\Framework\Attributes\Test;

class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    protected function usesMySqlConnection($app) # [!code hl:4] # [!code focus]
    {
        $app['config']->set('database.default', 'mysql');
    }

    protected function usesSqliteConnection($app) # [!code hl:4] # [!code focus]
    {
        $app['config']->set('database.default', 'sqlite');
    }

    #[Test]
    #[DefineEnvironment('usesMySqlConnection')] # [!code ++] # [!code focus]
    public function it_can_be_connected_with_mysql()
    {
        // write your tests
    }

    #[Test]
    #[DefineEnvironment('usesSqliteConnection')] # [!code ++] # [!code focus]
    public function it_can_be_connected_with_sqlite()
    {
        // write your tests
    }
}
```

### Using Annotation

::: warning Deprecated

Annotation usage with PHPUnit has been mark as deprecated and will be removed in future versions.
:::

You can also use `@define-env` annotation to customize the use of `defineEnvironment()` for specific tests.

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    protected function usesMySqlConnection($app) # [!code hl:4] # [!code focus] 
    {
        $app['config']->set('database.default', 'mysql');
    }

    protected function usesSqliteConnection($app) # [!code hl:4] # [!code focus] 
    {
        $app['config']->set('database.default', 'sqlite');
    }

    /**
     * @test
     * @define-env usesMySqlConnection # [!code ++] # [!code focus]
     */
    public function it_can_be_connected_with_mysql()
    {
        // write your tests
    }

    /**
     * @test
     * @define-env usesSqliteConnection # [!code ++] # [!code focus]
     */
    public function it_can_be_connected_with_sqlite()
    {
        // write your tests
    }
}
```

## Application Key

Most applications would require `APP_KEY` to be defined in order to use encryption:

```xml
<phpunit>
    // ...
    <php>
        <env name="APP_KEY" value="AckfSECXIvnK5r28GVIWUAxmbBSjTsmF"/> # [!code ++] # [!code focus]
    </php>
</phpunit>
```

## Application Timezone

You can also easily override the application's default timezone, instead of the default `"UTC"`:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus]
{
    /**
     * Get the application timezone.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return string|null
     */
    protected function getApplicationTimezone($app) # [!code ++] # [!code focus]
    { # [!code ++] # [!code focus]
        return 'Asia/Kuala_Lumpur'; # [!code hl]
    } # [!code ++] # [!code focus]
}
```

## Using `.env` Environment Variables

By default, Testbench will load `.env` file when booting the application if the file exists. You can change to completely ignores `.env` file by setting `TestCase::$loadEnvironmentVariables` property to `false`:

```php
class TestCase extends \Orchestra\Testbench\TestCase # [!code focus:3]
{
    protected $loadEnvironmentVariables = false; # [!code ++]

    // 
}  
```
