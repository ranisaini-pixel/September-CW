"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtVerify_1 = require("../middleware/jwtVerify");
const globalValidationHandler_1 = require("../middleware/globalValidationHandler");
const JoiValidation_1 = require("../utils/JoiValidation");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post("/signupUser", (0, globalValidationHandler_1.globalValidator)(JoiValidation_1.signupUserValidation, "body"), userController_1.signup);
router.post("/loginUser", (0, globalValidationHandler_1.globalValidator)(JoiValidation_1.loginUserValidation, "body"), userController_1.loginUser);
router.post("/sentOTP", (0, globalValidationHandler_1.globalValidator)(JoiValidation_1.OTPValidation, "body"), userController_1.otpVerification);
router.use(jwtVerify_1.verifyJWT);
router.get("/getUser", userController_1.getUserById);
// router.get("/getStudentList", getStudentList);
router.put("/updateStudent/:_id", (0, globalValidationHandler_1.globalValidator)(JoiValidation_1.updateValidation, "params"), (0, globalValidationHandler_1.globalValidator)(JoiValidation_1.updateUserValidation, "body"), userController_1.updateUser);
// router.delete(
//   "/deleteStudent/:_id",
//   globalValidator(deleteStudentValidation, "params"),
//   deleteStudent
// );
exports.default = router;
//# sourceMappingURL=userRoute.js.map