"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.default.Schema({}, { strict: false, collection: "movies" });
const movieModel = mongoose_1.default.model("movies", movieSchema);
exports.default = movieModel;
//# sourceMappingURL=movieModel.js.map