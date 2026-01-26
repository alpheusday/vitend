[vitend](../../README.md) / [vite](../README.md) / vitend

# Function: vitend()

```ts
function vitend(options?): Plugin$1<any>[];
```

Defined in: [package/src/vite/vitend.ts:35](https://github.com/alpheusday/vitend/blob/1ce91ee871c6f7bf5bcf70030f8d976386117b14/package/src/vite/vitend.ts#L35)

The `vitend` plugin.

### Example

```ts
// ./vite.config.ts

import { defineConfig } from "vite";
import { vitend } from "vitend/vite";

export default defineConfig({
    plugins: [
        vitend(),
    ],
});
```

## Parameters

### options?

#### build?

[`BuildOptions`](../type-aliases/BuildOptions.md)

The options for the production server.

#### cwd?

`string`

The current working directory.

By default, it is `process.cwd()`.

#### dev?

\{
  `host?`: `string`;
  `https?`: \{
     `cert?`: `string`;
     `key?`: `string`;
     `passphrase?`: `string`;
  \};
  `port?`: `number`;
\}

The options for the development server.

#### dev.host?

`string`

The host for the development server.

By default, it is `localhost`.

#### dev.https?

\{
  `cert?`: `string`;
  `key?`: `string`;
  `passphrase?`: `string`;
\}

HTTPS server options.

#### dev.https.cert?

`string`

File path or inlined TLS certificate in PEM format (required).

#### dev.https.key?

`string`

File path or inlined TLS private key in PEM format (required).

#### dev.https.passphrase?

`string`

Passphrase for the private key (optional).

#### dev.port?

`number`

The port number for the development server.

By default, it is `3001`.

#### entry?

`string`

The entry file for the application.

By default, it is `./src/index.ts` or `./src/index.js`.

## Returns

`Plugin$1`\<`any`\>[]
