[vitend](../../README.md) / [vite](../README.md) / BuildOptions

# Type Alias: BuildOptions

```ts
type BuildOptions = Format<
  | Partial<Omit<CompleteDefaultBuildOptions, "https">> & object
| Pick<CompleteVercelBuildOptions, "target"> & Partial<Omit<CompleteVercelBuildOptions, "target">>>;
```

Defined in: [package/src/@types/options/default.ts:31](https://github.com/alpheusday/vitend/blob/f7bcd28f7a5a16e47ae930fac8863add9dec0214/package/src/@types/options/default.ts#L31)

Build server options.
