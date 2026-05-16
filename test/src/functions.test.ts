import type { TempDir } from "#/helper/temp-dir";

import { afterEach, describe, expect, it } from "vitest";

import { createTempDir } from "#/helper/temp-dir";
import { getEntry } from "#vitend/functions/entry";
import { createOptions } from "#vitend/functions/options";
import { getPackageJson } from "#vitend/functions/package-json";

const tempDirs: TempDir[] = [];

const createProject = (): TempDir => {
    const project: TempDir = createTempDir();

    tempDirs.push(project);

    return project;
};

afterEach((): void => {
    for (const project of tempDirs) {
        project.cleanup();
    }

    tempDirs.length = 0;
});

describe("getEntry", (): void => {
    it("should resolves an explicit entry relative to the project root", (): void => {
        const project: TempDir = createProject();
        const entry: string = project.writeFile("server/main.ts");

        expect(getEntry(project.cwd, "./server/main.ts")).toBe(entry);
    });

    it("should should prefers the default TypeScript entry when present", (): void => {
        const project: TempDir = createProject();
        const entry: string = project.writeFile("src/index.ts");

        project.writeFile("src/index.js");

        expect(getEntry(project.cwd)).toBe(entry);
    });

    it("should falls back to the default JavaScript entry", (): void => {
        const project: TempDir = createProject();
        const entry: string = project.writeFile("src/index.js");

        expect(getEntry(project.cwd)).toBe(entry);
    });

    it("should throws when no default entry exists", (): void => {
        const project: TempDir = createProject();

        expect((): string => getEntry(project.cwd)).toThrowError(
            "No entry file found",
        );
    });
});

describe("getPackageJson", (): void => {
    it("should reads and parses the package manifest", (): void => {
        const project: TempDir = createProject();

        project.writeJson("package.json", {
            type: "module",
            dependencies: {
                vitend: "workspace:*",
            },
        });

        expect(getPackageJson(project.cwd)).toEqual({
            type: "module",
            dependencies: {
                vitend: "workspace:*",
            },
        });
    });

    it("should throws when the package manifest is missing", (): void => {
        const project: TempDir = createProject();

        expect((): ReturnType<typeof getPackageJson> => {
            return getPackageJson(project.cwd);
        }).toThrowError("Failed to find package.json");
    });
});

describe("createOptions", (): void => {
    it("should applies the default target options and resolves the entry path", (): void => {
        const project: TempDir = createProject();
        const entry: string = project.writeFile("src/index.ts");

        const result = createOptions({
            cwd: project.cwd,
            dev: {
                port: 4100,
            },
            build: {
                host: "0.0.0.0",
                copyPublicDir: true,
            },
        });

        expect(result).toEqual({
            cwd: project.cwd,
            entry,
            runtime: "node",
            dev: {
                host: "localhost",
                port: 4100,
            },
            build: {
                target: "default",
                host: "0.0.0.0",
                port: 3000,
                bundle: "external",
                outputDir: "./dist",
                outputFile: "index.js",
                minify: false,
                publicDir: "./public",
                copyPublicDir: true,
            },
        });
    });

    it("should switches to the vercel defaults when that target is selected", (): void => {
        const project: TempDir = createProject();
        const entry: string = project.writeFile("server.ts");

        const result = createOptions({
            cwd: project.cwd,
            entry: "./server.ts",
            build: {
                target: "vercel",
                outputFile: "api.js",
                minify: true,
            },
        });

        expect(result).toEqual({
            cwd: project.cwd,
            entry,
            runtime: "node",
            dev: {
                host: "localhost",
                port: 3001,
            },
            build: {
                target: "vercel",
                bundle: "external",
                outputDir: "./dist",
                outputFile: "api.js",
                minify: true,
            },
        });
    });

    it("should enables bundling when bundle option is standalone", (): void => {
        const project: TempDir = createProject();
        project.writeFile("src/index.ts");

        const result = createOptions({
            cwd: project.cwd,
            build: {
                bundle: "standalone",
            },
        });

        expect(result.build.bundle).toBe("standalone");
    });

    it("should defaults runtime to node", (): void => {
        const project: TempDir = createProject();
        project.writeFile("src/index.ts");

        const result = createOptions({
            cwd: project.cwd,
        });

        expect(result.runtime).toBe("node");
    });

    it("should accepts custom runtime", (): void => {
        const project: TempDir = createProject();
        project.writeFile("src/index.ts");

        const result = createOptions({
            cwd: project.cwd,
            runtime: "workerd",
        });

        expect(result.runtime).toBe("workerd");
    });
});
