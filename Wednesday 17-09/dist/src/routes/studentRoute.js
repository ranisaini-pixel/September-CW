"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controller/studentController");
const jwtVerify_1 = require("../middleware/jwtVerify");
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const JoiValidation_1 = require("../utils/JoiValidation");
const router = (0, express_1.Router)();
router.post("/createStudent", (0, ValidateSchema_1.validate)(JoiValidation_1.registerStudentValidation), studentController_1.registerStudent);
router.get("/loginStudent", (0, ValidateSchema_1.validate)(JoiValidation_1.loginStudentValidation), studentController_1.loginStudent);
router.use(jwtVerify_1.verifyJWT);
router.get("/getSudent", studentController_1.getStudentById);
router.get("/getStudentList", studentController_1.getStudentList);
router.put("/updateStudent/:_id", (0, ValidateSchema_1.validate)(JoiValidation_1.updateStudentValidation), studentController_1.updateStudent);
router.delete("/deleteStudent/:_id", studentController_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=studentRoute.js.map