[vitend](../../README.md) / [vite](../README.md) / BuildOptions

# Type Alias: BuildOptions

```ts
type BuildOptions = Format<
  | Partial<Omit<CompleteDefaultBuildOptions, "https">> & object
| Pick<CompleteVercelBuildOptions, "target"> & Partial<Omit<CompleteVercelBuildOptions, "target">>>;
```

Defined in: [package/src/@types/options/default.ts:31](https://github.com/alpheusday/vitend/blob/ce62a943649ae6da57fe6983bf9135199ad72979/package/src/@types/options/default.ts#L31)

Build server options.
