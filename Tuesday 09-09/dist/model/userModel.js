"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    rollNo: { type: Number, required: true, trim: true, unique: true },
    name: { type: String, required: true },
    collegeName: { type: String, required: true },
    course: { type: String, required: true },
}, { timestamps: true });
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map