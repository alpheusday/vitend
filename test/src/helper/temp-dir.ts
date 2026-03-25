import * as Fs from "node:fs";
import * as Os from "node:os";
import * as Path from "node:path";

type TempDir = {
    cwd: string;
    path: (relativePath: string) => string;
    writeFile: (relativePath: string, content?: string) => string;
    writeJson: (
        relativePath: string,
        content: Record<string, unknown>,
    ) => string;
    cleanup: () => void;
};

const createTempDir = (): TempDir => {
    const cwd: string = Fs.mkdtempSync(Path.join(Os.tmpdir(), "vitend-"));

    const path = (relativePath: string): string => {
        return Path.resolve(cwd, relativePath);
    };

    const writeFile = (relativePath: string, content: string = ""): string => {
        const filePath: string = path(relativePath);

        Fs.mkdirSync(Path.dirname(filePath), {
            recursive: true,
        });

        Fs.writeFileSync(filePath, content, "utf-8");

        return filePath;
    };

    const writeJson = (
        relativePath: string,
        content: Record<string, unknown>,
    ): string => {
        return writeFile(relativePath, JSON.stringify(content));
    };

    const cleanup = (): void => {
        Fs.rmSync(cwd, {
            recursive: true,
            force: true,
        });
    };

    return {
        cwd,
        path,
        writeFile,
        writeJson,
        cleanup,
    };
};

export type { TempDir };
export { createTempDir };
