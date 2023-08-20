# Define Routes

It is recommended for package to use define routes similar to Laravel such as `routes/web.php` etc. However if you have the requirement to define one or more routes just during test you can do so using the `defineRoutes()` method:

```php
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
## Using Annotation

You can also use `@define-route` annotation to customise use of `defineRoutes()` for specific test.

```php
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
