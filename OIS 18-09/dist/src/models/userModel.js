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
        enum: ["0", "1", "2"], //0=female, 1=male, 2=other
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
    otpExpiration: {
        type: Date,
    },
    pinCode: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    stateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "states",
        required: true,
    },
    cityId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "cities",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    timestamps: true,
    collection: "students",
});
const userModel = mongoose_1.default.model("users", userSchema);
exports.default = userModel;
//# sourceMappingURL=userModel.js.map