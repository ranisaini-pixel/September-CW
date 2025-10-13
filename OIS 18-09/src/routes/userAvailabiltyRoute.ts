import { Router } from "express";
import { globalValidator } from "../middleware/globalValidationHandler";
import {
  getUserAvailabilityList,
  userAvailability,
} from "../controller/userAvailabilityController";
import {
  searchTearmValidation,
  userAvailabilityValidation,
} from "../utils/JoiValidation";
import { verifyJWT } from "../middleware/jwtVerify";

const router: Router = Router();

router.use(verifyJWT);
router.put(
  "/availability",
  globalValidator(userAvailabilityValidation, "body"),
  userAvailability
);

router.get(
  "/getUserAvailabilityList",
  globalValidator(searchTearmValidation, "query"),
  getUserAvailabilityList
);

export default router;
