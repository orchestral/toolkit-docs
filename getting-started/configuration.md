# Configuration

The Packages Toolkit for Laravel uses `testbench.yaml` as configuration file where you can define the following schemas to be used within `testbench` CLI or Workbench environment:

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

You can use `laravel` configuration key to set custom location instead of using the default `vendor/orchestra/testbench-core/laravel`:

```yaml
provider: ./skeleton
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

## Workbench Configuration

### Example

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
