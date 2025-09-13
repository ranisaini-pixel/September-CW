"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.getCountryById = exports.getCountryList = exports.createCountry = void 0;
const countryModel_1 = require("../models/countryModel");
const console_1 = require("console");
const createCountry = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required",
            });
        }
        else {
            const existedCountry = await countryModel_1.default.findOne({ name });
            if (existedCountry) {
                return res.status(400).json({
                    message: "Country already exists",
                });
            }
            else {
                const newCountry = new countryModel_1.default({
                    name,
                });
                let createdCountry = await newCountry.save();
                if (!createdCountry) {
                    return res.status(400).json({
                        status: "error",
                        message: "something went wrong while creating the country",
                    });
                }
                return res.status(201).json({
                    message: "Country created successfully",
                    country: createdCountry,
                });
            }
        }
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(400).json({
            message: "Error creating country:",
        });
    }
};
exports.createCountry = createCountry;
const getCountryList = async (req, res) => {
    try {
        const countryList = await countryModel_1.default.find();
        if (!countryList) {
            return res.status(400).json({
                message: "Countries are not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Country Details",
                countryList,
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
exports.getCountryList = getCountryList;
const getCountryById = async (req, res) => {
    try {
        const { _id } = req.query;
        const country = await countryModel_1.default.findById({ _id });
        if (!country) {
            return res.status(400).json({
                message: "Country not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Country Details",
                country,
            });
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Error getting country",
        });
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
            return res.status(400).json({
                message: "Country not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Country Detail updated",
                updatedCountry,
            });
        }
    }
    catch {
        console.log("Error:", console_1.error);
        return res.status(500).json({
            message: "Error updating country",
        });
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res) => {
    try {
        const { name } = req.params;
        const deleted = await countryModel_1.default.deleteOne({ name });
        if (deleted.deletedCount === 0) {
            return res.status(400).json({
                message: "Country not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Country deleted",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting country",
        });
    }
};
exports.deleteCountry = deleteCountry;
//# sourceMappingURL=countryController.js.map