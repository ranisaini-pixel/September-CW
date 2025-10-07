"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAvailability = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const userAvailabilityModel_1 = require("../models/userAvailabilityModel");
const userAvailability = async (req, res, next) => {
    try {
        const { expiry } = req.body;
        const userId = res.locals.user._id;
        if (!userId)
            return;
        const existedExpiry = await userAvailabilityModel_1.default.findOne({ userId });
        if (existedExpiry) {
            return next(new ApiError_1.ApiError(400, "Expiry time remaining"));
        }
        else {
            const newExpiryTime = new userAvailabilityModel_1.default({
                userId,
                expiry: expiry,
            });
            let setExpiryTime = await newExpiryTime.save();
            if (!setExpiryTime) {
                return next(new ApiError_1.ApiError(400, "Expiry Time not set"));
            }
            return res
                .status(201)
                .json(new ApiResponse_1.ApiResponse(201, "Expiry Time set successfully", {}));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.userAvailability = userAvailability;
//# sourceMappingURL=userAvailabilityController.js.map