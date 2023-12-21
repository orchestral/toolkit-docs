# Define Routes

It is recommended for a package to use defined routes similar to Laravel such as `routes/web.php` etc.

## `defineRoutes()` Method

If you need to add something early in the application bootstrapping process (which is executed between registering service providers and booting service providers) you could use the `defineRoute()` method:

```php{9-12}
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Define routes setup.
     *
     * @param  \Illuminate\Routing\Router  $router
     * @return void
     */
    protected function defineRoutes($router)
    {
        // Define routes.
    }
}
```

### Using Attribute

You can also use `Orchestra\Testbench\Attributes\DefineRoute` attribute to customize the use of `defineRoutes()` for specific tests.

```php{12-15,18}
use Orchestra\Testbench\Attributes\DefineRoute;
use PHPUnit\Framework\Attributes\Test;

class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Define routes setup.
     *
     * @param  \Illuminate\Routing\Router  $router
     * @return void
     */
    protected function usesAuthRoutes($router) 
    {
        // Load auth routes.
    }

    #[Test]
    #[DefineRoute('usesAuthRoutes')]
    public function it_does_load_auth_routes()
    {
        // 
    }

    /**
     * @test
     */
    public function it_doesnt_load_auth_routes()
    {
        //
    }
}
```

### Using Annotation

::: warning Deprecated

Annotation usage with PHPUnit has been mark as deprecated and will be removed in future versions.
:::

You can also use `@define-route` annotation to customize the use of `defineRoutes()` for specific tests.

```php{9-12,16}
class TestCase extends \Orchestra\Testbench\TestCase
{
    /**
     * Define routes setup.
     *
     * @param  \Illuminate\Routing\Router  $router
     * @return void
     */
    protected function usesAuthRoutes($router) 
    {
        // Load auth routes.
    }

    /**
     * @test
     * @define-route usesAuthRoutes
     */
    public function it_does_load_auth_routes()
    {
        // 
    }

    /**
     * @test
     */
    public function it_doesnt_load_auth_routes()
    {
        //
    }
}
```
