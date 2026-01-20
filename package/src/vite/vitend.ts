import type { Plugin } from "vite";

import type { CompleteVitendOptions, VitendOptions } from "#/@types/options";

import * as Path from "node:path";

import copy from "rollup-plugin-copy";

import { createOptions } from "#/functions/options";
import { buildPlugin } from "#/vite/build";
import { devPlugin } from "#/vite/dev";

/**
 * The `vitend` plugin.
 */
const vitend = (options?: VitendOptions): Plugin[] => {
    const opts: CompleteVitendOptions = createOptions(options);

    return [
        devPlugin({
            ...opts,
        }),
        buildPlugin({
            ...opts,
        }),
        ...(opts?.copyPublicDir
            ? [
                  copy({
                      hook: "closeBundle",
                      targets: [
                          {
                              src: Path.resolve(opts.publicDir, "**", "*"),
                              dest: Path.resolve(
                                  opts.outputDir,
                                  opts.publicDir,
                              ),
                          },
                      ],
                  }),
              ]
            : []),
    ];
};

export { vitend };
