[vitend](../../README.md) / [index](../README.md) / ServerOptions

# Interface: ServerOptions

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:34

Server options

## Properties

### bun?

```ts
optional bun: Omit<Options<any>, "fetch">;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:130

Bun server options

#### Docs

https://bun.sh/docs/api/http

***

### deno?

```ts
optional deno: any;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:136

Deno server options

#### Docs

https://docs.deno.com/api/deno/~/Deno.serve

***

### error?

```ts
optional error: ErrorHandler;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:44

Handle lifecycle errors.

#### Note

This handler will set built-in Bun and Deno error handler.

***

### fetch

```ts
fetch: ServerHandler;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:38

The fetch handler handles incoming requests.

***

### gracefulShutdown?

```ts
optional gracefulShutdown: 
  | boolean
  | {
  forceTimeout?: number;
  gracefulTimeout?: number;
};
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:98

Graceful shutdown on SIGINT and SIGTERM signals.

Supported for Node.js, Deno and Bun runtimes.

#### Default

```ts
true (disabled in test and ci environments)
```

***

### hostname?

```ts
optional hostname: string;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:72

The hostname (IP or resolvable host) server listener should bound to.

When not provided, server with listen to all network interfaces by default.

**Important:** If you are running a server that is not expected to be exposed to the network, use `hostname: "localhost"`.

***

### manual?

```ts
optional manual: boolean;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:56

If set to `true`, server will not start listening automatically.

***

### middleware?

```ts
optional middleware: ServerMiddleware[];
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:48

Server middleware handlers to run before the main fetch handler.

***

### node?

```ts
optional node: (ServerOptions<...> | ServerOptions<...> | ServerOptions<...>) & ListenOptions & { ...; };
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:122

Node.js server options.

***

### plugins?

```ts
optional plugins: ServerPlugin[];
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:52

Server plugins.

***

### port?

```ts
optional port: string | number;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:64

The port server should be listening to.

Default is read from `PORT` environment variable or will be `3000`.

**Tip:** You can set the port to `0` to use a random port.

***

### protocol?

```ts
optional protocol: "https" | "http";
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:86

The protocol to use for the server.

Possible values are `http` and `https`.

If `protocol` is not set, Server will use `http` as the default protocol or `https` if both `tls.cert` and `tls.key` options are provided.

***

### reusePort?

```ts
optional reusePort: boolean;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:78

Enabling this option allows multiple processes to bind to the same port, which is useful for load balancing.

**Note:** Despite Node.js built-in behavior that has `exclusive` flag (opposite of `reusePort`) enabled by default, srvx uses non-exclusive mode for consistency.

***

### serviceWorker?

```ts
optional serviceWorker: object;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:140

Service worker options

#### scope?

```ts
optional scope: string;
```

The scope of the service worker.

#### url?

```ts
optional url: string;
```

The path to the service worker file to be registered.

***

### silent?

```ts
optional silent: boolean;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:90

If set to `true`, server will not print the listening address.

***

### tls?

```ts
optional tls: object;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:105

TLS server options.

#### cert?

```ts
optional cert: string;
```

File path or inlined TLS certificate in PEM format (required).

#### key?

```ts
optional key: string;
```

File path or inlined TLS private key in PEM format (required).

#### passphrase?

```ts
optional passphrase: string;
```

Passphrase for the private key (optional).
