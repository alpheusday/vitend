import type { Format, Omit } from "ts-vista";

import type {
    CompleteDefaultBuildOptions,
    CompleteDevOptions,
    CompleteVercelBuildOptions,
    CompleteVitendOptions,
} from "#/@types/options/complete";
import type { HttpsOptions } from "#/@types/options/default";

/**
 * Resolved HTTPS server options.
 */
type ResolvedHttpsOptions = HttpsOptions;

/**
 * Resolved development server options.
 */
type ResolvedDevOptions = Format<
    Omit<CompleteDevOptions, "https"> & {
        /**
         * HTTPS server options.
         */
        https?: HttpsOptions;
    }
>;

/**
 * Resolved default build server options.
 */
type ResolvedDefaultBuildOptions = Format<
    Omit<CompleteDefaultBuildOptions, "https"> & {
        /**
         * HTTPS server options.
         */
        https?: HttpsOptions;
    }
>;

/**
 * Resolved vercel build server options.
 */
type ResolvedVercelBuildOptions = Format<CompleteVercelBuildOptions>;

type ResolvedBuildOptions =
    | ResolvedDefaultBuildOptions
    | ResolvedVercelBuildOptions;

/**
 * Resolved vitend options.
 */
type ResolvedVitendOptions = Format<
    Omit<CompleteVitendOptions, "dev" | "build"> & {
        /**
         * Development server options.
         */
        dev: ResolvedDevOptions;
        /**
         * Build server options.
         */
        build: ResolvedBuildOptions;
    }
>;

export type {
    ResolvedHttpsOptions,
    ResolvedDevOptions,
    ResolvedDefaultBuildOptions,
    ResolvedVercelBuildOptions,
    ResolvedBuildOptions,
    ResolvedVitendOptions,
};
