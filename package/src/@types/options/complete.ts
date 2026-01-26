/**
 * Complete HTTPS server options.
 */
type CompleteHttpsOptions = {
    /**
     * File path or inlined TLS certificate in PEM format (required).
     */
    cert: string;
    /**
     * File path or inlined TLS private key in PEM format (required).
     */
    key: string;
    /**
     * Passphrase for the private key (optional).
     */
    passphrase: string;
};

/**
 * Complete development server options.
 */
type CompleteDevOptions = {
    /**
     * The host for the development server.
     *
     * By default, it is `localhost`.
     */
    host: string;
    /**
     * The port number for the development server.
     *
     * By default, it is `3001`.
     */
    port: number;
    /**
     * HTTPS server options.
     */
    https: CompleteHttpsOptions;
};

/**
 * Complete default build server options.
 */
type CompleteDefaultBuildOptions = {
    /**
     * Build target.
     *
     * By default, it is `default`.
     */
    target: "default";
    /**
     * The host for the production server.
     *
     * By default, it is `localhost`.
     */
    host: string;
    /**
     * The port number for the production server.
     *
     * By default, it is `3000`.
     */
    port: number;
    /**
     * HTTPS server options.
     */
    https: CompleteHttpsOptions;
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
 * Complete Vercel build server options.
 */
type CompleteVercelBuildOptions = {
    /**
     * Build target.
     *
     * By default, it is `default`.
     */
    target: "vercel";
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
};

/**
 * Complete build server options.
 */
type CompleteBuildOptions =
    | CompleteDefaultBuildOptions
    | CompleteVercelBuildOptions;

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
     * The options for the development server.
     */
    dev: CompleteDevOptions;
    /**
     * The options for the production server.
     */
    build: CompleteBuildOptions;
};

export type {
    CompleteHttpsOptions,
    CompleteDevOptions,
    CompleteDefaultBuildOptions,
    CompleteVercelBuildOptions,
    CompleteBuildOptions,
    CompleteVitendOptions,
};
