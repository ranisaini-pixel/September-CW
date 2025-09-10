"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post("/register", userController_1.registerStudent);
router.get("/login", userController_1.loginStudent);
router.get("/getStudent", userController_1.getStudentById);
router.get("/getStudentList", userController_1.getStudentList);
router.put("/update/:rollNo", userController_1.updateStudent);
router.delete("/delete/:rollNo", userController_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=userRoute.js.map