# Define Databases

It is recommended for a package to use `ServiceProvider::loadMigrationsFrom()` feature (it automatically handles migrations for packages when used in Laravel applications and during tests) or you can define migrations specifically for the tests environment using the recommended guide below.


## In-Memory SQLite Connection

To reduce setup configuration, you could use `testing` database connection (`:memory:` with `sqlite` driver) by defining it under PHPUnit Configuration File:

```xml{4}
<phpunit>
    // ...
    <php>
        <env name="DB_CONNECTION" value="testing"/>
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
        $app['config']->set('database.default', 'testing');
    }
}
```

## Automatically execute migrations

By default, you can use the `RefreshDatabase` trait to *only* run package migrations defined through the package's service provider.

```php{1,5}
use Illuminate\Foundation\Testing\RefreshDatabase;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use RefreshDatabase;
}
```

If you also need to run the default Laravel migrations such as the `users` table migration, see the [Run Laravel Migrations](#run-laravel-migrations) section.

## Manually execute migrations

Instead of just automatically migrating the database, you also manually configure migrations steps using the `defineDatabaseMigrations()` method:

```php{1,10-17}
use function Orchestra\Testbench\artisan;

class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Define database migrations.
     *
     * @return void
     */
    protected function defineDatabaseMigrations()
    {
        artisan($this, 'migrate', ['--database' => 'testbench']);

        $this->beforeApplicationDestroyed(
            fn () => artisan($this, 'migrate:rollback', ['--database' => 'testbench'])
        );
    }
}
```

### Run Laravel Migrations

By default, Testbench doesn't execute the default Laravel migrations which include `users` and `password_resets` table. In order to run the migration just add the following command:

```php{10}
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Define database migrations.
     *
     * @return void
     */
    protected function defineDatabaseMigrations()
    {
        $this->loadLaravelMigrations();
    }
}
```

You can also set specific database connections to be used by adding `--database` options:

```php{10}
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Define database migrations.
     *
     * @return void
     */
    protected function defineDatabaseMigrations()
    {
        $this->loadLaravelMigrations(['--database' => 'testbench']);
    }
}
```

### Run Testing Migrations

To run migrations that are only used for testing purposes and not part of your package, add the following to your base test class:

```php{1,12}
use function Orchestra\Testbench\workbench_path;

class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Define database migrations.
     *
     * @return void
     */
    protected function defineDatabaseMigrations()
    {
        $this->loadMigrationsFrom(workbench_path('database/migrations'));
    }
}
```

### Using Database Transactions

You may also utilise `DatabaseTransactions` for migrated state using the following:

```php{1,5}
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use DatabaseTransactions;
}
```

::: details NOTES & CONSIDERATIONS

* Your migration files has to suite Laravel's convention, e.g. `0000_00_00_000000_create_package_test_tables.php`.
* You may choose to put your migrations folder in `workbench/database/migrations`.
* You may choose to change your test-migrations class name to be different from the published class names, e.g. from `CreateUsersTable` to `CreateUsersTestTable` or otherwise you may encounter composer class loader collision.
:::
