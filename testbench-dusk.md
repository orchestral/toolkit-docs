---
prev: false
next: 
  text: 'The Basic'
  link: '/testbench/the-basic'
---

# Introduction

Testbench simplify the process to create feature and integration tests for your Laravel's packages without massive configuration and build steps. 

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

Please refer to [Configuration](/getting-started/configuration) documenation for futher details.

## Getting Started

To use Testbench Dusk Component, all you need to do is extend `Orchestra\Testbench\Dusk\TestCase` instead of `PHPUnit\Framework\TestCase`. The fixture `app` booted by `Orchestra\Testbench\Dusk\TestCase` is predefined to follow the base application skeleton of Laravel.

```php{1}
class TestCase extends \Orchestra\Testbench\Dusk\TestCase
{
    //
}
```

### Autoloading using `testbench.yaml`

Testbench will use the configuration values defined in `testbench.yaml` and use it's value when the `TestCase` class uses `Orchestra\Testbench\Concerns\WithWorkbench` trait:

```php{1,5}
use Orchestra\Testbench\Concerns\WithWorkbench;

class TestCase extends \Orchestra\Testbench\Dusk\TestCase 
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

