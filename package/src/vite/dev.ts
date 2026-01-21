import type HTTP from "node:http";

import type { Server, ServerHandler, ServerOptions } from "srvx";
import type { Connect, Plugin, UserConfig, ViteDevServer } from "vite";

import type {
    ResolvedDevOptions,
    ResolvedHttpsOptions,
    ResolvedVitendOptions,
} from "#/@types/options/resolved";

import { toMerged } from "es-toolkit";
import { serve } from "srvx";

type CreateMiddlewareOptions = {
    vite: ViteDevServer;
    server: Server;
};

const createMiddleware = ({ vite, server }: CreateMiddlewareOptions) => {
    return async (
        req: Connect.IncomingMessage,
        res: HTTP.ServerResponse,
        _next: Connect.NextFunction,
    ): Promise<void> => {
        const isHttps: boolean =
            vite.config.server.https?.cert !== void 0 &&
            vite.config.server.https?.key !== void 0;

        const protocol: string = `http${isHttps ? "s" : ""}`;

        const host: string = process.env.HOST ?? "localhost";

        const port: number = vite.config.server.port;

        const path: string = req.url ?? "";

        const url: URL = new URL(`${protocol}://${host}:${port}${path}`);

        const body: Connect.IncomingMessage | undefined =
            req.method !== "GET" && req.method !== "HEAD" ? req : void 0;

        const request: Request = new Request(url, {
            method: req.method,
            headers: req.headers,
            body,
            duplex: "half",
        } as RequestInit);

        const response: Response = await server.fetch(request);

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

        const stream = async (): Promise<void> => {
            try {
                while (true) {
                    const { done, value } = await reader.read();

                    if (done) break;

                    res.write(value);
                }

                res.end();
            } catch {
                res.end();
            }
        };

        await stream();
    };
};

type Middleware = ReturnType<typeof createMiddleware>;

const devPlugin = (opts: ResolvedVitendOptions): Plugin => {
    const dev: ResolvedDevOptions = opts.dev;
    const https: ResolvedHttpsOptions = opts.dev.https ?? {};

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
                    host: dev.host,
                    port: dev.port,
                    ...(https.cert !== void 0 && https.key !== void 0
                        ? {
                              https: {
                                  cert: https.cert,
                                  key: https.key,
                                  passphrase: https.passphrase,
                              },
                          }
                        : {}),
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
                hostname: dev.host,
                port: dev.port,
                tls: {
                    cert: https.cert,
                    key: https.key,
                    passphrase: https.passphrase,
                },
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
