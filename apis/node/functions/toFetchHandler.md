[vitend](../../README.md) / [node](../README.md) / toFetchHandler

# Function: toFetchHandler()

```ts
function toFetchHandler(handler): FetchHandler & AdapterMeta;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/adapters/node.d.mts:73

**`Experimental`**

Converts a Node.js HTTP handler into a Fetch API handler.

 Behavior might be unstable and won't work in Bun and Deno currently (tracker: https://github.com/h3js/srvx/issues/132)

## Parameters

### handler

`NodeHttpHandler` & `AdapterMeta`

## Returns

`FetchHandler` & `AdapterMeta`
