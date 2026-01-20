[vitend](../../README.md) / [index](../README.md) / ServerRequest

# Interface: ServerRequest

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:241

## Extends

- `Request`

## Properties

### \_request?

```ts
optional _request: Request;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:247

Access to Node.js native instance of request.

See https://srvx.h3.dev/guide/node#noderequest

***

### \_url?

```ts
optional _url: URL;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:251

Access to the parsed URL

***

### body

```ts
readonly body: ReadableStream<Uint8Array<ArrayBuffer>> | null;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:4468

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/body)

#### Inherited from

```ts
Request.body
```

***

### bodyUsed

```ts
readonly bodyUsed: boolean;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:4470

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bodyUsed)

#### Inherited from

```ts
Request.bodyUsed
```

***

### cache

```ts
readonly cache: RequestCache;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26126

The **`cache`** read-only property of the Request interface contains the cache mode of the request.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/cache)

#### Inherited from

```ts
Request.cache
```

***

### context?

```ts
optional context: ServerRequestContext;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:263

Arbitrary context related to the request.

***

### credentials

```ts
readonly credentials: RequestCredentials;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26132

The **`credentials`** read-only property of the Request interface reflects the value given to the Request.Request() constructor in the `credentials` option.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/credentials)

#### Inherited from

```ts
Request.credentials
```

***

### destination

```ts
readonly destination: RequestDestination;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26138

The **`destination`** read-only property of the **Request** interface returns a string describing the type of content being requested.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/destination)

#### Inherited from

```ts
Request.destination
```

***

### headers

```ts
readonly headers: Headers;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26144

The **`headers`** read-only property of the with the request.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/headers)

#### Inherited from

```ts
Request.headers
```

***

### integrity

```ts
readonly integrity: string;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26150

The **`integrity`** read-only property of the Request interface contains the subresource integrity value of the request.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/integrity)

#### Inherited from

```ts
Request.integrity
```

***

### ip?

```ts
optional ip: string;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:259

IP address of the client.

***

### keepalive

```ts
readonly keepalive: boolean;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26156

The **`keepalive`** read-only property of the Request interface contains the request's `keepalive` setting (`true` or `false`), which indicates whether the browser will keep the associated request alive if the page that initiated it is unloaded before the request is complete.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/keepalive)

#### Inherited from

```ts
Request.keepalive
```

***

### method

```ts
readonly method: string;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26162

The **`method`** read-only property of the `POST`, etc.) A String indicating the method of the request.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/method)

#### Inherited from

```ts
Request.method
```

***

### mode

```ts
readonly mode: RequestMode;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26168

The **`mode`** read-only property of the Request interface contains the mode of the request (e.g., `cors`, `no-cors`, `same-origin`, or `navigate`.) This is used to determine if cross-origin requests lead to valid responses, and which properties of the response are readable.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/mode)

#### Inherited from

```ts
Request.mode
```

***

### redirect

```ts
readonly redirect: RequestRedirect;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26174

The **`redirect`** read-only property of the Request interface contains the mode for how redirects are handled.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/redirect)

#### Inherited from

```ts
Request.redirect
```

***

### referrer

```ts
readonly referrer: string;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26180

The **`referrer`** read-only property of the Request.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/referrer)

#### Inherited from

```ts
Request.referrer
```

***

### referrerPolicy

```ts
readonly referrerPolicy: ReferrerPolicy;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26186

The **`referrerPolicy`** read-only property of the referrer information, sent in the Referer header, should be included with the request.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/referrerPolicy)

#### Inherited from

```ts
Request.referrerPolicy
```

***

### runtime?

```ts
optional runtime: ServerRuntimeContext;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:255

Runtime specific request context.

***

### signal

```ts
readonly signal: AbortSignal;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26192

The read-only **`signal`** property of the Request interface returns the AbortSignal associated with the request.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/signal)

#### Inherited from

```ts
Request.signal
```

***

### url

```ts
readonly url: string;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26198

The **`url`** read-only property of the Request interface contains the URL of the request.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/url)

#### Inherited from

```ts
Request.url
```

***

### waitUntil()?

```ts
optional waitUntil: (promise) => void | Promise<void>;
```

Defined in: node\_modules/.pnpm/srvx@0.10.0/node\_modules/srvx/dist/\_chunks/types.d.mts:267

Tell the runtime about an ongoing operation that shouldn't close until the promise resolves.

#### Parameters

##### promise

`Promise`\<`unknown`\>

#### Returns

`void` \| `Promise`\<`void`\>

## Methods

### arrayBuffer()

```ts
arrayBuffer(): Promise<ArrayBuffer>;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:4472

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/arrayBuffer)

#### Returns

`Promise`\<`ArrayBuffer`\>

#### Inherited from

```ts
Request.arrayBuffer
```

***

### blob()

```ts
blob(): Promise<Blob>;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:4474

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/blob)

#### Returns

`Promise`\<`Blob`\>

#### Inherited from

```ts
Request.blob
```

***

### bytes()

```ts
bytes(): Promise<Uint8Array<ArrayBuffer>>;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:4476

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bytes)

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBuffer`\>\>

#### Inherited from

```ts
Request.bytes
```

***

### clone()

```ts
clone(): Request;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:26204

The **`clone()`** method of the Request interface creates a copy of the current `Request` object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/clone)

#### Returns

`Request`

#### Inherited from

```ts
Request.clone
```

***

### formData()

```ts
formData(): Promise<FormData>;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:4478

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/formData)

#### Returns

`Promise`\<`FormData`\>

#### Inherited from

```ts
Request.formData
```

***

### json()

```ts
json(): Promise<any>;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:4480

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/json)

#### Returns

`Promise`\<`any`\>

#### Inherited from

```ts
Request.json
```

***

### text()

```ts
text(): Promise<string>;
```

Defined in: node\_modules/.pnpm/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:4482

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/text)

#### Returns

`Promise`\<`string`\>

#### Inherited from

```ts
Request.text
```
