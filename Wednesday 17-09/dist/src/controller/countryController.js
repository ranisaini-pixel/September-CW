"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.getCountryById = exports.getCountryList = exports.createCountry = void 0;
const countryModel_1 = require("../models/countryModel");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const createCountry = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new ApiError_1.ApiError(400, "Name is required");
        }
        else {
            const existedCountry = await countryModel_1.default.findOne({ name });
            if (existedCountry) {
                throw new ApiError_1.ApiError(400, "Country already exists");
            }
            else {
                const newCountry = new countryModel_1.default({
                    name,
                });
                let createdCountry = await newCountry.save();
                if (!createdCountry) {
                    throw new ApiError_1.ApiError(400, "something went wrong while creating the country");
                }
                return res
                    .status(200)
                    .json(new ApiResponse_1.ApiResponse(200, "Country created successfully", createdCountry));
            }
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.createCountry = createCountry;
const getCountryList = async (req, res) => {
    try {
        const countryList = await countryModel_1.default.find();
        if (!countryList) {
            throw new ApiError_1.ApiError(400, "Countries are not found");
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "Countries List", countryList));
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.getCountryList = getCountryList;
const getCountryById = async (req, res) => {
    try {
        const { _id } = req.query;
        const country = await countryModel_1.default.findById({ _id });
        if (!country) {
            throw new ApiError_1.ApiError(400, "Country not found");
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "Country Details", country));
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.getCountryById = getCountryById;
const updateCountry = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedCountry = await countryModel_1.default.findByIdAndUpdate({ _id }, {
            $set: {
                name: req.body.name,
            },
        }, { new: true });
        if (!updatedCountry) {
            throw new ApiError_1.ApiError(400, "Country not found");
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "Country details updated", exports.updateCountry));
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res) => {
    try {
        const { name } = req.params;
        const deleted = await countryModel_1.default.deleteOne({ name });
        if (deleted.deletedCount === 0) {
            throw new ApiError_1.ApiError(400, "Country not found");
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "Country deleted successfully", null));
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.deleteCountry = deleteCountry;
//# sourceMappingURL=countryController.js.map