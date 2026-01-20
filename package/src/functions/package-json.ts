import type { Format, Partial } from "ts-vista";

import * as Fs from "node:fs";
import * as Path from "node:path";

type CompletePackageJson = {
    type: "module" | "commonjs";
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
};

type PackageJson = Format<Partial<CompletePackageJson>>;

const getPackageJson = (cwd: string): PackageJson => {
    const path: string = Path.resolve(cwd, "package.json");

    if (!Fs.existsSync(path)) {
        throw new Error("Failed to find package.json");
    }

    const rawPackageJson: string = Fs.readFileSync(path, "utf-8");

    return JSON.parse(rawPackageJson);
};

export type { CompletePackageJson, PackageJson };
export { getPackageJson };
