import { IncomingMessage, ServerResponse } from "http";
import { StudentController } from "../controller/userController";

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || "/";
  const method = req.method || "GET";

  if (url === "/registerStudent" && method === "POST") {
    return StudentController.registerStudent(req, res);
  }

  if (url === "/login" && method === "POST") {
    return StudentController.login(req, res);
  }

  if (url === "/update/" && method === "PUT") {
    return StudentController.update(req, res);
  }

  if (url === "/delete/" && method === "DELETE") {
    return StudentController.delete(res, req);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
};
