import type { Omit } from "ts-vista";

import type { VitendOptions } from "#/@types/options/default";
import type {
    ResolvedDefaultBuildOptions,
    ResolvedVercelBuildOptions,
    ResolvedVitendOptions,
} from "#/@types/options/resolved";

import { toMerged } from "es-toolkit";

import { getEntry } from "#/functions/entry";

const OPTIONS_BUILD_VERCEL: ResolvedVercelBuildOptions = {
    mode: "vercel",
    outputDir: "./dist",
    outputFile: "index.js",
    minify: false,
};

const OPTIONS_BUILD_DEFAULT: ResolvedDefaultBuildOptions = {
    mode: "default",
    host: "localhost",
    port: 3000,
    outputDir: "./dist",
    outputFile: "index.js",
    minify: false,
    publicDir: "./public",
    copyPublicDir: false,
};

const OPTIONS_DEFAULT: Omit<ResolvedVitendOptions, "entry"> = {
    cwd: process.cwd(),
    dev: {
        host: "localhost",
        port: 3001,
    },
    build: {
        mode: "default",
        host: "localhost",
        port: 3000,
        outputDir: "./dist",
        outputFile: "index.js",
        minify: false,
        publicDir: "./public",
        copyPublicDir: false,
    },
};

const getDefaultOptions = (
    isVercel: boolean,
): Omit<ResolvedVitendOptions, "entry"> => {
    return {
        ...OPTIONS_DEFAULT,
        build: isVercel ? OPTIONS_BUILD_VERCEL : OPTIONS_BUILD_DEFAULT,
    };
};

const createOptions = (options?: VitendOptions): ResolvedVitendOptions => {
    const isVercel: boolean = options?.build?.mode === "vercel";

    const merged = toMerged(getDefaultOptions(isVercel), options ?? {});

    return {
        ...merged,
        entry: getEntry(merged.cwd, options?.entry),
    };
};

export { createOptions };
