import { Router } from "express";
import { globalValidator } from "../middleware/globalValidationHandler";
import {
  getAvailabilityRequestsList,
  getRequestById,
  respondToAvailabilityRequest,
  userAvailability,
} from "../controller/requestUser";
import { verifyJWT } from "../middleware/jwtVerify";

const router: Router = Router();

router.use(verifyJWT);
router.post(
  "/availabilityRequest",
  //   globalValidator(createCityValidation, "body"),
  userAvailability
);

router.put(
  "/responsAvailabilityRequest/:_id",
  //   globalValidator(createCityValidation, "body"),
  respondToAvailabilityRequest
);

router.get(
  "/requestList",
  //   globalValidator(createCityValidation, "body"),
  getAvailabilityRequestsList
);

router.get(
  "/requestListById",
  //   globalValidator(createCityValidation, "body"),
  getRequestById
);

export default router;
