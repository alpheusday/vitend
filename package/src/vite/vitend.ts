import type { CopyEvent, Options as CopyOptions } from "rolldown-plugin-copy";
import type { Plugin } from "vite";

import type { VitendOptions } from "#/@types/options/default";
import type {
    ResolvedBuildOptions,
    ResolvedVitendOptions,
} from "#/@types/options/resolved";

import * as Path from "node:path";

import { copy } from "rolldown-plugin-copy";

import { log } from "#/configs/log";
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

    const plugins: Plugin[] = [
        devPlugin({
            ...opts,
        }),
        buildPlugin({
            ...opts,
        }),
    ];

    if (build.target === "default" && build.copyPublicDir) {
        const copyOptions: CopyOptions = {
            targets: [
                {
                    src: Path.posix.join(build.publicDir, "**", "*"),
                    dest: Path.posix.join(build.outputDir, build.publicDir),
                },
            ],
        };

        if (opts.verbose) {
            copyOptions.onStart = (): void => {
                console.log("");
                console.log("");
            };

            copyOptions.onCopy = (event: CopyEvent): void => {
                const src: string = Path.relative(opts.cwd, event.target.src);

                const dest: string = Path.relative(opts.cwd, event.target.dest);

                let message: string = `${src} → ${dest}`;

                const flags: string[] = [];

                if (event.target.renamed) {
                    flags.push("R");
                }

                if (event.target.transformed) {
                    flags.push("T");
                }

                if (flags.length > 0) {
                    message += ` [${flags.join(",")}]`;
                }

                log.success(message);
            };

            copyOptions.onEnd = (): void => {
                console.log("");
            };
        }

        plugins.push(copy(copyOptions) as Plugin);
    }

    return plugins;
};

export { vitend };
