/**
 * Index module
 * @module index
 */

export type {
    ErrorHandler,
    Server,
    ServerHandler,
    ServerMiddleware,
    ServerPlugin,
    ServerRequest,
} from "srvx";

export type { ServerOptions } from "#/@types/server";

export { defineServer } from "#/functions/define";
