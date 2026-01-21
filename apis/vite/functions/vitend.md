[vitend](../../README.md) / [vite](../README.md) / vitend

# Function: vitend()

```ts
function vitend(options?): Plugin$1<any>[];
```

Defined in: [package/src/vite/vitend.ts:35](https://github.com/alpheusday/vitend/blob/c5b143cbcac38e846d4ae7a90ad4c69970df75d3/package/src/vite/vitend.ts#L35)

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

\{
  `copyPublicDir?`: `boolean`;
  `host?`: `string`;
  `https?`: \{
     `cert?`: `string`;
     `key?`: `string`;
     `passphrase?`: `string`;
  \};
  `minify?`: `boolean`;
  `outputDir?`: `string`;
  `outputFile?`: `string`;
  `port?`: `number`;
  `publicDir?`: `string`;
\}

The options for the production server.

#### build.copyPublicDir?

`boolean`

Whether to copy the public directory to the output directory.

When this is `true`, the public directory will be copied
into the directory with same name inside the output directory.

By default, it is `false`.

#### build.host?

`string`

The host for the production server.

By default, it is `localhost`.

#### build.https?

\{
  `cert?`: `string`;
  `key?`: `string`;
  `passphrase?`: `string`;
\}

HTTPS server options.

#### build.https.cert?

`string`

File path or inlined TLS certificate in PEM format (required).

#### build.https.key?

`string`

File path or inlined TLS private key in PEM format (required).

#### build.https.passphrase?

`string`

Passphrase for the private key (optional).

#### build.minify?

`boolean`

Whether to minify the output.

By default, it is `false`.

#### build.outputDir?

`string`

The output directory for the application.

By default, it is `./dist`.

#### build.outputFile?

`string`

The output file name for the application.

By default, it is `index.js`.

#### build.port?

`number`

The port number for the production server.

By default, it is `3000`.

#### build.publicDir?

`string`

The public directory for the application.

By default, it is `./public`.

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
