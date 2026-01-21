import type { Format, Omit, Partial } from "ts-vista";

import type {
    CompleteBuildOptions,
    CompleteDevOptions,
    CompleteHttpsOptions,
    CompleteVitendOptions,
} from "#/@types/options/complete";

/**
 * HTTPS server options.
 */
type HttpsOptions = Format<Partial<CompleteHttpsOptions>>;

/**
 * Development server options.
 */
type DevOptions = Format<
    Partial<Omit<CompleteDevOptions, "https">> & {
        /**
         * HTTPS server options.
         */
        https?: HttpsOptions;
    }
>;

/**
 * Build server options.
 */
type BuildOptions = Format<
    Partial<Omit<CompleteBuildOptions, "https">> & {
        /**
         * HTTPS server options.
         */
        https?: HttpsOptions;
    }
>;

/**
 * Options for the `vitend` plugin.
 */
type VitendOptions = Format<
    Partial<Omit<CompleteVitendOptions, "dev" | "build">> & {
        /**
         * The options for the development server.
         */
        dev?: DevOptions;
        /**
         * The options for the production server.
         */
        build?: BuildOptions;
    }
>;

export type { HttpsOptions, DevOptions, BuildOptions, VitendOptions };
