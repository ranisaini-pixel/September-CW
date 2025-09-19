"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    congregationName: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    pinCode: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    state: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "states",
        required: true,
    },
    city: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "cities",
        required: true,
    },
}, {
    timestamps: true,
    collection: "students",
});
const userModel = mongoose_1.default.model("users", userSchema);
exports.default = userModel;
//# sourceMappingURL=userModel.js.map