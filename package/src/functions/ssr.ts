import type { SSRTarget } from "vite";

import type { Runtime } from "#/@types/options/complete";

const getSsrTarget = (runtime: Runtime): SSRTarget => {
    switch (runtime) {
        case "workerd":
            return "webworker";
        default:
            return "node";
    }
};

export { getSsrTarget };
