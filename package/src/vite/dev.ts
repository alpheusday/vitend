import type HTTP from "node:http";

import type { Server, ServerHandler, ServerOptions } from "srvx";
import type { Connect, Plugin, UserConfig, ViteDevServer } from "vite";

import type { CompleteVitendOptions } from "#/@types/options";

import { toMerged } from "es-toolkit";
import { serve } from "srvx";

type GetServerURLOptions = {
    vite: ViteDevServer;
    req: Connect.IncomingMessage;
};

const getServerURL = ({ vite, req }: GetServerURLOptions): URL => {
    const isHttps: boolean = vite.config.server.https !== undefined;

    const protocol: string = `http${isHttps ? "s" : ""}`;

    const host: string = process.env.HOST ?? "localhost";

    const port: number = vite.config.server.port;

    const path: string = req.url ?? "";

    return new URL(`${protocol}://${host}:${port}${path}`);
};

type CreateRequestOptions = {
    url: URL;
    req: Connect.IncomingMessage;
};

const createRequest = ({ url, req }: CreateRequestOptions): Request => {
    const body: Connect.IncomingMessage | undefined =
        req.method !== "GET" && req.method !== "HEAD" ? req : void 0;

    return new Request(url, {
        method: req.method,
        headers: req.headers as HeadersInit,
        // @ts-expect-error
        body,
    });
};

type StreamResponseOptions = {
    response: Response;
    res: HTTP.ServerResponse;
};

const streamResponse = async ({
    response,
    res,
}: StreamResponseOptions): Promise<void> => {
    res.statusCode = response.status;

    response.headers.forEach((value: string, key: string): void => {
        res.setHeader(key, value);
    });

    if (!response.body) {
        res.end();
        return void 0;
    }

    const reader: ReadableStreamDefaultReader<Uint8Array<ArrayBuffer>> =
        response.body.getReader();

    const pump = async (): Promise<void> => {
        const { done, value } = await reader.read();

        if (done) {
            res.end();
            return void 0;
        }

        res.write(Buffer.from(value));

        return pump();
    };

    await pump();
};

type CreateMiddlewareOptions = {
    vite: ViteDevServer;
    server: Server;
};

const createMiddleware = ({ vite, server }: CreateMiddlewareOptions) => {
    return async (
        req: Connect.IncomingMessage,
        res: HTTP.ServerResponse,
        next: Connect.NextFunction,
    ): Promise<void> => {
        const url: URL = getServerURL({
            vite,
            req,
        });

        const request: Request = createRequest({
            url,
            req,
        });

        const response: Response | undefined = await server.fetch(request);

        if (!response) return next();

        await streamResponse({
            response,
            res,
        });
    };
};

type Middleware = ReturnType<typeof createMiddleware>;

const devPlugin = (opts: CompleteVitendOptions): Plugin => {
    return {
        name: "vitend/dev",
        apply: "serve",
        config(config: UserConfig): UserConfig {
            const devConfig: UserConfig = {
                build: {
                    ssr: true,
                    rollupOptions: {
                        input: opts.entry,
                    },
                },
                server: {
                    port: config.server?.port ?? 3001,
                },
            };

            return toMerged(config, devConfig);
        },
        configureServer: async (vite: ViteDevServer): Promise<void> => {
            const serverOptions: ServerOptions = (
                await vite.ssrLoadModule(opts.entry)
            ).default;

            const server: Server<ServerHandler> = serve({
                // base
                gracefulShutdown: false,
                // user
                ...serverOptions,
                // override
                manual: true,
            });

            const middleware: Middleware = createMiddleware({
                vite,
                server,
            });

            vite.middlewares.use(middleware);
        },
    };
};

export { devPlugin };
