# The Basic

[[toc]]

## PHPUnit Configuration

Browser tests can take a while to run, so you could also separate your tests in your `phpunit.xml` file by providing different testsuites, allowing you to run your Browser tests on demand.

For example:

```xml
<testsuites>
    <testsuite name="Browser">
        <directory suffix="Test.php">./tests/Browser</directory>
    </testsuite>
    <testsuite name="Feature">
        <directory suffix="Test.php">./tests/Feature</directory>
    </testsuite>
    <testsuite name="Unit">
        <directory suffix="Test.php">./tests/Unit</directory>
    </testsuite>
</testsuites>
```

Run only your browser tests by running phpunit with the `--testsuite=Browser` option.

## Custom Host and Port

By default, Testbench Dusk will start its own PHP server at `http://127.0.0.1:8001`.

You can customize this by replacing the `$baseServeHost` and `$baseServePort` such as below:

```php{3-4}
class DuskTestCase extends \Orchestra\Testbench\Dusk\TestCase 
{
    protected static $baseServeHost = '127.0.0.1';
    protected static $baseServePort = 9000;
}
```

## Running with or without UI

Dusk 3.5+ offers the ability to run Dusk tests without UI (the browser window), and this is the default and is normally slightly quicker.  
You can switch the behaviour with the following calls:

```php{4,7}
use Orchestra\Testbench\Dusk\Options;

// To show the UI during testing
Options::withUI();

// To hide the UI during testing
Options::withoutUI();
```

We recommend you place this in a `tests/bootstrap.php` file, similar to this packages own test setup and use this for PHP Unit.

## Database

By default you can either use `sqlite`, `mysql`, `pgsql` or `sqlsrv` with Testbench Dusk, however do note that it is impossible to use `sqlite` using `:memory:` database as you would with **Testbench** or **Testbench BrowserKit**.

If you opt to use `sqlite`, you might want to set the default database connection to `sqlite` either using `phpunit` configuration or setting it up on `getEnvironmentSetUp()` method.

```php
/**
 * Define environment setup.
 *
 * @param  Illuminate\Foundation\Application  $app
 *
 * @return void
 */
protected function getEnvironmentSetUp($app)
{
    $this->app['config']->set('database.default', 'sqlite');
}
```
> **Note**: In contradiction with laravel documentation you **should not** use `Illuminate\Foundation\Testing\DatabaseMigrations` trait, as testbench-dusk handles rollbacks by its self

To create the sqlite database you just need to run the following code:

```bash
php vendor/orchestra/testbench-dusk/create-sqlite-db
```

## Advanced Usage

### Customising the Laravel App instance used during a test

We use the calling test class to build up the application to be used when serving the request.

Sometimes you will want to make a minor change to the application for a single test (e.g. changing a config item).

This is made possible by using the `tweakApplication` method on the test, and passing in a closure to apply. At the end of the test, you need to call the `removeApplicationTweaks` method to stop the changes being applied to the server.

An example test (`can_tweak_the_application_within_a_test`) is available in the `tests/Browser/RouteTest.php` test file.

## Troubleshooting

### Chrome versions

```
Facebook\WebDriver\Exception\SessionNotCreatedException: session not created: Chrome version must be between 70 and 73
```

If tests report following error, run the following command:

    ./vendor/bin/dusk-updater update

Alternatively you can run the following command to detect installed ChromeDriver and auto update it if neccessary:

    ./vendor/bin/dusk-updater detect --auto-update

### Running Dusk and standard testbench tests in same suite

You may encounter the error
`PHP Fatal error: Cannot declare class CreateUsersTable, because the name is already in use in...`
when using [`loadLaravelMigrations()`](https://github.com/orchestral/testbench-core/blob/3.9/src/Concerns/WithLaravelMigrations.php) with some of your test extending the Dusk test class `\Orchestra\Testbench\Dusk\TestCase` and others extend the "normal" test class `\Orchestra\Testbench\TestCase`.

The problem arises because migrations are loaded from both packages' "skeletons" during the same test run,
and Laravel's migration classes are not namespaced.

#### Solution

Make sure all integration tests in your test suite use the same Laravel skeleton (the one from `testbench-dusk`),
regardless of the base class they extend by overriding `getBasePath()` in your test classes.
Do the override in your base integration test class, or perhaps in a trait if you need it in multiple classes.

```php
/**
* Make sure all integration tests use the same Laravel "skeleton" files.
* This avoids duplicate classes during migrations.
*
* Overrides \Orchestra\Testbench\Dusk\TestCase::getBasePath
*       and \Orchestra\Testbench\Concerns\CreatesApplication::getBasePath
*
* @return string
*/
protected function getBasePath()
{
    // Adjust this path depending on where your override is located.
    return __DIR__.'/../vendor/orchestra/testbench-dusk/laravel'; 
}
```

