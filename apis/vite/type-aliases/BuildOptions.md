[vitend](../../README.md) / [vite](../README.md) / BuildOptions

# Type Alias: BuildOptions

```ts
type BuildOptions = Format<
  | Partial<Omit<CompleteDefaultBuildOptions, "https">> & object
| Pick<CompleteVercelBuildOptions, "target"> & Partial<Omit<CompleteVercelBuildOptions, "target">>>;
```

Defined in: [package/src/@types/options/default.ts:31](https://github.com/alpheusday/vitend/blob/1ce91ee871c6f7bf5bcf70030f8d976386117b14/package/src/@types/options/default.ts#L31)

Build server options.
