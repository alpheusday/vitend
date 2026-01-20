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
import { defineConfig } from "vite";
import { vitend } from "vitend/vite";

export default defineConfig({
    plugins: [
        vitend(),
    ],
});
```

Export the application:

```ts
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

Then run `vite` to start the server.

## APIs

For the APIs, please refer to the [APIs](./apis/README.md).

## Contributing

For contributing, please refer to the [contributing guide](./CONTRIBUTING.md).

## License

This project is licensed under the terms of the MIT license.
