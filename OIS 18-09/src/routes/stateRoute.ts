import { Router } from "express";
import {
  createState,
  deleteState,
  getStateById,
  getStateList,
  updateState,
} from "../controller/stateController";

import {
  createStateValidation,
  updateValidation,
  updateCSCValidation,
  deleteCSCValidation,
  getByIdValidation,
} from "../utils/JoiValidation";
import { globalValidator } from "../middleware/globalValidationHandler";

const router: Router = Router();

router.post(
  "/saveState",
  globalValidator(createStateValidation, "body"),
  createState
);
router.get(
  "/getStateDetail",
  globalValidator(getByIdValidation, "query"),
  getStateById
);
router.get("/getStateList", getStateList);
router.put(
  "/updateState/:_id",
  globalValidator(updateValidation, "params"),
  globalValidator(updateCSCValidation, "body"),
  updateState
);
router.delete(
  "/deleteState/:name",
  globalValidator(deleteCSCValidation, "params"),
  deleteState
);

export default router;
