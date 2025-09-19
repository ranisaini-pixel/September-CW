"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.getStateById = exports.getStateList = exports.createState = void 0;
const stateModel_1 = require("../models/stateModel");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const createState = async (req, res, next) => {
    try {
        const { name, countryId } = req.body;
        if (!name || !countryId) {
            return next(new ApiError_1.ApiError(400, "name and countryId required"));
        }
        else {
            const existedState = await stateModel_1.default.findOne({ name });
            if (existedState) {
                return next(new ApiError_1.ApiError(400, "State already exists"));
            }
            else {
                const newState = new stateModel_1.default({
                    name,
                    countryId,
                });
                let createdState = await newState.save();
                if (!createdState) {
                    return next(new ApiError_1.ApiError(400, "something went wrong while creating the state"));
                }
                return res
                    .status(201)
                    .json(new ApiResponse_1.ApiResponse(201, "State created successfully", createdState));
            }
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.createState = createState;
const getStateList = async (req, res, next) => {
    try {
        const stateList = await stateModel_1.default.find();
        if (!stateList) {
            return next(new ApiError_1.ApiError(400, "States not found"));
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "States List", stateList));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.getStateList = getStateList;
const getStateById = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const state = await stateModel_1.default.findById({ _id });
        if (!state) {
            return next(new ApiError_1.ApiError(400, "state not found"));
        }
        else {
            return res.status(200).json(new ApiResponse_1.ApiResponse(200, "State details", state));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.getStateById = getStateById;
const updateState = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const updatedState = await stateModel_1.default.findByIdAndUpdate({ _id }, {
            $set: {
                name: req.body.name,
            },
        }, { new: true });
        if (!updatedState) {
            return next(new ApiError_1.ApiError(400, "State not found"));
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "State details updated", updatedState));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.updateState = updateState;
const deleteState = async (req, res, next) => {
    try {
        const { name } = req.params;
        const deleted = await stateModel_1.default.deleteOne({ name });
        if (deleted.deletedCount === 0) {
            return next(new ApiError_1.ApiError(400, "State not found"));
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "State deleted successfully", null));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.deleteState = deleteState;
function next(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=stateController.js.map