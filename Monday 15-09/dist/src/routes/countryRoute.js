"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countryController_1 = require("../controller/countryController");
const router = (0, express_1.Router)();
router.post("/saveCountry", countryController_1.createCountry);
router.get("/getCountryDetail", countryController_1.getCountryById);
router.get("/getCountryList", countryController_1.getCountryList);
router.put("/update/:_id", countryController_1.updateCountry);
router.delete("/delete/:name", countryController_1.deleteCountry);
exports.default = router;
//# sourceMappingURL=countryRoute.js.map