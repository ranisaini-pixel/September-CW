import { Router } from "express";
import {
  deleteStudent,
  getStudentById,
  getStudentList,
  loginStudent,
  registerStudent,
  updateStudent,
} from "../controller/studentController";

const router: Router = Router();

router.post("/createStudent", registerStudent);
router.get("/loginStudent", loginStudent);
router.get("/getSudent", getStudentById);
router.get("/getStudentList", getStudentList);
router.put("/updateStudent/:_id", updateStudent);
router.delete("/deleteStudent/:_id", deleteStudent);

export default router;
