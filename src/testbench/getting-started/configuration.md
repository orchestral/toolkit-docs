# Configuration

Testbench utilised `phpunit.xml` configuration to setup environment variables value as global value for every tests.

[[toc]]

## Application Key

Most application would require `APP_KEY` to be defined in order to use encryption:

```xml
<phpunit>

    // ...

    <php>
        <env name="APP_KEY" value="AckfSECXIvnK5r28GVIWUAxmbBSjTsmF"/>
    </php>

</phpunit>
```

## In-Memory SQLite Connection

To reduce setup configuration, you could use `testing` database connection (`:memory:` with `sqlite` driver) by defining it under PHPUnit Configuration File:

```xml
<phpunit>

    // ...

    <php>
        <env name="DB_CONNECTION" value="testing"/>
    </php>

</phpunit>
```

Alternatively, you can also explicitly setting it up under `defineEnvironment()`.

## Application Timezone

You can also easily override application default timezone, instead of the default `"UTC"`:

```php
/**
 * Get application timezone.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return string|null
 */
protected function getApplicationTimezone($app)
{
    return 'Asia/Kuala_Lumpur';
}
```

## Using `.env` Environment Variables

By default Testbench will load `.env` file when booting the application. You can change to completely ignores `.env` file by setting `TestCase::$loadEnvironmentVariables` property to `false`:

```php
class TestCase extends \Orchestra\Testbench\TestCase
{
    protected $loadEnvironmentVariables = false;

    // 
}  
```

## Using Custom Laravel Skeleton

By default Testbench provide a basic Laravel Skeleton, however you may have a requirement to use custom skeleton, you can do that using `getBasePath()` method.

```php
/**
 * Get Application base path.
 *
 * @return string
 */
public static function applicationBasePath()
{
    return __DIR__.'/../skeleton';
}
```

::: tip FALLBACK METHOD

The method was only introduced in `v6.22.0`, if you need to override Laravel Skeleton on project before the release then override `getBasePath` method instead:

```php
/**
 * Get base path.
 *
 * @return string
 */
protected function getBasePath() 
{
    return __DIR__.'/../skeleton';
}
```
:::
