# Configuration

The Packages Toolkit for Laravel uses `testbench.yaml` as a configuration file where you can define the following schemas to be used within `testbench` CLI or Workbench environment:

 Name            | Type      | Description
:----------------|:----------|:--------------------
 `laravel`       | `string`  | Set the path to Laravel skeleton.
 `providers`     | `array`   | Set of Service Provider classes to be loaded.
 `dont-discover` | `array`   | List of packages to be ignored.
 `bootstrappers` | `array`   | Set of bootstrapper classes to be loaded.
 `env`           | `array`   | Set environment variables to be loaded under `testbench` CLI.
 `purge`         | `array`   | Configurable `files` and `directories` to be pruned via `package:purge-skeleton` command.
 `workbench`     | Object    | See [Workbench configuration](#workbench-configuration) for detail.

 [[toc]]

## Basic Usages

In order for the `testbench` command to understand any required service providers, bootstrappers, environment variables or other options to be used when executing the "artisan" command you need to add the following `testbench.yaml` file on the project root directory.

```yaml
providers:
  - Laravel\Passport\PassportServiceProvider

dont-discover: 
  - laravel/sanctum
```

### Laravel Skeleton

You can use `laravel` configuration key to set a custom location instead of using the default `vendor/orchestra/testbench-core/laravel`:

```yaml
laravel: ./skeleton
```

### Service Providers

You can use `providers` configuration key to set an array of service providers to be loaded:

```yaml 
providers:
  - Laravel\Sanctum\SanctumServiceProvider
  - Workbench\App\Providers\WorkbenchServiceProvider
``` 

### Exclude Packages

Alternatively, you can also use `dont-discover` to exclude specific packages from being loaded:

```yaml
dont-discover:
  - laravel/html
```

### Environment Variables

You can use `env` configuration key to set an array of environment variables to be loaded under `testbench` CLI:

```yaml
env:
  - SEND_QUERIES_TO_RAY=(false)
```

::: warning `env` limitation
The `env` environment variables is only applied when using the CLI and will not be used when running tests.
:::

### Workbench Configuration

You can use `workbench` configuration key to set to enable Workbench integration on your Laravel packages.

 Name            | Type          | Description
:----------------|:--------------|:--------------------
 `welcome`       | `bool`        | Show the default Laravel welcome page when accessing `/` via `serve` command.
 `install`       | `bool`        | Run Laravel default migrations. 
 `start`         | `string`      | Set the default route when opening `/` path via `serve` command.
 `user`          | `string\|int` | Set the user ID or email to automatically logged-in when accessing `/` via `serve` command (only when accessing as a guest).
 `guard`         | `string`      | Set the default Auth Guard to automatically authenticate `user` value.
 `sync`          | `array`       | Set a collection to create symlink between `from` and `to` value via `serve` command.
 `build`         | `array`       | Set a collection of build recipes or command to be execute when running `workbench:build` command.
 `assets`        | `array`       | Set a collection of `tag` used in `vendor:publish` to be use with `asset-publish` recipe when running `workbench:build` command.
 
#### Example

```yaml
workbench:
  welcome: true
  install: true
  start: /nova
  user: taylor@laravel.com
  guard: web
  sync:
    - from: ./public/
      to: public/vendor/nova
  build:
    - asset-publish
    - create-sqlite-db
    - migrate:refresh
  assets:
    - nova-assets
```
