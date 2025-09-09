"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const userModel_1 = require("../model/userModel");
const bodyParser_1 = require("../utils/bodyParser");
class StudentController {
    static async registerStudent(req, res) {
        try {
            const body = await (0, bodyParser_1.parseBody)(req);
            const { rollNo, name, collegeName, course } = body;
            if (!rollNo || !name || !collegeName || !course) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "All fields are required" }));
            }
            const existedStudent = await userModel_1.default.findOne({ rollNo });
            if (existedStudent) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Student already exists" }));
            }
            const newUser = new userModel_1.default({ rollNo, name, collegeName, course });
            await newUser.save();
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message: "User registered successfully",
                user: newUser,
            }));
        }
        catch (error) {
            console.error("Error registering student:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Internal Server Error" }));
        }
    }
    static async login(req, res) {
        try {
            const body = await (0, bodyParser_1.parseBody)(req);
            const { rollNo } = body;
            const user = userModel_1.default.findById(rollNo);
            if (!user) {
                res.writeHead(401);
                res.end(JSON.stringify({ message: "Invalid credentials" }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify({ message: "Login successful", user }));
        }
        catch {
            res.writeHead(500);
            res.end(JSON.stringify({ message: "Error logging in" }));
        }
    }
    static async update(req, res) {
        try {
            const body = await (0, bodyParser_1.parseBody)(req, res);
            const updatedUser = await userModel_1.default.updateOne(body);
            if (!updatedUser) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: "User not found" }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify({ message: "User updated", user: updatedUser }));
        }
        catch {
            res.writeHead(500);
            res.end(JSON.stringify({ message: "Error updating user" }));
        }
    }
    static async delete(res, req) {
        try {
            const body = await (0, bodyParser_1.parseBody)(req, res);
            const deleted = userModel_1.default.deleteOne(body.rollNo);
            if (!deleted) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: "User not found" }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify({ message: "User deleted" }));
        }
        catch {
            res.writeHead(500);
            res.end(JSON.stringify({ message: "Error deleting user" }));
        }
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=userController.js.map