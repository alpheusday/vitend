/**
 * Vite module
 * @module vite
 */

export type { BundleMode, Runtime } from "#/@types/options/complete";
export type {
    BuildOptions,
    DevOptions,
    HttpsOptions,
    VitendOptions,
} from "#/@types/options/default";

export { vitend } from "#/vite/vitend";
