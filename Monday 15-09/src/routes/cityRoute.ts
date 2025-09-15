import { Router } from "express";
import {
  createCity,
  deleteCity,
  getCityByName,
  getCityList,
  updateCity,
} from "../controller/cityController";

const router: Router = Router();

router.post("/saveCity", createCity);
router.get("/getCityDetail", getCityByName);
router.get("/getCityList", getCityList);
router.put("/update/:_id", updateCity);
router.delete("/delete/:name", deleteCity);

export default router;
