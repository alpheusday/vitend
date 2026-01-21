import type { ServerOptions } from "#/@types/server";

/**
 * A function to define server options.
 *
 * ### Example
 *
 * ```ts
 * // ./src/index.ts
 *
 * import { defineServer } from "vitend";
 *
 * export default defineServer({
 *     fetch: (req: Request): Response => {
 *         return new Response("Hello, World!");
 *     },
 * });
 * ```
 */
const defineServer = (options: ServerOptions): ServerOptions => options;

export { defineServer };
