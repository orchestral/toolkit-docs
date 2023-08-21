# Troubleshooting

## Chrome versions

```
Facebook\WebDriver\Exception\SessionNotCreatedException: session not created: Chrome version must be between 70 and 73
```

If tests report following error, run the following command:

```bash
vendor/bin/dusk-updater update
```

Alternatively you can run the following command to detect installed ChromeDriver and auto update it if neccessary:

```bash
vendor/bin/dusk-updater detect --auto-update
```

## Running Dusk and standard testbench tests in same suite

You may encounter the error
`PHP Fatal error: Cannot declare class CreateUsersTable, because the name is already in use in...`
when using `loadLaravelMigrations()` with some of your test extending the Dusk test class `\Orchestra\Testbench\Dusk\TestCase` and others extend the "normal" test class `\Orchestra\Testbench\TestCase`.

The problem arises because migrations are loaded from both packages' "skeletons" during the same test run,
and Laravel's migration classes are not namespaced.

Make sure all integration tests in your test suite use the same Laravel skeleton (the one from `testbench-dusk`),
regardless of the base class they extend by overriding `applicationBasePath()` in your test classes.
Do the override in your base integration test class, or perhaps in a trait if you need it in multiple classes.

```php{8-12}
class DuskTestCase extends \Orchestra\Testbench\Dusk\TestCase 
{
    /**
     * Get Application base path.
     *
     * @return string
     */
    public static function applicationBasePath()
    {
        // Adjust this path depending on where your override is located.
        return __DIR__.'/../vendor/orchestra/testbench-dusk/laravel'; 
    }
}
```
