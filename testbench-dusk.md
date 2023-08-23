---
prev: false
next: false
---

# Introduction

Testbench simplifies the process to create feature and integration tests for your Laravel packages without massive configuration and build steps. 

[[toc]]

## Installing

You can install **Testbench** using the following command:

```bash
composer require --dev "orchestra/testbench-dusk"
```

Next, you can run the following command to scaffold your package with the recommended setup:

```bash
vendor/bin/testbench workbench:install
```

## Version Compatibility

 Laravel  | Testbench Dusk
:---------|:----------
 6.x      | 4.x
 7.x      | 5.x
 8.x      | 6.x
 9.x      | 7.x
 10.x     | 8.x

## Configuration

Please refer to [Configuration](/getting-started/configuration) documentation for further details.

## Getting Started

To use Testbench Dusk Component, all you need to do is extend `Orchestra\Testbench\Dusk\TestCase` instead of `PHPUnit\Framework\TestCase`. The fixture `app` booted by `Orchestra\Testbench\Dusk\TestCase` is predefined to follow the base application skeleton of Laravel.

```php{1}
class DuskTestCase extends \Orchestra\Testbench\Dusk\TestCase
{
    //
}
```

### PHPUnit Configuration

Browser tests can take a while to run, so you could also separate your test suite in your `phpunit.xml` file by providing different test suites, allowing you to run your Browser tests on demand.

```xml{2-4}
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

Run only your browser tests by running PHPUnit with the `--testsuite=Browser` option.

```bash
vendor/bin/phpunit --testsuite=Browser
```

::: tip Using separate PHPUnit Configuration
Alternatively, you can also create a separate PHPUnit Configuration dedicated, we recommend using `phpunit.dusk.xml` for this purpose.
:::

### Autoloading using `testbench.yaml`

Testbench will use the configuration values defined in `testbench.yaml` and use its value when the `TestCase` class uses `Orchestra\Testbench\Concerns\WithWorkbench` trait:

```php{1,5}
use Orchestra\Testbench\Concerns\WithWorkbench;

class DuskTestCase extends \Orchestra\Testbench\Dusk\TestCase 
{
    use WithWorkbench;
}
```

#### Package Service Providers

Using `WithWorkbench` will make `TestCase` uses `providers` configuration value from `testbench.yaml`:

```yaml
providers:
  - Laravel\Sanctum\SanctumServiceProvider
  - Workbench\App\Providers\WorkbenchServiceProvider
```

#### Using Custom Laravel Skeleton

Using `WithWorkbench` will make `TestCase` uses `laravel` configuration value from `testbench.yaml`:

```yaml
laravel: ./skeleton
```

## Further reading

Before going through the rest of this documentation, please take some time to read the following documentation:

* [Package Development for Laravel](https://laravel.com/docs/packages)
* [Orchestra Testbench Documentation](/testbench)
* [Laravel Dusk Documentation](https://laravel.com/docs/dusk)


