"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    rollNo: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    collegeName: {
        type: String,
        required: true,
        trim: true,
    },
    course: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
const StudentModel = mongoose_1.default.model("User", studentSchema); //move to constant
exports.default = StudentModel;
//# sourceMappingURL=userModel.js.map