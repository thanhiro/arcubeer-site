# Serverless Arcusys Snobby Beer Club Site on Azure

## Requirements:

  * Node.js 9+
  * yarn

First:
`yarn`

## Setting up your Azure credentials

Once the yarn dependencies are installed, it expects to find your Azure credentials via a set of well-known environment variables. These will be used to actually authenticate with your Azure account, so that the Serverless CLI can generate the necessary Azure resources on your behalf when you request a deployment (see below).

The following environment variables must be set, with their respective values:

- *azureSubId* - ID of the Azure subscription you want to create your service within
- *azureServicePrincipalTenantId* - ID of the tenant that your service principal was created within
- *azureServicePrincipalClientId* - ID of the service principal you want to use to authenticate with Azure
- *azureServicePrincipalPassword* - Password of the service principal you want to use to authenticate with Azure

For details on how to create a service principal and/or acquire your Azure account's subscription/tenant ID, refer to the [Azure credentials](https://serverless.com/framework/docs/providers/azure/guide/credentials/) documentation.

## Deploying the service

Once your Azure credentials are set, you can immediately deploy your service via the following command:

```shell
serverless deploy
```

This will create the necessary Azure resources to support the service and events that are defined in your `serverless.yml` file.

## Invoking and inspecting a function

With the service deployed, you can test it's functions using the following command:

```shell
serverless invoke -f hello
```

Additionally, if you'd like to view the logs that a function generates (either via the runtime, or create by your handler by calling `context.log`), you can simply run the following command:

```shell
serverless logs -f hello
```

## Cleaning up

Once you're finished with your service, you can remove all of the generated Azure resources by simply running the following command:

```shell
serverless remove
```
