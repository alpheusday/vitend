import type {
    BuildEnvironmentOptions,
    Plugin,
    SSROptions,
    UserConfig,
} from "vite";

import type { TempDir } from "#/helper/temp-dir";
import type { ResolvedVitendOptions } from "#vitend/@types/options/resolved";

import { builtinModules } from "node:module";

import { afterEach, describe, expect, it } from "vitest";

import { createTempDir } from "#/helper/temp-dir";
import { buildPlugin } from "#vitend/vite/build";

const tempDirs: TempDir[] = [];

const createProject = (
    packageJson: Record<string, unknown>,
): {
    project: TempDir;
    options: ResolvedVitendOptions;
} => {
    const project: TempDir = createTempDir();

    tempDirs.push(project);

    project.writeJson("package.json", packageJson);

    const entry: string = project.writeFile("src/index.ts");

    return {
        project,
        options: {
            cwd: project.cwd,
            entry,
            dev: {
                host: "localhost",
                port: 3001,
            },
            build: {
                target: "default",
                host: "localhost",
                port: 3000,
                outputDir: "./dist",
                outputFile: "index.js",
                minify: false,
                publicDir: "./public",
                copyPublicDir: false,
            },
        },
    };
};

afterEach((): void => {
    for (const project of tempDirs) {
        project.cleanup();
    }

    tempDirs.length = 0;
});

describe("buildPlugin", (): void => {
    it("should builds ESM output when the package type is module", (): void => {
        const { options } = createProject({
            type: "module",
        });

        const plugin: Plugin = buildPlugin(options);

        expect(plugin.name).toBe("vitend/build");
        expect(plugin.apply).toBe("build");

        const config = plugin.config?.({
            ssr: {
                noExternal: [
                    "custom-package",
                ],
            },
        }) as UserConfig;

        const build = config.build as BuildEnvironmentOptions;

        const ssr = config.ssr as SSROptions;

        const rollupOptions = build.rollupOptions as {
            input: string;
            output: {
                entryFileNames: string;
                format: string;
            };
            external: Array<string | RegExp>;
        };

        expect(ssr).toMatchObject({
            external: true,
            noExternal: [
                "custom-package",
            ],
            target: "webworker",
        });
        expect(build).toMatchObject({
            ssr: true,
            copyPublicDir: false,
            outDir: "./dist",
            minify: false,
        });
        expect(rollupOptions.input).toBe("virtual:vitend-entry");
        expect(rollupOptions.output).toEqual({
            entryFileNames: "index.js",
            format: "esm",
        });
        expect(rollupOptions.external).toEqual(
            expect.arrayContaining([
                ...builtinModules,
            ]),
        );
        expect(String(rollupOptions.external.at(-1))).toBe("/^node:/");
    });

    it("should falls back to CommonJS output when the package type is not module", (): void => {
        const { options } = createProject({});

        const plugin: Plugin = buildPlugin(options);

        const config = plugin.config?.({}) as UserConfig;

        const build = config.build as BuildEnvironmentOptions;

        const rollupOptions = build.rollupOptions as {
            output: {
                format: string;
            };
        };

        expect(rollupOptions.output.format).toBe("cjs");
    });

    it("should resolves and loads the virtual entry for the default target", async (): Promise<void> => {
        const { options } = createProject({
            type: "module",
        });

        const plugin = buildPlugin({
            ...options,
            build: {
                ...options.build,
                host: "0.0.0.0",
                port: 8080,
                https: {
                    cert: "CERT",
                    key: "KEY",
                    passphrase: "SECRET",
                },
            },
        });

        expect(plugin.resolveId?.("virtual:vitend-entry")).toBe(
            "\0virtual:vitend-entry",
        );
        expect(plugin.resolveId?.("virtual:other-entry")).toBeUndefined();

        const code = await plugin.load?.("\0virtual:vitend-entry");

        expect(code).toContain(`import options from "${options.entry}";`);
        expect(code).toContain(`import { serve } from "vitend/runtime";`);
        expect(code).toContain("serve({");
        expect(code).toContain("...options,");
        expect(code).toContain(`hostname: "0.0.0.0",`);
        expect(code).toContain("port: 8080,");
        expect(code).toContain('cert: "CERT",');
        expect(code).toContain('key: "KEY",');
        expect(code).toContain('passphrase: "SECRET",');
        expect(code).not.toContain("export default server;");
        expect(await plugin.load?.("virtual:other-entry")).toBeUndefined();
    });

    it("should loads the vercel adapter entry for the vercel target", async (): Promise<void> => {
        const { options } = createProject({
            type: "module",
        });

        const plugin = buildPlugin({
            ...options,
            build: {
                target: "vercel",
                outputDir: "./api",
                outputFile: "index.js",
                minify: true,
            },
        });

        const code = await plugin.load?.("\0virtual:vitend-entry");

        expect(code).toContain(`import options from "${options.entry}";`);
        expect(code).toContain(`import { serve } from "vitend/runtime";`);
        expect(code).toContain(
            "const server = serve({ ...options, manual: true });",
        );
        expect(code).toContain("export default server;");
        expect(code).not.toContain("hostname:");
        expect(code).not.toContain("tls:");
    });
});
