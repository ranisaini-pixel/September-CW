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
  paramsValidator,
  queryvalidator,
  validate,
} from "../middleware/ValidateSchema";
import {
  deleteStudentParamsValidation,
  loginStudentValidation,
  registerStudentValidation,
  updateStudentParamsValidation,
  updateStudentValidation,
} from "../utils/JoiValidation";

const router: Router = Router();

router.post(
  "/createStudent",
  validate(registerStudentValidation),
  registerStudent
);
router.get("/loginStudent", validate(loginStudentValidation), loginStudent);

router.use(verifyJWT);
router.get("/getSudent", getStudentById);
router.get("/getStudentList", getStudentList);
router.put(
  "/updateStudent/:_id",
  paramsValidator(updateStudentParamsValidation),
  validate(updateStudentValidation),
  updateStudent
);
router.delete(
  "/deleteStudent/:_id",
  paramsValidator(deleteStudentParamsValidation),
  deleteStudent
);

export default router;
