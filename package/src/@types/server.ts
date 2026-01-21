import type {
    ErrorHandler as _ErrorHandler,
    Server as _Server,
    ServerHandler as _ServerHandler,
    ServerMiddleware as _ServerMiddleware,
    ServerOptions as _ServerOptions,
    ServerPlugin as _ServerPlugin,
    ServerRequest as _ServerRequest,
} from "srvx";
import type { Format, Omit } from "ts-vista";

/**
 * Server request extended from `Request`.
 */
type ServerRequest = _ServerRequest;

/**
 * Server handler based on Web API.
 */
type ServerHandler = _ServerHandler;

/**
 * Error handler for the server.
 */
type ErrorHandler = _ErrorHandler;

/**
 * Server middleware for extending the server.
 */
type ServerMiddleware = _ServerMiddleware;

/**
 * Server type.
 */
type Server = _Server;

/**
 * Server plugin for extending the server.
 */
type ServerPlugin = _ServerPlugin;

/**
 * Server options.
 */
type ServerOptions = Format<
    Omit<_ServerOptions, "manual" | "hostname" | "port" | "protocol" | "tls">
>;

export type {
    ServerRequest,
    ServerHandler,
    ErrorHandler,
    ServerMiddleware,
    Server,
    ServerPlugin,
    ServerOptions,
};
