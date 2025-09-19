"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityList = exports.deleteCity = exports.updateCity = exports.getCityById = exports.createCity = void 0;
const cityModel_1 = require("../models/cityModel");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const createCity = async (req, res, next) => {
    try {
        const { name, state } = req.body;
        const existedCity = await cityModel_1.default.findOne({ name });
        if (existedCity) {
            return next(new ApiError_1.ApiError(400, "City already exists"));
        }
        else {
            const newCity = new cityModel_1.default({
                name,
                state,
            });
            let createdCity = await newCity.save();
            if (!createdCity) {
                return next(new ApiError_1.ApiError(400, "something went wrong while creating the city"));
            }
            return res
                .status(201)
                .json(new ApiResponse_1.ApiResponse(201, "City created successfully", createdCity));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.createCity = createCity;
// export const getCityList = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Pagination
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;
//     // Filtering
//     let filter = {};
//     if (req.query.searchTerm) {
//       filter = [
//         { name: { $regex: req.query.searchTerm, $options: "i" } },
//         // Add other fields you want to search here
//         { category: { $regex: req.query.searchTerm, $options: "i" } },
//         { subCategory: { $regex: req.query.searchTerm, $options: "i" } },
//       ];
//     }
//     const cityList = await cityModel.find().populate("state", "name").exec();
//     if (!cityList) {
//       return next(new ApiError(400, "Cities are not found"));
//     } else {
//       return res
//         .status(200)
//         .json(new ApiResponse(200, "Cities List", cityList));
//     }
//   } catch (error: any) {
//     console.log("Error:", error);
//     next(error);
//   }
// };
const getCityById = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const city = await cityModel_1.default
            .findById({ _id })
            .populate("state", "name")
            .exec();
        if (!city) {
            return next(new ApiError_1.ApiError(400, "City not found"));
        }
        else {
            return res.status(200).json(new ApiResponse_1.ApiResponse(200, "City Details", city));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.getCityById = getCityById;
const updateCity = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const updatedCity = await cityModel_1.default.findByIdAndUpdate({ _id }, {
            $set: {
                name: req.body.name,
            },
        }, { new: true });
        if (!updatedCity) {
            return next(new ApiError_1.ApiError(400, "City not found"));
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "City updated successfully", updatedCity));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.updateCity = updateCity;
const deleteCity = async (req, res, next) => {
    try {
        const { name } = req.params;
        const deleted = await cityModel_1.default.deleteOne({ name });
        if (deleted.deletedCount === 0) {
            return next(new ApiError_1.ApiError(400, "City not found"));
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "City deleted successfully", exports.deleteCity));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.deleteCity = deleteCity;
function next(arg0) {
    throw new Error("Function not implemented.");
}
const getCityList = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Filtering
        let filter = {};
        if (req.query.searchTerm) {
            const search = req.query.searchTerm;
            filter = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } },
                    { subCategory: { $regex: search, $options: "i" } },
                ],
            };
        }
        const cityList = await cityModel_1.default
            .find(filter)
            .populate("state", "name")
            .skip(skip)
            .limit(limit)
            .exec();
        const totalCount = await cityModel_1.default.countDocuments(filter);
        if (!cityList || cityList.length === 0) {
            return next(new ApiError_1.ApiError(404, "No cities found"));
        }
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, "Cities List", {
            cities: cityList,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        }));
    }
    catch (error) {
        console.error("Error:", error);
        next(error);
    }
};
exports.getCityList = getCityList;
//# sourceMappingURL=cityController.js.map