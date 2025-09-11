import { Router } from "express";
import {
  createCountry,
  deleteCountry,
  getCountryByName,
  getCountryList,
  searchCountryByName,
  updateCountry,
} from "../controller/countryController";

const router: Router = Router();

router.post("/saveCountry", createCountry);
router.get("/getCountryDetail", getCountryByName);
router.get("/getCountryByName", searchCountryByName);
router.get("/getCountryList", getCountryList);
router.put("/update/:_id", updateCountry);
router.delete("/delete/:name", deleteCountry);

export default router;
