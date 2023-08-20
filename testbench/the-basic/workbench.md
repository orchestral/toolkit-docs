# Autoloading using `testbench.yaml`

Testbench will use the configuration values defined in `testbench.yaml` and use it's value when the `TestCase` class uses `Orchestra\Testbench\Concerns\WithWorkbench` trait:

```php
use Orchestra\Testbench\Concerns\WithWorkbench;


class TestCase extends \Orchestra\Testbench\TestCase 
{
    use WithWorkbench;
}
```

## Package Service Providers

Using `WithWorkbench` will make `TestCase` uses `providers` configuration value from `testbench.yaml`:

```yaml
providers:
  - Laravel\Sanctum\SanctumServiceProvider
  - Workbench\App\Providers\WorkbenchServiceProvider
```

## Using Custom Laravel Skeleton

Using `WithWorkbench` will make `TestCase` uses `laravel` configuration value from `testbench.yaml`:

```yaml
laravel: ./skeleton
```
