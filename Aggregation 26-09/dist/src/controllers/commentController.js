"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const commentModel_1 = require("../models/commentModel");
const loginAdmin = async (req, res, next) => {
    try {
        const { rating } = req.query;
        let data = await commentModel_1.default.aggregate([
            {
                $lookup: {
                    from: "movies",
                    localField: "movie_id",
                    foreignField: "_id",
                    as: "movies_Details",
                },
            },
            {
                $unwind: "$movies_Details", // flatten lookup array
            },
            {
                $match: {
                    "movies_Details.imdb.rating": { $gt: Number(rating) },
                },
            },
            {
                $project: {
                    date: 1,
                    email: 1,
                    "movies_Details.title": 1,
                    "movies_Details.imdb.rating": 1,
                },
            },
        ]);
        console.log(data, "------------------------------------------");
        return res.json({
            data,
        });
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.loginAdmin = loginAdmin;
//# sourceMappingURL=commentController.js.map