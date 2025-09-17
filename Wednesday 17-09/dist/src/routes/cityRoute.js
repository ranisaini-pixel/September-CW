"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cityController_1 = require("../controller/cityController");
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const JoiValidation_1 = require("../utils/JoiValidation");
const router = (0, express_1.Router)();
router.post("/saveCity", (0, ValidateSchema_1.validate)(JoiValidation_1.createCityValidation), cityController_1.createCity);
router.get("/getCityDetail", cityController_1.getCityByName);
router.get("/getCityList", cityController_1.getCityList);
router.put("/update/:_id", cityController_1.updateCity);
router.delete("/delete/:name", cityController_1.deleteCity);
exports.default = router;
//# sourceMappingURL=cityRoute.js.map