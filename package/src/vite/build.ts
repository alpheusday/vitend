import type { LoadResult, ResolveIdResult } from "rollup";
import type { Plugin, UserConfig } from "vite";

import type { CompleteVitendOptions } from "#/@types/options";
import type { PackageJson } from "#/functions/package-json";

import { builtinModules } from "node:module";

import { toMerged } from "es-toolkit";

import { getPackageJson } from "#/functions/package-json";

const VIRTUAL_ENTRY = "virtual:vitend-entry" as const;

const VIRTUAL_ENTRY_RESOLVED = `\0${VIRTUAL_ENTRY}` as const;

const buildPlugin = (opts: CompleteVitendOptions): Plugin => {
    const packageJson: PackageJson = getPackageJson(opts.cwd);

    return {
        name: "vitend/build",
        apply: "build",
        config: (config: UserConfig): UserConfig => {
            let result: UserConfig = {};

            const baseConfig: UserConfig = {
                ssr: {
                    external: true,
                    noExternal: void 0,
                    target: "webworker",
                },
                build: {
                    copyPublicDir: false,
                },
            };

            result = toMerged(baseConfig, config);

            const overrideConfig: UserConfig = {
                build: {
                    ssr: true,
                    outDir: opts.outputDir,
                    rollupOptions: {
                        input: VIRTUAL_ENTRY,
                        output: {
                            entryFileNames: opts.outputFile,
                            format:
                                packageJson.type === "module" ? "esm" : "cjs",
                        },
                        external: [
                            ...builtinModules,
                            /^node:/,
                        ],
                    },
                    minify: opts.minify,
                },
            };

            result = toMerged(result, overrideConfig);

            return result;
        },
        resolveId: (id: string): ResolveIdResult => {
            if (id !== VIRTUAL_ENTRY) return void 0;
            return VIRTUAL_ENTRY_RESOLVED;
        },
        load: async (id: string): Promise<LoadResult> => {
            if (id !== VIRTUAL_ENTRY_RESOLVED) return void 0;

            let code: string = "";

            code += `import app from "${opts.entry}";`;
            code += `import { serve } from "vitend/runtime";`;
            code += `serve(app);`;

            return code;
        },
    };
};

export { buildPlugin };
