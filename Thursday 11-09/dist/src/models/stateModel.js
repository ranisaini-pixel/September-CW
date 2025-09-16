"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    countryName: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Country",
            required: true,
        },
    ],
}, { timestamps: true });
const stateModel = mongoose_1.default.model("State", stateSchema);
exports.default = stateModel;
//# sourceMappingURL=stateModel.js.map