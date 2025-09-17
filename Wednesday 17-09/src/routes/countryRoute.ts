import { Router } from "express";
import {
  createCountry,
  deleteCountry,
  getCountryById,
  getCountryList,
  updateCountry,
} from "../controller/countryController";
import {
  paramsValidator,
  queryvalidator,
  validate,
} from "../middleware/ValidateSchema";
import {
  createCountryValidation,
  deleteCountryParamsValidation,
  getCountryByIdQueryValidation,
  updateCountryParamsValidation,
  updateCountryValidation,
} from "../utils/JoiValidation";

const router: Router = Router();

router.post("/saveCountry", validate(createCountryValidation), createCountry);
router.get(
  "/getCountryDetail",
  queryvalidator(getCountryByIdQueryValidation),
  getCountryById
);
router.get("/getCountryList", getCountryList);
router.put(
  "/update/:_id",
  paramsValidator(updateCountryParamsValidation),
  validate(updateCountryValidation),
  updateCountry
);
router.delete(
  "/delete/:name",
  paramsValidator(deleteCountryParamsValidation),
  deleteCountry
);

export default router;
