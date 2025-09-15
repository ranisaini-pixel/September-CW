"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.getCityByName = exports.getCityList = exports.createCity = void 0;
const cityModel_1 = require("../models/cityModel");
const console_1 = require("console");
const createCity = async (req, res) => {
    try {
        const { name, stateName } = req.body;
        if (!name || !stateName) {
            return res.status(400).json({
                message: "All Fields are required",
            });
        }
        else {
            const existedCity = await cityModel_1.default.findOne({ name });
            if (existedCity) {
                return res.status(400).json({
                    message: "City already exists",
                });
            }
            else {
                const newCity = new cityModel_1.default({
                    name,
                    stateName,
                });
                let createdCity = await newCity.save();
                if (!createdCity) {
                    return res.status(400).json({
                        status: "error",
                        message: "something went wrong while creating the city",
                    });
                }
                return res.status(201).json({
                    message: "City created successfully",
                    country: createdCity,
                });
            }
        }
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(400).json({
            message: "Error creating city:",
        });
    }
};
exports.createCity = createCity;
const getCityList = async (req, res) => {
    try {
        const cityList = await cityModel_1.default
            .find()
            .populate({ path: "country", strictPopulate: false })
            .exec();
        if (!cityList) {
            return res.status(400).json({
                message: "Cities are not found",
            });
        }
        else {
            return res.status(201).json({
                message: "City Details",
                cityList,
            });
        }
    }
    catch {
        console.log("Error:", console_1.error);
        return res.status(500).json({
            message: "Error getting country List",
        });
    }
};
exports.getCityList = getCityList;
const getCityByName = async (req, res) => {
    try {
        const { _id } = req.query;
        const city = await cityModel_1.default
            .findById({ _id })
            .populate({ path: "State", strictPopulate: false })
            .exec();
        if (!city) {
            return res.status(400).json({
                message: "City not found",
            });
        }
        else {
            return res.status(201).json({
                message: "City Details",
                city,
            });
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Error getting city",
        });
    }
};
exports.getCityByName = getCityByName;
const updateCity = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedCity = await cityModel_1.default.findByIdAndUpdate({ _id }, {
            $set: {
                name: req.body.name,
            },
        }, { new: true });
        if (!updatedCity) {
            return res.status(400).json({
                message: "City not found",
            });
        }
        else {
            return res.status(201).json({
                message: "City Detail updated",
                updatedCity,
            });
        }
    }
    catch {
        console.log("Error:", console_1.error);
        return res.status(500).json({
            message: "Error updating city",
        });
    }
};
exports.updateCity = updateCity;
const deleteCity = async (req, res) => {
    try {
        const { name } = req.params;
        const deleted = await cityModel_1.default.deleteOne({ name });
        if (deleted.deletedCount === 0) {
            return res.status(400).json({
                message: "City not found",
            });
        }
        else {
            return res.status(201).json({
                message: "City deleted",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting city",
        });
    }
};
exports.deleteCity = deleteCity;
//# sourceMappingURL=cityController.js.map