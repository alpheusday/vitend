import type { LoadResult, ResolveIdResult } from "rollup";
import type { Plugin, UserConfig } from "vite";

import type {
    ResolvedBuildOptions,
    ResolvedVitendOptions,
} from "#/@types/options/resolved";
import type { PackageJson } from "#/functions/package-json";

import { builtinModules } from "node:module";

import { toMerged } from "es-toolkit";

import { getPackageJson } from "#/functions/package-json";

const VIRTUAL_ENTRY = "virtual:vitend-entry" as const;

const VIRTUAL_ENTRY_RESOLVED = `\0${VIRTUAL_ENTRY}` as const;

const buildPlugin = (opts: ResolvedVitendOptions): Plugin => {
    const build: ResolvedBuildOptions = opts.build;

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
                    outDir: build.outputDir,
                    rollupOptions: {
                        input: VIRTUAL_ENTRY,
                        output: {
                            entryFileNames: build.outputFile,
                            format:
                                packageJson.type === "module" ? "esm" : "cjs",
                        },
                        external: [
                            ...builtinModules,
                            /^node:/,
                        ],
                    },
                    minify: build.minify,
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

            code += `import options from "${opts.entry}";`;
            code += `import { serve } from "vitend/runtime";`;

            // vercel export

            if (build.target === "vercel") {
                code += `const server = serve({ ...options, manual: true });`;
                code += `export default server;`;

                return code;
            }

            // default export

            code += `serve({`;
            code += `...options,`;

            if (build.host !== "localhost")
                code += `hostname: "${build.host}",`;
            if (build.port !== 3000) code += `port: ${build.port},`;

            if (build.https) {
                code += `tls: {`;
                if (build.https.cert) code += `cert: "${build.https.cert}",`;
                if (build.https.key) code += `key: "${build.https.key}",`;
                if (build.https.passphrase)
                    code += `passphrase: "${build.https.passphrase}",`;
                code += `},`;
            }

            code += `});`;

            return code;
        },
    };
};

export { buildPlugin };
