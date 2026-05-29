[vitend](../../README.md) / [vite](../README.md) / BuildOptions

# Type Alias: BuildOptions

```ts
type BuildOptions = Format<
  | Partial<Omit<CompleteDefaultBuildOptions, "https">> & object
| Pick<CompleteVercelBuildOptions, "target"> & Partial<Omit<CompleteVercelBuildOptions, "target">>>;
```

Defined in: [package/src/@types/options/default.ts:31](https://github.com/alpheusday/vitend/blob/a809174bccf4d2aa068f95484db3090dbf33634c/package/src/@types/options/default.ts#L31)

Build server options.
