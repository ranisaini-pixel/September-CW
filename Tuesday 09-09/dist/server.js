"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const dbConfig_1 = require("./dbConnection/dbConfig");
const userRoute_1 = require("./routes/userRoute");
const PORT = 5000;
(0, dbConfig_1.default)();
const server = http.createServer((req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS"
    // );
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.end("Hello from the TypeScript server!");
    (0, userRoute_1.userRoutes)(req, res);
});
server.listen(PORT, "localhost", () => {
    console.log(`Server running at http://localhost:${PORT} `);
});
//# sourceMappingURL=server.js.map