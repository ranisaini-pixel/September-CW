"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cityController_1 = require("../controller/cityController");
const router = (0, express_1.Router)();
router.post("/saveCity", cityController_1.createCity);
router.get("/getCityDetail", cityController_1.getCityByName);
router.get("/getCityList", cityController_1.getCityList);
router.put("/update/:_id", cityController_1.updateCity);
router.delete("/delete/:name", cityController_1.deleteCity);
exports.default = router;
//# sourceMappingURL=cityRoute.js.map