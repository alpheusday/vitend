import type { ConsolaInstance } from "consola";

import { createConsola } from "consola";

const log: ConsolaInstance = createConsola({
    formatOptions: {
        date: false,
    },
});

export { log };
