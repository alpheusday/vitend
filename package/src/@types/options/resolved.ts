import type { Format, Omit } from "ts-vista";

import type {
    CompleteBuildOptions,
    CompleteDevOptions,
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
 * Resolved build server options.
 */
type ResolvedBuildOptions = Format<
    Omit<CompleteBuildOptions, "https"> & {
        /**
         * HTTPS server options.
         */
        https?: HttpsOptions;
    }
>;

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
    ResolvedBuildOptions,
    ResolvedVitendOptions,
};
