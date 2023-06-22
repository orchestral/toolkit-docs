# Define Environment

If you need to add something early in the application bootstrapping process (which executed between registering service providers and booting service providers) you could use the `defineEnvironment()` method:

```php
use Illuminate\Contracts\Config\Repository;

/**
 * Define environment setup.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return void
 */
protected function defineEnvironment($app)
{
    // Setup default database to use sqlite :memory:
    tap($app->make('config'), function (Repository $config) {
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
```

:::tip It's an alias to <code>getEnvironmentSetup()</code>

Instead of `defineEnvironment()`, you can still use predecessor method `getEnvironmentSetup()`.
:::

## Using Annotation

You can also use `@define-env` annotation to customise use of `defineEnvironment()` for specific test.

```php
protected function usesMySqlConnection($app) 
{
    $app->config->set('database.default', 'mysql');
}

protected function usesSqliteConnection($app)
{
    $app->config->set('database.default', 'sqlite');
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
```
