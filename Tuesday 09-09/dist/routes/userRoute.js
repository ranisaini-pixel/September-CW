"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const userController_1 = require("../controller/userController");
const userRoutes = async (req, res) => {
    const url = req.url || "/";
    const method = req.method || "GET";
    if (url === "/registerStudent" && method === "POST") {
        return userController_1.StudentController.registerStudent(req, res);
    }
    if (url === "/login" && method === "POST") {
        return userController_1.StudentController.login(req, res);
    }
    if (url === "/update/" && method === "PUT") {
        return userController_1.StudentController.update(req, res);
    }
    if (url === "/delete/" && method === "DELETE") {
        return userController_1.StudentController.delete(res, req);
    }
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=userRoute.js.map