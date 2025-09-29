"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.default.Schema({}, { strict: false, collection: "comments" });
const commentModel = mongoose_1.default.model("comments", commentSchema);
exports.default = commentModel;
//# sourceMappingURL=commentModel.js.map