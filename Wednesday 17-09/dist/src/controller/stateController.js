"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.getStateById = exports.getStateList = exports.createState = void 0;
const stateModel_1 = require("../models/stateModel");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const createState = async (req, res) => {
    try {
        const { name, countryId } = req.body;
        if (!name || !countryId) {
            throw new ApiError_1.ApiError(400, "All Fields are required");
        }
        else {
            const existedState = await stateModel_1.default.findOne({ name });
            if (existedState) {
                throw new ApiError_1.ApiError(400, "State already exists");
            }
            else {
                const newState = new stateModel_1.default({
                    name,
                    countryId,
                });
                let createdState = await newState.save();
                if (!createdState) {
                    throw new ApiError_1.ApiError(400, "something went wrong while creating the state");
                }
                return res
                    .status(200)
                    .json(new ApiResponse_1.ApiResponse(200, "State created successfully", createdState));
            }
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.createState = createState;
const getStateList = async (req, res) => {
    try {
        const stateList = await stateModel_1.default.find();
        if (!stateList) {
            throw new ApiError_1.ApiError(400, "states not found");
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "States List", stateList));
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.getStateList = getStateList;
const getStateById = async (req, res) => {
    try {
        const { _id } = req.query;
        const state = await stateModel_1.default.findById({ _id });
        if (!state) {
            throw new ApiError_1.ApiError(400, "state not found");
        }
        else {
            return res.status(200).json(new ApiResponse_1.ApiResponse(200, "State details", state));
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.getStateById = getStateById;
const updateState = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedState = await stateModel_1.default.findByIdAndUpdate({ _id }, {
            $set: {
                name: req.body.name,
            },
        }, { new: true });
        if (!updatedState) {
            throw new ApiError_1.ApiError(400, "State not found");
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "State details updated", updatedState));
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.updateState = updateState;
const deleteState = async (req, res) => {
    try {
        const { name } = req.params;
        const deleted = await stateModel_1.default.deleteOne({ name });
        if (deleted.deletedCount === 0) {
            throw new ApiError_1.ApiError(400, "State not found");
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "State deleted successfully", null));
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, error.message, null));
    }
};
exports.deleteState = deleteState;
//# sourceMappingURL=stateController.js.map