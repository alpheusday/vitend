[vitend](../../README.md) / [vite](../README.md) / vitend

# Function: vitend()

```ts
function vitend(options?): Plugin$1<any>[];
```

Defined in: [package/src/vite/vitend.ts:16](https://github.com/alpheusday/vitend/blob/5e90fba2ebec2a9a70aae9baa6b523b04f20fbae/package/src/vite/vitend.ts#L16)

The `vitend` plugin.

## Parameters

### options?

#### copyPublicDir?

`boolean`

Whether to copy the public directory to the output directory.

When this is `true`, the public directory will be copied
into the directory with same name inside the output directory.

By default, it is `false`.

#### cwd?

`string`

The current working directory.

By default, it is `process.cwd()`.

#### entry?

`string`

The entry file for the application.

By default, it is `./src/index.ts` or `./src/index.js`.

#### minify?

`boolean`

Whether to minify the output.

By default, it is `false`.

#### outputDir?

`string`

The output directory for the application.

By default, it is `./dist`.

#### outputFile?

`string`

The output file name for the application.

By default, it is `index.js`.

#### publicDir?

`string`

The public directory for the application.

By default, it is `./public`.

## Returns

`Plugin$1`\<`any`\>[]
