"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cityController_1 = require("../controller/cityController");
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const JoiValidation_1 = require("../utils/JoiValidation");
const router = (0, express_1.Router)();
router.post("/saveCity", (0, ValidateSchema_1.validate)(JoiValidation_1.createCityValidation), cityController_1.createCity);
router.get("/getCityDetail", (0, ValidateSchema_1.queryvalidator)(JoiValidation_1.getCityByNameQueryValidation), cityController_1.getCityByName);
router.get("/getCityList", cityController_1.getCityList);
router.put("/update/:_id", (0, ValidateSchema_1.paramsValidator)(JoiValidation_1.updateCityParamsValidation), (0, ValidateSchema_1.validate)(JoiValidation_1.updateCityValidation), cityController_1.updateCity);
router.delete("/delete/:name", (0, ValidateSchema_1.paramsValidator)(JoiValidation_1.deleteCityParamsValidation), cityController_1.deleteCity);
exports.default = router;
//# sourceMappingURL=cityRoute.js.map