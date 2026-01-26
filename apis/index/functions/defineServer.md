[vitend](../../README.md) / [index](../README.md) / defineServer

# Function: defineServer()

```ts
function defineServer(options): object;
```

Defined in: [package/src/functions/define.ts:20](https://github.com/alpheusday/vitend/blob/1ce91ee871c6f7bf5bcf70030f8d976386117b14/package/src/functions/define.ts#L20)

A function to define server options.

### Example

```ts
// ./src/index.ts

import { defineServer } from "vitend";

export default defineServer({
    fetch: (req: Request): Response => {
        return new Response("Hello, World!");
    },
});
```

## Parameters

### options

#### bun?

`Omit`\<`Options`\<`any`\>, `"fetch"`\>

Bun server options

**Docs**

https://bun.sh/docs/api/http

#### deno?

`any`

Deno server options

**Docs**

https://docs.deno.com/api/deno/~/Deno.serve

#### error?

`ErrorHandler`

Handle lifecycle errors.

**Note**

This handler will set built-in Bun and Deno error handler.

#### fetch

`ServerHandler`

The fetch handler handles incoming requests.

#### gracefulShutdown?

  \| `boolean`
  \| \{
  `forceTimeout?`: `number`;
  `gracefulTimeout?`: `number`;
\}

Graceful shutdown on SIGINT and SIGTERM signals.

Supported for Node.js, Deno and Bun runtimes.

**Default**

```ts
true (disabled in test and ci environments)
```

#### middleware?

`ServerMiddleware`[]

Server middleware handlers to run before the main fetch handler.

#### node?

(ServerOptions\<...\> \| ServerOptions\<...\> \| ServerOptions\<...\>) & ListenOptions & \{ ...; \}

Node.js server options.

#### plugins?

`ServerPlugin`[]

Server plugins.

#### reusePort?

`boolean`

Enabling this option allows multiple processes to bind to the same port, which is useful for load balancing.

**Note:** Despite Node.js built-in behavior that has `exclusive` flag (opposite of `reusePort`) enabled by default, srvx uses non-exclusive mode for consistency.

#### serviceWorker?

\{
  `scope?`: `string`;
  `url?`: `string`;
\}

Service worker options

#### serviceWorker.scope?

`string`

The scope of the service worker.

#### serviceWorker.url?

`string`

The path to the service worker file to be registered.

#### silent?

`boolean`

If set to `true`, server will not print the listening address.

## Returns

### bun?

```ts
optional bun: Omit<Options<any>, "fetch">;
```

Bun server options

#### Docs

https://bun.sh/docs/api/http

### deno?

```ts
optional deno: any;
```

Deno server options

#### Docs

https://docs.deno.com/api/deno/~/Deno.serve

### error?

```ts
optional error: ErrorHandler;
```

Handle lifecycle errors.

#### Note

This handler will set built-in Bun and Deno error handler.

### fetch

```ts
fetch: ServerHandler;
```

The fetch handler handles incoming requests.

### gracefulShutdown?

```ts
optional gracefulShutdown: 
  | boolean
  | {
  forceTimeout?: number;
  gracefulTimeout?: number;
};
```

Graceful shutdown on SIGINT and SIGTERM signals.

Supported for Node.js, Deno and Bun runtimes.

#### Default

```ts
true (disabled in test and ci environments)
```

### middleware?

```ts
optional middleware: ServerMiddleware[];
```

Server middleware handlers to run before the main fetch handler.

### node?

```ts
optional node: (ServerOptions<...> | ServerOptions<...> | ServerOptions<...>) & ListenOptions & { ...; };
```

Node.js server options.

### plugins?

```ts
optional plugins: ServerPlugin[];
```

Server plugins.

### reusePort?

```ts
optional reusePort: boolean;
```

Enabling this option allows multiple processes to bind to the same port, which is useful for load balancing.

**Note:** Despite Node.js built-in behavior that has `exclusive` flag (opposite of `reusePort`) enabled by default, srvx uses non-exclusive mode for consistency.

### serviceWorker?

```ts
optional serviceWorker: object;
```

Service worker options

#### serviceWorker.scope?

```ts
optional scope: string;
```

The scope of the service worker.

#### serviceWorker.url?

```ts
optional url: string;
```

The path to the service worker file to be registered.

### silent?

```ts
optional silent: boolean;
```

If set to `true`, server will not print the listening address.
