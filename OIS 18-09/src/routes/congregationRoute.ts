import { Router } from "express";
import { globalValidator } from "../middleware/globalValidationHandler";
import { addCongregation } from "../controller/congregationController";
import { addCongregationValidation } from "../utils/JoiValidation";

const router: Router = Router();

router.post(
  "/addCongregation",
  globalValidator(addCongregationValidation, "body"),
  addCongregation
);

export default router;
