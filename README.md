# Vitend

A library for backend development with Vite.

- 🌍 Runtime agnostic
- 🧩 Seamlessly integrates with different frameworks
- ⚡️ Vite & srvx ecosystem compatibility

Vitend brings a frontend-grade developer experience to backend development. It allows you to focus on backend logic without worrying about compatibility and configuration overhead.

## Installation

Install this package as a dependency in the project:

```sh
# npm
npm i vitend

# Yarn
yarn add vitend

# pnpm
pnpm add vitend

# Deno
deno add npm:vitend

# Bun
bun add vitend
```

## Usage

Add the Vitend plugin into the Vite config:

```ts
// ./vite.config.ts

import { defineConfig } from "vite";
import { vitend } from "vitend/vite";

export default defineConfig({
    plugins: [
        vitend(),
    ],
});
```

For deploying to Vercel, add the `vercel` target:

```ts
// ./vite.config.ts

import { defineConfig } from "vite";
import { vitend } from "vitend/vite";

export default defineConfig({
    plugins: [
        vitend({
            build: {
                target: "vercel",
            }
        }),
    ],
});
```

For framework built on top of Web APIs, it is possible to directly export the application:

```ts
// ./src/index.ts

import { Hono } from "hono";

const app: Hono = new Hono();

app.get("/", (c: Context): Response => {
    return c.json({
        success: true,
    });
});

export default app;
```

Or use the `defineServer` function to wrap the application for type-safety on more advanced options:

```ts
// ./src/index.ts

import { Hono } from "hono";
import { defineServer } from "vitend";

const app: Hono = new Hono();

app.get("/", (c: Context): Response => {
    return c.json({
        success: true,
    });
});

export default defineServer({
    fetch: app.fetch,
});
```

In the same time, it is also possible for directly usage without a framework:

```ts
// ./src/index.ts

export default {
    fetch: (req: Request): Response => {
        switch (new URL(req.url).pathname) {
            case "/":
                return new Response("Hello, World!");
            default:
                return new Response("Not Found", {
                    status: 404,
                });
        }
    },
};
```

After the configuration, run `vite` to start the server.

## APIs

For the APIs, please refer to the [APIs](./apis/README.md).

## Contributing

For contributing, please refer to the [contributing guide](./CONTRIBUTING.md).

## License

This project is licensed under the terms of the MIT license.
