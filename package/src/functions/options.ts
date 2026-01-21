import type { Omit } from "ts-vista";

import type { VitendOptions } from "#/@types/options/default";
import type { ResolvedVitendOptions } from "#/@types/options/resolved";

import { toMerged } from "es-toolkit";

import { getEntry } from "#/functions/entry";

const OPTIONS_DEFAULT: Omit<ResolvedVitendOptions, "entry"> = {
    cwd: process.cwd(),
    dev: {
        host: "localhost",
        port: 3001,
    },
    build: {
        host: "localhost",
        port: 3000,
        outputDir: "./dist",
        outputFile: "index.js",
        minify: false,
        publicDir: "./public",
        copyPublicDir: false,
    },
};

const createOptions = (options?: VitendOptions): ResolvedVitendOptions => {
    const merged = toMerged(OPTIONS_DEFAULT, options ?? {});

    return {
        ...merged,
        entry: getEntry(merged.cwd, options?.entry),
    };
};

export { createOptions };
