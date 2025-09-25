import { Router } from "express";
import {
  createCity,
  deleteCity,
  getCityById,
  getCityList,
  updateCity,
} from "../controller/cityController";
import {
  createCityValidation,
  deleteCSCValidation,
  getByIdValidation,
  searchTearmValidation,
  updateCSCValidation,
  updateValidation,
} from "../utils/JoiValidation";
import { globalValidator } from "../middleware/globalValidationHandler";

const router: Router = Router();

router.post(
  "/saveCity",
  globalValidator(createCityValidation, "body"),
  createCity
);
router.get(
  "/getCityDetail",
  globalValidator(getByIdValidation, "query"),
  getCityById
);
router.get(
  "/getCityList",
  globalValidator(searchTearmValidation, "query"),
  getCityList
);
router.put(
  "/update/:_id",
  globalValidator(updateValidation, "params"),
  globalValidator(updateCSCValidation, "body"),
  updateCity
);
router.delete(
  "/delete/:name",
  globalValidator(deleteCSCValidation, "params"),
  deleteCity
);

export default router;
