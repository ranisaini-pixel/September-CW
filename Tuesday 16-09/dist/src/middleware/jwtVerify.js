"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const studentModel_1 = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const verifyJWT = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            res.status(402).json({
                code: 402,
                status: "failed",
                message: "Unauthorized request",
            });
            return;
        }
        // Verify token
        const decodedTokenInfo = jwt.verify(token, process.env.PRIVATE_KEY);
        const student = await studentModel_1.default.findById(decodedTokenInfo.id);
        console.log(student, "details");
        if (!student) {
            res.status(402).json({
                status: "failed",
                message: "Unauthorized Token",
            });
            return;
        }
        // Attach user to request
        res.locals.student = student;
        next();
    }
    catch (error) {
        res.status(401).json({
            status: "failed",
            error: error?.message,
            message: "Invalid Access Token",
        });
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwtVerify.js.map