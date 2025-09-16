"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.getStateById = exports.getStateList = exports.createState = void 0;
const stateModel_1 = require("../models/stateModel");
const console_1 = require("console");
const createState = async (req, res) => {
    try {
        const { name, countryId } = req.body;
        if (!name || !countryId) {
            return res.status(400).json({
                message: "All Fields are required",
            });
        }
        else {
            const existedState = await stateModel_1.default.findOne({ name });
            if (existedState) {
                return res.status(400).json({
                    message: "State already exists",
                });
            }
            else {
                const newState = new stateModel_1.default({
                    name,
                    countryId,
                });
                let createdState = await newState.save();
                if (!createdState) {
                    return res.status(400).json({
                        status: "error",
                        message: "something went wrong while creating the state",
                    });
                }
                return res.status(201).json({
                    message: "State created successfully",
                    state: createdState,
                });
            }
        }
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(400).json({
            message: "Error creating state:",
        });
    }
};
exports.createState = createState;
const getStateList = async (req, res) => {
    try {
        const stateList = await stateModel_1.default.find();
        if (!stateList) {
            return res.status(400).json({
                message: "states are not found",
            });
        }
        else {
            return res.status(201).json({
                message: "state Details",
                stateList,
            });
        }
    }
    catch {
        console.log("Error:", console_1.error);
        return res.status(500).json({
            message: "Error getting state List",
        });
    }
};
exports.getStateList = getStateList;
const getStateById = async (req, res) => {
    try {
        const { _id } = req.query;
        const state = await stateModel_1.default
            .findById({ _id })
            .populate({ path: "country", strictPopulate: false })
            .exec();
        console.log(state, "74");
        if (!state) {
            return res.status(400).json({
                message: "state not found",
            });
        }
        else {
            return res.status(201).json({
                message: "State Details",
                state,
            });
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Error getting state",
        });
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
            return res.status(400).json({
                message: "State not found",
            });
        }
        else {
            return res.status(201).json({
                message: "State Detail updated",
                updatedState,
            });
        }
    }
    catch {
        console.log("Error:", console_1.error);
        return res.status(500).json({
            message: "Error updating states",
        });
    }
};
exports.updateState = updateState;
const deleteState = async (req, res) => {
    try {
        const { name } = req.params;
        const deleted = await stateModel_1.default.deleteOne({ name });
        if (deleted.deletedCount === 0) {
            return res.status(400).json({
                message: "State not found",
            });
        }
        else {
            return res.status(201).json({
                message: "State deleted",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting country",
        });
    }
};
exports.deleteState = deleteState;
//# sourceMappingURL=stateController.js.map