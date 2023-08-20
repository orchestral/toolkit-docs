# Command-line Interface

Testbench provides support for command line tool equivalent to `artisan` command where you can interact directly with the stub Laravel application. 

For example instead of refreshing the database on every tests you may now seed the database before running `phpunit`, using:

```bash
vendor/bin/testbench migrate
```

or, you can setup the application such as installing Passport:

```bash
vendor/bin/testbench passport:install
```

Both commands allows you to setup the testing environment where before you only able to setup manually on every `TestCase::setUp()`. 

While the `testbench` CLI was originally designed to help testing, you might be able to run other feature to help package development such as running `ide-helper:models` etc.

::: warning NOTES & CONSIDERATIONS

The command wouldn't work for file stubbing as the generated file will be based on the booted Laravel application and not your package directories.
:::
