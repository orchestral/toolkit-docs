# The Basic

[[toc]]

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

Dusk 3.5+ offers the ability to run Dusk tests without UI (the browser window), and this is the default and is normally slightly quicker. You can switch the behavior with the following calls:

```php{4,7}
use Orchestra\Testbench\Dusk\Options;

// To show the UI during testing
Options::withUI();

// To hide the UI during testing
Options::withoutUI();
```

We recommend you place this in a `tests/bootstrap.php` file, similar to this package's own test setup, and use this for PHPUnit.

## Supported Database

By default, you can either use `sqlite`, `mysql`, `pgsql`, or `sqlsrv` with Testbench Dusk. However, do note that it is impossible to use `sqlite` using `:memory:` database as you would with **Testbench** or **Testbench BrowserKit**.

If you opt to use SQLite, you might want to set the default database connection to `sqlite` either using `phpunit` configuration or setting it up on `defineEnvironment()` method.

```php{10-13}
class DuskTestCase extends \Orchestra\Testbench\Dusk\TestCase
{
    /**
     * Define environment setup.
     *
     * @param  Illuminate\Foundation\Application  $app
     *
     * @return void
     */
    protected function defineEnvironment($app)
    {
        $this->app['config']->set('database.default', 'sqlite');
    }
}
```
> **Note**: In contradiction with laravel documentation you **should not** use `Illuminate\Foundation\Testing\DatabaseMigrations` trait, as testbench-dusk handles rollbacks by its self

To create the SQLite database you just need to run the following code:

```bash
vendor/bin/testbench-dusk package:create-sqlite-db
```

## Customising the Laravel served instance used during a test

With Testbench Dusk, it executes a separate process to serve the application and any changes made within the TestCase don't get executed in the served instance. 

As an example, sometimes you will want to make a minor change to the application for a single test such as changing a config item, etc. This is made possible by using the `beforeServingApplication` method on the test and passing in a closure to apply.

```php{3-5}
use Laravel\Dusk\Browser;

$this->beforeServingApplication(function ($app, $config) {
    $config->set('mail.default', 'log');
});

$this->browse(function (Browser $browser) {

});
```
