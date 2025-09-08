import { IncomingMessage, ServerResponse } from "http";
import { UserController } from "../controller/userController";

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || "/";
  const method = req.method || "GET";

  if (url === "/registerStudent" && method === "POST") {
    return UserController.registerStudent(req, res);
  }

  if (url === "/login" && method === "POST") {
    return UserController.login(req, res);
  }

  if (url.startsWith("/update/") && method === "PUT") {
    const idStr: string = url.split("/")[2] ?? "";
    const id = Number.isNaN(parseInt(idStr, 10)) ? 0 : parseInt(idStr, 10);

    if (id <= 0) {
      res.writeHead(400);
      res.end(JSON.stringify({ message: "Invalid user ID" }));
      return;
    }

    return UserController.update(req, res);
  }

  if (url.startsWith("/delete/") && method === "DELETE") {
    const idStr: string = url.split("/")[2] ?? "";
    const id = Number.isNaN(parseInt(idStr, 10)) ? 0 : parseInt(idStr, 10);

    if (id <= 0) {
      res.writeHead(400);
      res.end(JSON.stringify({ message: "Invalid user ID" }));
      return;
    }

    return UserController.delete(res, id);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
};
