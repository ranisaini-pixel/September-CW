"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stateController_1 = require("../controller/stateController");
const router = (0, express_1.Router)();
router.post("/saveState", stateController_1.createState);
router.get("/getStateDetail", stateController_1.getStateById);
router.get("/getStateList", stateController_1.getStateList);
router.put("/updateState/:_id", stateController_1.updateState);
router.delete("/deleteState/:name", stateController_1.deleteState);
exports.default = router;
//# sourceMappingURL=stateRoute.js.map