import type { Format, Partial } from "ts-vista";

/**
 * Complete options for the `vitend` plugin.
 */
type CompleteVitendOptions = {
    /**
     * The current working directory.
     *
     * By default, it is `process.cwd()`.
     */
    cwd: string;
    /**
     * The entry file for the application.
     *
     * By default, it is `./src/index.ts` or `./src/index.js`.
     */
    entry: string;
    /**
     * The output directory for the application.
     *
     * By default, it is `./dist`.
     */
    outputDir: string;
    /**
     * The output file name for the application.
     *
     * By default, it is `index.js`.
     */
    outputFile: string;
    /**
     * Whether to minify the output.
     *
     * By default, it is `false`.
     */
    minify: boolean;
    /**
     * The public directory for the application.
     *
     * By default, it is `./public`.
     */
    publicDir: string;
    /**
     * Whether to copy the public directory to the output directory.
     *
     * When this is `true`, the public directory will be copied
     * into the directory with same name inside the output directory.
     *
     * By default, it is `false`.
     */
    copyPublicDir: boolean;
};

/**
 * Options for the `vitend` plugin.
 */
type VitendOptions = Format<Partial<CompleteVitendOptions>>;

export type { CompleteVitendOptions, VitendOptions };
