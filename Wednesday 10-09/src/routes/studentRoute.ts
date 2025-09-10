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

router.post("/register", registerStudent);
router.get("/login", loginStudent);
router.get("/getStudent", getStudentById);
router.get("/getStudentList", getStudentList);
router.put("/update/:rollNo", updateStudent);
router.delete("/delete/:rollNo", deleteStudent);

export default router;
