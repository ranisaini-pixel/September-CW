import { Router } from "express";
import {
  createCountry,
  deleteCountry,
  getCountryById,
  getCountryList,
  updateCountry,
} from "../controller/countryController";

const router: Router = Router();

router.post("/saveCountry", createCountry);
router.get("/getCountryDetail", getCountryById);
router.get("/getCountryList", getCountryList);
router.put("/update/:_id", updateCountry);
router.delete("/delete/:name", deleteCountry);

export default router;
