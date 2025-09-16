"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controller/studentController");
const router = (0, express_1.Router)();
router.post("/createStudent", studentController_1.registerStudent);
router.get("/loginStudent", studentController_1.loginStudent);
router.get("/getSudent", studentController_1.getStudentById);
router.get("/getStudentList", studentController_1.getStudentList);
router.put("/updateStudent/:_id", studentController_1.updateStudent);
router.delete("/deleteStudent/:_id", studentController_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=studentRoute.js.map