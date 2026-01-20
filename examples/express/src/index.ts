import type { Express, Request, Response } from "express";

import * as Path from "node:path";

import express from "express";
import { defineServer } from "vitend";
import { toFetchHandler } from "vitend/node";

const PATH_PUBLIC: string = Path.resolve(
    import.meta.env.DEV ? process.cwd() : import.meta.dirname,
    "public",
);

const app: Express = express();

app.get("/", (_req: Request, res: Response): void => {
    res.json({
        success: true,
    });
});

app.get("/data", (_req: Request, res: Response): void => {
    res.json({
        success: true,
        data: {
            message: "Hello, World!",
        },
    });
});

app.use(express.static(PATH_PUBLIC));

export default defineServer({
    fetch: toFetchHandler(app),
});
