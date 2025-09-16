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

const router: Router = Router();

router.post("/createStudent", registerStudent);
router.get("/loginStudent", loginStudent);
router.get("/getSudent", verifyJWT, getStudentById);
router.get("/getStudentList", verifyJWT, getStudentList);
router.put("/updateStudent/:_id", verifyJWT, updateStudent);
router.delete("/deleteStudent/:_id", verifyJWT, deleteStudent);

export default router;
