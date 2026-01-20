[vitend](../../README.md) / [index](../README.md) / ServerMiddleware

# Type Alias: ServerMiddleware()

```ts
type ServerMiddleware = (request, next) => Response | Promise<Response>;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:29

## Parameters

### request

[`ServerRequest`](../interfaces/ServerRequest.md)

### next

() => `Response` \| `Promise`\<`Response`\>

## Returns

`Response` \| `Promise`\<`Response`\>
