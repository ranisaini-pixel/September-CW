import { Router } from "express";
import {
  createState,
  deleteState,
  getStateById,
  getStateList,
  updateState,
} from "../controller/stateController";
import {
  paramsValidator,
  queryvalidator,
  validate,
} from "../middleware/ValidateSchema";
import {
  createStateValidation,
  deleteStateParamsValidation,
  getStateByIdQueryValidation,
  updateStateParamsValidation,
  updateStateValidation,
} from "../utils/JoiValidation";

const router: Router = Router();

router.post("/saveState", validate(createStateValidation), createState);
router.get(
  "/getStateDetail",
  queryvalidator(getStateByIdQueryValidation),
  getStateById
);
router.get("/getStateList", getStateList);
router.put(
  "/updateState/:_id",
  paramsValidator(updateStateParamsValidation),
  validate(updateStateValidation),
  updateState
);
router.delete(
  "/deleteState/:name",
  paramsValidator(deleteStateParamsValidation),
  deleteState
);

export default router;
