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
