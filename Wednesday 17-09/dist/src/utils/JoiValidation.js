"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCityValidation = exports.createStateValidation = exports.deleteCountryValidation = exports.createCountryValidation = exports.updateStudentValidation = exports.loginStudentValidation = exports.registerStudentValidation = void 0;
const Joi = require("joi");
exports.registerStudentValidation = Joi.object({
    rollNo: Joi.number().required().messages({
        "string.empty": "Roll number is required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
    }),
    name: Joi.string().trim().required().messages({
        "string.empty": "Name is required",
    }),
    collegeName: Joi.string().trim().required().messages({
        "string.empty": "College name is required",
    }),
    course: Joi.string().trim().required().messages({
        "string.empty": "Course is required",
    }),
    country: Joi.string().trim().required().messages({
        "string.empty": "Country is required",
    }),
    state: Joi.string().trim().required().messages({
        "string.empty": "State is required",
    }),
    city: Joi.string().trim().required().messages({
        "string.empty": "City is required",
    }),
});
exports.loginStudentValidation = Joi.object({
    rollNo: Joi.number().required().messages({
        "string.empty": "Roll number is required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
    }),
});
exports.updateStudentValidation = Joi.object({
    password: Joi.string().min(6).messages({
        "string.min": "Password must be at least 6 characters long",
    }),
    name: Joi.string().trim(),
    collegeName: Joi.string().trim(),
    course: Joi.string().trim(),
    country: Joi.string().trim(),
    state: Joi.string().trim(),
    city: Joi.string().trim(),
});
exports.createCountryValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "name is required",
    }),
});
exports.deleteCountryValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "name is required",
    }),
});
exports.createStateValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "name is required",
    }),
    countryId: Joi.string().required().messages({
        "string.empty": "Country Id is required",
    }),
});
exports.createCityValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "name is required",
    }),
    stateId: Joi.string().required().messages({
        "string.empty": "State Id is required",
    }),
});
//# sourceMappingURL=JoiValidation.js.map