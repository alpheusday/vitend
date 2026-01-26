import type { Context } from "hono";

import { Hono } from "hono";

const app: Hono = new Hono();

app.get("/", (c: Context): Response => {
    return c.json({
        success: true,
    });
});

app.get("/data", (c: Context): Response => {
    return c.json({
        success: true,
        data: {
            message: "Hello, World!",
        },
    });
});

export default app;
