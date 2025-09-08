import { IncomingMessage, ServerResponse } from "http";
import * as http from "http";

import { userRoutes } from "./routes/userRoute";

const PORT = 5000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS"
    // );
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.end("Hello from the TypeScript server!");
    userRoutes(req, res);
  }
);

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT} `);
});
