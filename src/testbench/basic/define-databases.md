# Define Databases

Package developer should be using `ServiceProvider::loadMigrationsFrom()` feature to automatically handle migrations for packages.

## Automatically execute migrations

Without any additional requirement you can either use `RefreshDatabase` or `DatabaseTransactions` trait:

* `Illuminate\Foundation\Testing\DatabaseTransactions`
* `Illuminate\Foundation\Testing\RefreshDatabase`

```php
<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use RefreshDatabase;
}
```

## Manually execute migrations

Instead of automatically migrate the database, you also manually configure migrations steps using the `defineDatabaseMigrations()` method:

```php
/**
 * Define database migrations.
 *
 * @return void
 */
protected function defineDatabaseMigrations()
{
    $this->artisan('migrate', ['--database' => 'testbench'])->run();

    $this->beforeApplicationDestroyed(function () {
        $this->artisan('migrate:rollback', ['--database' => 'testbench'])->run();
    });
}
```

### Run Laravel Migrations

By default Testbench doesn't execute the default Laravel migrations which include `users` and `password_resets` table. In order to run the migration just add the following command:

```php
/**
 * Define database migrations.
 *
 * @return void
 */
protected function defineDatabaseMigrations()
{
    $this->loadLaravelMigrations();
}
```

You can also set specific database connection to be used by adding `--database` options:

```php
/**
 * Define database migrations.
 *
 * @return void
 */
protected function defineDatabaseMigrations()
{
    $this->loadLaravelMigrations(['--database' => 'testbench']);
}
```

### Run Testing Migrations

To run migrations that are only used for testing purposes and not part of your package, add the following to your base test class:

```php
/**
 * Define database migrations.
 *
 * @return void
 */
protected function defineDatabaseMigrations()
{
    $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
}
```

:::tip Notes and Considerations

* Your migration files has to suite Laravel's convention, e.g. `0000_00_00_000000_create_package_test_tables.php`.
* You may choose to put your migrations folder in `tests/database/`.
* You may choose to change your test-migrations class name to be different from the published class names, e.g. from `CreateUsersTable` to `CreateUsersTestTable` or otherwise you may encounter composer class loader collision.
:::
