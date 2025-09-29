import { Router } from "express";
import { loginAdmin } from "../controllers/commentController";
const router = Router();

router.get("/getUsersList", loginAdmin);

export default router;
