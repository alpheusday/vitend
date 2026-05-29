import * as Path from "node:path";

const toPosix = (path: string): string => {
    return path.split(Path.sep).join(Path.posix.sep);
};

export { toPosix };
