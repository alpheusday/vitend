import type { Plugin } from "vite";

import type { TempDir } from "#/helper/temp-dir";

import { vitend } from "vitend/vite";
import { afterEach, describe, expect, it } from "vitest";

import { createTempDir } from "#/helper/temp-dir";

const tempDirs: TempDir[] = [];

const createProject = (): TempDir => {
    const project: TempDir = createTempDir();

    tempDirs.push(project);

    project.writeJson("package.json", {
        type: "module",
    });
    project.writeFile(
        "src/index.ts",
        `export default { fetch: (_request: Request): Response => new Response("ok") };`,
    );

    return project;
};

afterEach((): void => {
    for (const project of tempDirs) {
        project.cleanup();
    }

    tempDirs.length = 0;
});

describe("vitend", (): void => {
    it("should returns the development and build plugins by default", (): void => {
        const project: TempDir = createProject();

        const plugins: Plugin[] = vitend({
            cwd: project.cwd,
        });

        expect(plugins.map((plugin: Plugin): string => plugin.name)).toEqual([
            "vitend/dev",
            "vitend/build",
        ]);
    });

    it("should adds the copy plugin when public assets should be copied", (): void => {
        const project: TempDir = createProject();

        const plugins: Plugin[] = vitend({
            cwd: project.cwd,
            build: {
                copyPublicDir: true,
            },
        });

        expect(plugins.map((plugin: Plugin): string => plugin.name)).toEqual([
            "vitend/dev",
            "vitend/build",
            "rolldown-plugin-copy",
        ]);
    });

    it("should does not add the copy plugin for vercel builds", (): void => {
        const project: TempDir = createProject();

        const plugins: Plugin[] = vitend({
            cwd: project.cwd,
            build: {
                target: "vercel",
            },
        });

        expect(plugins.map((plugin: Plugin): string => plugin.name)).toEqual([
            "vitend/dev",
            "vitend/build",
        ]);
    });

    it("should adds the copy plugin with verbose logging when verbose is enabled", (): void => {
        const project: TempDir = createProject();

        const plugins: Plugin[] = vitend({
            cwd: project.cwd,
            build: {
                copyPublicDir: true,
            },
            verbose: true,
        });

        expect(plugins.map((plugin: Plugin): string => plugin.name)).toEqual([
            "vitend/dev",
            "vitend/build",
            "rolldown-plugin-copy",
        ]);
    });
});
