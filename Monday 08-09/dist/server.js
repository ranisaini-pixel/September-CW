"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const PORT = 5000;
const server = http.createServer((res, req) => {
    req.body();
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from the TypeScript server!");
});
server.listen(PORT, "localhost", () => {
    console.log(`Server running at http://localhost:${PORT} `);
});
//# sourceMappingURL=server.js.map