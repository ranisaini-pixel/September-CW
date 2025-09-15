"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    stateName: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "State",
        required: true,
    },
}, {
    timestamps: true,
    collection: "cities",
});
const cityModel = mongoose_1.default.model("cities", citySchema);
exports.default = cityModel;
//# sourceMappingURL=cityModel.js.map