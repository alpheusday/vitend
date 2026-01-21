import type {
    FetchHandler as _FetchHandler,
    NodeHttpHandler as _NodeHttpHandler,
} from "srvx";
import type { AdapterMeta as _AdapterMeta } from "srvx/node";

/**
 * Node HTTP handler based on Node.js implementation.
 */
type NodeHttpHandler = _NodeHttpHandler;

/**
 * Fetch handler based on Web API.
 */
type FetchHandler = _FetchHandler;

/**
 * Adapter meta.
 */
type AdapterMeta = _AdapterMeta;

export type { FetchHandler, NodeHttpHandler, AdapterMeta };
