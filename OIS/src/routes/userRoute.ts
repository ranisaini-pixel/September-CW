import { Router } from "express";

import { verifyJWT } from "../middleware/jwtVerify";
import { globalValidator } from "../middleware/globalValidationHandler";
import {
  loginUserValidation,
  OTPValidation,
  signupUserValidation,
  updateUserValidation,
  updateValidation,
} from "../utils/JoiValidation";
import {
  getUserById,
  loginUser,
  otpVerification,
  signup,
  updateUser,
} from "../controller/userController";

const router: Router = Router();

router.post(
  "/signupUser",
  globalValidator(signupUserValidation, "body"),
  signup
);
router.post(
  "/loginUser",
  globalValidator(loginUserValidation, "body"),
  loginUser
);
router.post(
  "/sentOTP",
  globalValidator(OTPValidation, "body"),
  otpVerification
);

router.use(verifyJWT);
router.get("/getUser", getUserById);
// router.get("/getStudentList", getStudentList);
router.put(
  "/updateStudent/:_id",
  globalValidator(updateValidation, "params"),
  globalValidator(updateUserValidation, "body"),
  updateUser
);
// router.delete(
//   "/deleteStudent/:_id",
//   globalValidator(deleteStudentValidation, "params"),
//   deleteStudent
// );

export default router;
