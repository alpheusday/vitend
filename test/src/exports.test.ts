import type { ServerOptions } from "vitend";

import { createRequire } from "node:module";

import { defineServer } from "vitend";
import { toFetchHandler } from "vitend/node";
import { serve } from "vitend/runtime";
import { describe, expect, it } from "vitest";

const requireFromPackage = createRequire(
    new URL("../../package/package.json", import.meta.url),
);

const srvxServe = requireFromPackage("srvx").serve as typeof serve;

const srvxToFetchHandler = requireFromPackage("srvx/node")
    .toFetchHandler as typeof toFetchHandler;

describe("public modules", (): void => {
    it("should returns the provided server options from defineServer", (): void => {
        const options: ServerOptions = {
            fetch: (_request: Request): Response => {
                return new Response("ok");
            },
        };

        expect(defineServer(options)).toBe(options);
    });

    it("should re-exports the srvx runtime adapter", (): void => {
        expect(serve).toBe(srvxServe);
    });

    it("should re-exports the node fetch adapter", (): void => {
        expect(toFetchHandler).toBe(srvxToFetchHandler);
    });
});
