import type { Plugin } from "vite";

import type { VitendOptions } from "#/@types/options/default";
import type {
    ResolvedBuildOptions,
    ResolvedVitendOptions,
} from "#/@types/options/resolved";

import * as Path from "node:path";

import copy from "rollup-plugin-copy";

import { createOptions } from "#/functions/options";
import { buildPlugin } from "#/vite/build";
import { devPlugin } from "#/vite/dev";

/**
 * The `vitend` plugin.
 *
 * ### Example
 *
 * ```ts
 * // ./vite.config.ts
 *
 * import { defineConfig } from "vite";
 * import { vitend } from "vitend/vite";
 *
 * export default defineConfig({
 *     plugins: [
 *         vitend(),
 *     ],
 * });
 * ```
 */
const vitend = (options?: VitendOptions): Plugin[] => {
    const opts: ResolvedVitendOptions = createOptions(options);

    const build: ResolvedBuildOptions = opts.build;

    return [
        devPlugin({
            ...opts,
        }),
        buildPlugin({
            ...opts,
        }),
        ...(build.mode === "default" && build.copyPublicDir
            ? [
                  copy({
                      hook: "closeBundle",
                      targets: [
                          {
                              src: Path.resolve(build.publicDir, "**", "*"),
                              dest: Path.resolve(
                                  build.outputDir,
                                  build.publicDir,
                              ),
                          },
                      ],
                  }),
              ]
            : []),
    ];
};

export { vitend };
