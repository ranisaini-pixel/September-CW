import { IncomingMessage, ServerResponse } from "http";
import * as http from "http";

const PORT = 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Bad Request");
    }
    console.log(req, "12");

    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end("<h1>Welcome to my TypeScript HTTP Server</h1>");
    }

    if (req.method === "GET" && url.pathname === "/aboutMe") {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
      <h1>About Me</h1>
      <p>Hello! I'm running a server with Node.js core HTTP module using TypeScript.</p>
    `);
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from the TypeScript server!");
  }
);

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
