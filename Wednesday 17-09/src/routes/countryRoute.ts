import { Router } from "express";
import {
  createCountry,
  deleteCountry,
  getCountryById,
  getCountryList,
  updateCountry,
} from "../controller/countryController";

import {
  createCountryValidation,
  deleteCSCValidation,
  getByIdValidation,
  updateCSCValidation,
  updateValidation,
} from "../utils/JoiValidation";
import { globalValidator } from "../middleware/globalValidationHandler";

const router: Router = Router();

router.post(
  "/saveCountry",
  globalValidator(createCountryValidation, "body"),
  createCountry
);
router.get(
  "/getCountryDetail",
  globalValidator(getByIdValidation, "query"),
  getCountryById
);
router.get("/getCountryList", getCountryList);
router.put(
  "/update/:_id",
  globalValidator(updateValidation, "params"),
  globalValidator(updateCSCValidation, "body"),
  updateCountry
);
router.delete(
  "/delete/:name",
  globalValidator(deleteCSCValidation, "params"),
  deleteCountry
);

export default router;
