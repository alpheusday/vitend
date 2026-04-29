import type * as HTTP from "node:http";

import type { ServerOptions } from "srvx";
import type { Connect, Plugin, UserConfig, ViteDevServer } from "vite";

import type { ResolvedVitendOptions } from "#vitend/@types/options/resolved";

import { Readable } from "node:stream";

import { afterEach, describe, expect, it, vi } from "vitest";

import { devPlugin } from "#vitend/vite/dev";

type ResponseRecorder = {
    response: HTTP.ServerResponse;
    state: {
        statusCode: number;
        headers: Record<string, string>;
        chunks: string[];
        ended: boolean;
    };
};

type MiddlewareCapture = {
    middleware: (
        req: Connect.IncomingMessage,
        res: HTTP.ServerResponse,
        next: Connect.NextFunction,
    ) => Promise<void>;
};

const createOptions = (): ResolvedVitendOptions => {
    return {
        cwd: "/virtual/project",
        entry: "/virtual/project/src/index.ts",
        dev: {
            host: "127.0.0.1",
            port: 4321,
        },
        build: {
            target: "default",
            host: "localhost",
            port: 3000,
            outputDir: "./dist",
            outputFile: "index.js",
            minify: false,
            publicDir: "./public",
            copyPublicDir: false,
        },
    };
};

const createViteDevServer = (
    serverOptions: ServerOptions,
    config: UserConfig,
): {
    vite: ViteDevServer;
    capture: MiddlewareCapture;
} => {
    const capture: Partial<MiddlewareCapture> = {};

    const vite = {
        config,
        middlewares: {
            use: (
                middleware: MiddlewareCapture["middleware"],
            ): MiddlewareCapture["middleware"] => {
                capture.middleware = middleware;
                return middleware;
            },
        },
        ssrLoadModule: async (
            _id: string,
        ): Promise<{
            default: ServerOptions;
        }> => {
            return {
                default: serverOptions,
            };
        },
    } as unknown as ViteDevServer;

    return {
        vite,
        capture: capture as MiddlewareCapture,
    };
};

const createResponseRecorder = (): ResponseRecorder => {
    const state: ResponseRecorder["state"] = {
        statusCode: 200,
        headers: {},
        chunks: [],
        ended: false,
    };

    const response = {
        statusCode: state.statusCode,
        setHeader: (key: string, value: string): HTTP.ServerResponse => {
            state.headers[key] = value;
            return response as unknown as HTTP.ServerResponse;
        },
        write: (chunk: Uint8Array<ArrayBufferLike>): boolean => {
            state.chunks.push(Buffer.from(chunk).toString("utf-8"));
            return true;
        },
        end: (): HTTP.ServerResponse => {
            state.ended = true;
            state.statusCode = response.statusCode;
            return response as unknown as HTTP.ServerResponse;
        },
    } as unknown as HTTP.ServerResponse;

    return {
        response,
        state,
    };
};

const createRequest = (
    method: string,
    url: string,
    headers: HTTP.IncomingHttpHeaders,
    body?: string,
): Connect.IncomingMessage => {
    const stream: Readable = Readable.from(
        body
            ? [
                  body,
              ]
            : [],
    );

    return Object.assign(stream, {
        method,
        url,
        headers,
    }) as Connect.IncomingMessage;
};

afterEach((): void => {
    vi.unstubAllEnvs();
});

describe("devPlugin", (): void => {
    it("should configures the Vite dev server with the resolved entry and host settings", (): void => {
        const plugin = devPlugin(createOptions());

        expect(plugin.name).toBe("vitend/dev");
        expect(plugin.apply).toBe("serve");

        const config = plugin.config?.({
            server: {
                strictPort: true,
            },
        }) as UserConfig;

        expect(config.build).toEqual({
            ssr: true,
            rollupOptions: {
                input: "/virtual/project/src/index.ts",
            },
        });
        expect(config.server).toMatchObject({
            host: "127.0.0.1",
            port: 4321,
            strictPort: true,
        });
        expect(config.server?.https).toBeUndefined();
    });

    it("should forwards https settings to Vite when both cert and key are provided", (): void => {
        const plugin: Plugin = devPlugin({
            ...createOptions(),
            dev: {
                host: "127.0.0.1",
                port: 4321,
                https: {
                    cert: "CERT",
                    key: "KEY",
                    passphrase: "SECRET",
                },
            },
        });

        const config = plugin.config?.({}) as UserConfig;

        expect(config.server?.https).toEqual({
            cert: "CERT",
            key: "KEY",
            passphrase: "SECRET",
        });
    });

    it("should creates middleware that proxies GET requests through the loaded server", async (): Promise<void> => {
        let capturedRequest: Request | undefined;

        const serverOptions: ServerOptions = {
            fetch: (request: Request): Response => {
                capturedRequest = request;

                return new Response("hello world", {
                    status: 201,
                    headers: {
                        "content-type": "text/plain",
                        "x-test": "yes",
                    },
                });
            },
        };

        const plugin: Plugin = devPlugin(createOptions());
        const { vite, capture } = createViteDevServer(serverOptions, {
            server: {
                port: 5173,
            },
        });

        if (!plugin.configureServer) {
            throw new Error("Expected configureServer to be defined");
        }

        await plugin.configureServer(vite);

        const { response, state } = createResponseRecorder();

        const request: Connect.IncomingMessage = createRequest(
            "GET",
            "/users?id=1",
            {
                accept: "text/plain",
            },
        );

        await capture.middleware(request, response, (): void => void 0);

        expect(capturedRequest?.url).toBe("http://localhost:5173/users?id=1");
        expect(capturedRequest?.method).toBe("GET");
        expect(capturedRequest?.body).toBeNull();
        expect(state.statusCode).toBe(201);
        expect(state.headers).toEqual({
            "content-type": "text/plain",
            "x-test": "yes",
        });
        expect(state.chunks.join("")).toBe("hello world");
        expect(state.ended).toBe(true);
    });

    it("should ignores symbol keyed request header metadata", async (): Promise<void> => {
        const sensitiveHeaders: unique symbol = Symbol("sensitiveHeaders");

        const headers: HTTP.IncomingHttpHeaders = {
            accept: "text/plain",
        };

        Object.defineProperty(headers, sensitiveHeaders, {
            enumerable: true,
            value: [
                "authorization",
            ],
        });

        let capturedRequest: Request | undefined;

        const serverOptions: ServerOptions = {
            fetch: (request: Request): Response => {
                capturedRequest = request;

                return new Response("ok");
            },
        };

        const plugin: Plugin = devPlugin(createOptions());

        const { vite, capture } = createViteDevServer(serverOptions, {
            server: {
                port: 5173,
            },
        });

        if (!plugin.configureServer) {
            throw new Error("Expected configureServer to be defined");
        }

        await plugin.configureServer(vite);

        const { response } = createResponseRecorder();

        const request: Connect.IncomingMessage = createRequest(
            "GET",
            "/headers",
            headers,
        );

        await expect(
            capture.middleware(request, response, (): void => void 0),
        ).resolves.toBeUndefined();

        expect(capturedRequest?.headers.get("accept")).toBe("text/plain");
    });

    it("should ignores http2 pseudo request headers", async (): Promise<void> => {
        let capturedRequest: Request | undefined;

        const serverOptions: ServerOptions = {
            fetch: (request: Request): Response => {
                capturedRequest = request;

                return new Response("ok");
            },
        };

        const plugin: Plugin = devPlugin(createOptions());

        const { vite, capture } = createViteDevServer(serverOptions, {
            server: {
                port: 5173,
            },
        });

        if (!plugin.configureServer) {
            throw new Error("Expected configureServer to be defined");
        }

        await plugin.configureServer(vite);

        const { response } = createResponseRecorder();

        const request: Connect.IncomingMessage = createRequest(
            "GET",
            "/headers",
            {
                ":method": "GET",
                ":path": "/headers",
                accept: "text/plain",
            },
        );

        await expect(
            capture.middleware(request, response, (): void => void 0),
        ).resolves.toBeUndefined();

        const headerKeys: string[] = [
            ...(capturedRequest?.headers.keys() ?? []),
        ];

        expect(headerKeys).not.toContain(":method");
        expect(headerKeys).not.toContain(":path");
        expect(capturedRequest?.headers.get("accept")).toBe("text/plain");
    });

    it("should proxies request bodies and https metadata for non-GET requests", async (): Promise<void> => {
        vi.stubEnv("HOST", "dev.example.com");

        let capturedRequest: Request | undefined;

        const serverOptions: ServerOptions = {
            fetch: (request: Request): Response => {
                capturedRequest = request;

                return new Response(null, {
                    status: 204,
                    headers: {
                        "x-empty": "true",
                    },
                });
            },
        };

        const plugin: Plugin = devPlugin({
            ...createOptions(),
            dev: {
                host: "127.0.0.1",
                port: 7443,
            },
        });

        const { vite, capture } = createViteDevServer(serverOptions, {
            server: {
                port: 7443,
                https: {
                    cert: "CERT",
                    key: "KEY",
                },
            },
        });

        if (!plugin.configureServer) {
            throw new Error("Expected configureServer to be defined");
        }

        await plugin.configureServer(vite);

        const { response, state } = createResponseRecorder();
        const request: Connect.IncomingMessage = createRequest(
            "POST",
            "/submit",
            {
                "content-type": "text/plain",
            },
            "payload",
        );

        await capture.middleware(request, response, (): void => void 0);

        expect(capturedRequest?.url).toBe(
            "https://dev.example.com:7443/submit",
        );
        expect(capturedRequest?.method).toBe("POST");
        expect(await capturedRequest?.text()).toBe("payload");
        expect(state.statusCode).toBe(204);
        expect(state.headers).toEqual({
            "x-empty": "true",
        });
        expect(state.chunks).toEqual([]);
        expect(state.ended).toBe(true);
    });
});
