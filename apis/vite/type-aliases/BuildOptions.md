[vitend](../../README.md) / [vite](../README.md) / BuildOptions

# Type Alias: BuildOptions

```ts
type BuildOptions = Format<
  | Partial<Omit<CompleteDefaultBuildOptions, "https">> & object
| Pick<CompleteVercelBuildOptions, "target"> & Partial<Omit<CompleteVercelBuildOptions, "target">>>;
```

Defined in: [package/src/@types/options/default.ts:31](https://github.com/alpheusday/vitend/blob/214ed2237f524a58ab3b0f0e24ec9ebf70a03269/package/src/@types/options/default.ts#L31)

Build server options.
