# Integrations

Testbench hopes to provide a complete solution for package developments, in latest version we now support direct integrations with following 3rd party packages:

## Spatie Ray

Starting from Testbench 6.10 you may now use Ray debugging tool directly when running tests. 

```php
    /** @test */
    public function it_can_resolve_domain_route()
    {
        $response = $this->get('http://api.localhost/hello');

        ray($response);
    }
```

![Ray Example](./img/ray-example.png)

## Collision

You can also utilise Collision with Testbench to use Laravel flavored artisan test command, including parallel testing. First of all include `nunomaduro/collision` to your package:

```
composer require --dev "nunomaduro/collision"
```

After installation complete and `package:discover` executed you should be able to use `package:test` command directly from Testbench CLI Commander:

```
composer exec testbench package:test
```

![Collision Example](./img/collision-example.gif)

:::tip Support for Parallel Testing 

With `package:test` you are able to use `--parallel` options to use Parallel Testing. However do review [Laravel documentation](https://laravel.com/docs/8.x/testing#running-tests-in-parallel) regarding the subject.
:::

![Parallel Example](./img/parallel-example.gif)

> Recommended minimum version to use parallel testing is `6.15.0`
