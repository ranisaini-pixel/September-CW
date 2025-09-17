import { Router } from "express";
import {
  deleteStudent,
  getStudentById,
  getStudentList,
  loginStudent,
  registerStudent,
  updateStudent,
} from "../controller/studentController";

import { verifyJWT } from "../middleware/jwtVerify";
import {
  deleteStudentValidation,
  loginStudentValidation,
  registerStudentValidation,
  updateStudentValidation,
  updateValidation,
} from "../utils/JoiValidation";
import { globalValidator } from "../middleware/globalValidationHandler";

const router: Router = Router();

router.post(
  "/createStudent",
  globalValidator(registerStudentValidation, "body"),
  registerStudent
);
router.get(
  "/loginStudent",
  globalValidator(loginStudentValidation, "body"),
  loginStudent
);

router.use(verifyJWT);
router.get("/getSudent", getStudentById);
router.get("/getStudentList", getStudentList);
router.put(
  "/updateStudent/:_id",
  globalValidator(updateValidation, "params"),
  globalValidator(updateStudentValidation, "body"),
  updateStudent
);
router.delete(
  "/deleteStudent/:_id",
  globalValidator(deleteStudentValidation, "params"),
  deleteStudent
);

export default router;
