"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.getCityById = exports.getCityList = exports.createCity = void 0;
const cityModel_1 = require("../models/cityModel");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const createCity = async (req, res) => {
    try {
        const { name, stateId } = req.body;
        if (!name || !stateId) {
            return next(new ApiError_1.ApiError(400, "name and stateId required"));
        }
        else {
            const existedCity = await cityModel_1.default.findOne({ name });
            if (existedCity) {
                return next(new ApiError_1.ApiError(400, "City already exists"));
            }
            else {
                const newCity = new cityModel_1.default({
                    name,
                    stateId,
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
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.createCity = createCity;
const getCityList = async (req, res) => {
    try {
        const cityList = await cityModel_1.default.find();
        if (!cityList) {
            return next(new ApiError_1.ApiError(400, "Cities are not found"));
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "Cities List", cityList));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.getCityList = getCityList;
const getCityById = async (req, res) => {
    try {
        const { _id } = req.query;
        const city = await cityModel_1.default.findById({ _id });
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
const updateCity = async (req, res) => {
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
const deleteCity = async (req, res) => {
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
//# sourceMappingURL=cityController.js.map