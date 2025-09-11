import { Router } from "express";
import {
  createState,
  deleteState,
  getStateByName,
  getStateList,
  updateState,
} from "../controller/stateController";

const router: Router = Router();

router.post("/saveState", createState);
router.get("/getStateDetail", getStateByName);
router.get("/getStateList", getStateList);
router.put("/updateState/:_id", updateState);
router.delete("/deleteState/:name", deleteState);

export default router;
