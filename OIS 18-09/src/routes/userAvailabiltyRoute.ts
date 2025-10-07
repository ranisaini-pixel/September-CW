import { Router } from "express";
import { globalValidator } from "../middleware/globalValidationHandler";
import { userAvailability } from "../controller/userAvailabilityController";
import { userAvailabilityValidation } from "../utils/JoiValidation";
import { verifyJWT } from "../middleware/jwtVerify";
import { ApiError } from "../utils/ApiError";

const router: Router = Router();

router.use(verifyJWT);
router.put(
  "/availability",
  globalValidator(userAvailabilityValidation, "body"),
  userAvailability
);

export default router;
