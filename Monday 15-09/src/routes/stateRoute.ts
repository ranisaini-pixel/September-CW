import { Router } from "express";
import {
  createState,
  deleteState,
  getStateById,
  getStateList,
  updateState,
} from "../controller/stateController";

const router: Router = Router();

router.post("/saveState", createState);
router.get("/getStateDetail", getStateById);
router.get("/getStateList", getStateList);
router.put("/updateState/:_id", updateState);
router.delete("/deleteState/:name", deleteState);

export default router;
