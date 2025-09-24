import { Router } from "express";
import { globalValidator } from "../middleware/globalValidationHandler";
import {
  changePasswordValidation,
  loginUserValidation,
  resetPasswordValidation,
  sendOTPValidation,
  updateValidation,
} from "../utils/JoiValidation";
import {
  ForgotPassword,
  getAdminDetails,
  loginAdmin,
} from "../controller/adminController";
import { changePassword, resetPassword } from "../controller/userController";
import { verifyJWT } from "../middleware/jwtVerify";

const router: Router = Router();

router.post(
  "/loginAdmin",
  globalValidator(loginUserValidation, "body"),
  loginAdmin
);

router.post(
  "/adminForgotPassword",
  globalValidator(sendOTPValidation, "body"),
  ForgotPassword
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

router.get(
  "/adminDetails",
  globalValidator(updateValidation, "query"),
  getAdminDetails
);

export default router;
