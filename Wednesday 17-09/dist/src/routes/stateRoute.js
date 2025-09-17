"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stateController_1 = require("../controller/stateController");
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const JoiValidation_1 = require("../utils/JoiValidation");
const router = (0, express_1.Router)();
router.post("/saveState", (0, ValidateSchema_1.validate)(JoiValidation_1.createStateValidation), stateController_1.createState);
router.get("/getStateDetail", (0, ValidateSchema_1.queryvalidator)(JoiValidation_1.getStateByIdQueryValidation), stateController_1.getStateById);
router.get("/getStateList", stateController_1.getStateList);
router.put("/updateState/:_id", (0, ValidateSchema_1.paramsValidator)(JoiValidation_1.updateStateParamsValidation), (0, ValidateSchema_1.validate)(JoiValidation_1.updateStateValidation), stateController_1.updateState);
router.delete("/deleteState/:name", (0, ValidateSchema_1.paramsValidator)(JoiValidation_1.deleteStateParamsValidation), stateController_1.deleteState);
exports.default = router;
//# sourceMappingURL=stateRoute.js.map