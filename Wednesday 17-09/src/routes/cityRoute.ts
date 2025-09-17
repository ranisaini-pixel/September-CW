import { Router } from "express";
import {
  createCity,
  deleteCity,
  getCityByName,
  getCityList,
  updateCity,
} from "../controller/cityController";
import {
  paramsValidator,
  queryvalidator,
  validate,
} from "../middleware/ValidateSchema";
import {
  createCityValidation,
  deleteCityParamsValidation,
  getCityByNameQueryValidation,
  updateCityParamsValidation,
  updateCityValidation,
} from "../utils/JoiValidation";

const router: Router = Router();

router.post("/saveCity", validate(createCityValidation), createCity);
router.get(
  "/getCityDetail",
  queryvalidator(getCityByNameQueryValidation),
  getCityByName
);
router.get("/getCityList", getCityList);
router.put(
  "/update/:_id",
  paramsValidator(updateCityParamsValidation),
  validate(updateCityValidation),
  updateCity
);
router.delete(
  "/delete/:name",
  paramsValidator(deleteCityParamsValidation),
  deleteCity
);

export default router;
