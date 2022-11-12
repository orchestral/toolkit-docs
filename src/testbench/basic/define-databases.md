# Define Databases

It is recommended for package to use `ServiceProvider::loadMigrationsFrom()` feature (it automatically handle migrations for packages when used in Laravel applications and during tests) or you can define migrations specifically for tests environment using the recommended guide below.

## Automatically execute migrations

By defaults you can use the `RefreshDatabase` trait to *only* run package migrations defined through the package's service provider.

```php
<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use RefreshDatabase;
}
```

If you also need to run the default Laravel migrations such as the `users` table migration, see the [Run Laravel Migrations](#run-laravel-migrations) section.

## Manually execute migrations

Instead of just automatically migrate the database, you also manually configure migrations steps using the `defineDatabaseMigrations()` method:

```php
use function Orchestra\Testbench\artisan;

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

### Using Database Transactions

You may also utilise `DatabaseTransactions` for migrated state using the following:

```php
<?php

namespace Tests;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class TestCase extends \Orchestra\Testbench\TestCase
{
    use DatabaseTransactions;
}
```

:::tip NOTES & CONSIDERATIONS

* Your migration files has to suite Laravel's convention, e.g. `0000_00_00_000000_create_package_test_tables.php`.
* You may choose to put your migrations folder in `tests/database/`.
* You may choose to change your test-migrations class name to be different from the published class names, e.g. from `CreateUsersTable` to `CreateUsersTestTable` or otherwise you may encounter composer class loader collision.
:::
