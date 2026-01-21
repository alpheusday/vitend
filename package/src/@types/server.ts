import type { ServerOptions as SrvxOptions } from "srvx";
import type { Format, Omit } from "ts-vista";

type ServerOptions = Format<
    Omit<SrvxOptions, "manual" | "hostname" | "port" | "protocol" | "tls">
>;

export type { ServerOptions };
