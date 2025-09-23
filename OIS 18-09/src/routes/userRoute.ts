import { Router } from "express";

import { verifyJWT } from "../middleware/jwtVerify";
import { globalValidator } from "../middleware/globalValidationHandler";
import {
  changePasswordValidation,
  loginUserValidation,
  OTPVerificationValidation,
  resetPasswordValidation,
  sendOTPValidation,
  signupUserValidation,
  updateUserValidation,
  updateValidation,
} from "../utils/JoiValidation";
import {
  changePassword,
  deleteUser,
  getUserById,
  loginUser,
  logoutUser,
  otpVerification,
  resetPassword,
  // otpVerification,
  sendOTP,
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
router.post("/sentOTP", globalValidator(sendOTPValidation, "body"), sendOTP);
router.post(
  "/verifyOTP",
  globalValidator(updateValidation, "query"),
  globalValidator(OTPVerificationValidation, "body"),
  otpVerification
);

router.post(
  "/resetPassword",
  globalValidator(updateValidation, "query"),
  globalValidator(resetPasswordValidation, "body"),
  resetPassword
);

router.post(
  "/changePassword",
  globalValidator(updateValidation, "query"),
  globalValidator(changePasswordValidation, "body"),
  changePassword
);

router.use(verifyJWT);
router.get("/getUser", getUserById);
router.put(
  "/updateUser/:_id",
  globalValidator(updateValidation, "params"),
  globalValidator(updateUserValidation, "body"),
  updateUser
);
router.get("/logout", globalValidator(updateValidation, "query"), logoutUser);

router.delete("/deleteUser", deleteUser);

// / router.get("/getStudentList", getStudentList);

export default router;
