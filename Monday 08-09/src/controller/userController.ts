import { IncomingMessage, ServerResponse } from "http";
import { UserModel } from "../model/userModel";
import { parseBody } from "../utils/bodyParser";

export class UserController {
  static async registerStudent(req: IncomingMessage, res: ServerResponse) {
    try {
      const body = await parseBody(req);
      const { rollNo, name, collegeName, course } = body;

      if (!rollNo || !collegeName || !name || !course) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: "Required Data" })); //json formate
        return;
      }

      if (UserModel.findById(rollNo)) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: "User already exists" }));
        return;
      }

      const newUser = UserModel.create(rollNo, name, collegeName, course);
      res.writeHead(201);
      res.end(JSON.stringify({ message: "User registered", user: newUser }));
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ message: "Error registering user" }));
    }
  }

  static async login(req: IncomingMessage, res: ServerResponse) {
    try {
      const body = await parseBody(req);
      const { rollNo } = body;

      const user = UserModel.findById(rollNo);
      if (!user) {
        res.writeHead(401);
        res.end(JSON.stringify({ message: "Invalid credentials" }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ message: "Login successful", user }));
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ message: "Error logging in" }));
    }
  }

  static async update(req: IncomingMessage, res: ServerResponse) {
    try {
      const body = await parseBody(req, res);
      const updatedUser = UserModel.update(body);

      if (!updatedUser) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ message: "User updated", user: updatedUser }));
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ message: "Error updating user" }));
    }
  }

  static async delete(res: ServerResponse, rollNo: number) {
    try {
      const deleted = UserModel.delete(rollNo);

      if (!deleted) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ message: "User deleted" }));
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ message: "Error deleting user" }));
    }
  }
}
