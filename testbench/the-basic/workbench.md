### Autoloading using `testbench.yaml`

Testbench will use the configuration values defined in `testbench.yaml` and use it's value when the `TestCase` class uses `Orchestra\Testbench\Concerns\WithWorkbench` trait:

```php
use Orchestra\Testbench\Concerns\WithWorkbench;


class TestCase extends \Orchestra\Testbench\TestCase 
{
    use WithWorkbench;
}
```

Using `WithWorkbench` will make `TestCase` uses `laravel` configuration value from `testbench.yaml`:

```yaml
laravel: ./skeleton
```
