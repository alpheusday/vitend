import type { Omit } from "ts-vista";

import type { CompleteVitendOptions, VitendOptions } from "#/@types/options";

import { toMerged } from "es-toolkit";

import { getEntry } from "./entry";

const OPTIONS_DEFAULT: Omit<CompleteVitendOptions, "entry"> = {
    cwd: process.cwd(),
    outputDir: "./dist",
    outputFile: "index.js",
    minify: false,
    publicDir: "./public",
    copyPublicDir: false,
};

const createOptions = (options?: VitendOptions): CompleteVitendOptions => {
    const merged = toMerged(OPTIONS_DEFAULT, options ?? {});

    return {
        ...merged,
        entry: getEntry(merged.cwd, options?.entry),
    };
};

export { createOptions };
