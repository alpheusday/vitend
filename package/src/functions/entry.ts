import * as Fs from "node:fs";
import * as Path from "node:path";

const ENTRY_DEFAULT: string[] = [
    "./src/index.ts",
    "./src/index.js",
];

const getEntry = (cwd: string, entry?: string): string => {
    if (!entry) {
        for (const ent of ENTRY_DEFAULT) {
            if (Fs.existsSync(Path.resolve(cwd, ent))) {
                entry = ent;
                break;
            }
        }

        if (!entry) {
            throw new Error("No entry file found");
        }
    }

    return Path.resolve(cwd, entry);
};

export { getEntry };
