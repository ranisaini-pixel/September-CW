"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const studentModel_1 = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
dotenv.config();
const verifyJWT = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError_1.ApiError(401, "Unauthorized request");
        }
        // Verify token
        const decodedTokenInfo = jwt.verify(token, process.env.PRIVATE_KEY);
        const student = await studentModel_1.default.findById(decodedTokenInfo.id);
        if (!student) {
            throw new ApiError_1.ApiError(401, "Unauthorized request");
        }
        if (token !== student?.token) {
            throw new ApiError_1.ApiError(401, "Unauthorized request");
        }
        // Attach user to request
        res.locals.student = student;
        next();
    }
    catch (error) {
        console.log("Error:", error);
        res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwtVerify.js.map