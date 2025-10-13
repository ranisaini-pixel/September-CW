"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestUser_1 = require("../controller/requestUser");
const jwtVerify_1 = require("../middleware/jwtVerify");
const router = (0, express_1.Router)();
router.use(jwtVerify_1.verifyJWT);
router.post("/availabilityRequest", 
//   globalValidator(createCityValidation, "body"),
requestUser_1.userAvailability);
router.put("/responsAvailabilityRequest/:_id", 
//   globalValidator(createCityValidation, "body"),
requestUser_1.respondToAvailabilityRequest);
router.get("/requestList", 
//   globalValidator(createCityValidation, "body"),
requestUser_1.getAvailabilityRequestsList);
exports.default = router;
//# sourceMappingURL=requestUserRoute.js.map