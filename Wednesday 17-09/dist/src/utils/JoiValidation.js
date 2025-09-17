"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityParamsValidation = exports.updateCityValidation = exports.updateCityParamsValidation = exports.getCityByNameQueryValidation = exports.createCityValidation = exports.deleteStateParamsValidation = exports.updateStateValidation = exports.updateStateParamsValidation = exports.getStateByIdQueryValidation = exports.createStateValidation = exports.deleteCountryParamsValidation = exports.updateCountryValidation = exports.updateCountryParamsValidation = exports.getCountryByIdQueryValidation = exports.createCountryValidation = exports.deleteStudentParamsValidation = exports.updateStudentValidation = exports.updateStudentParamsValidation = exports.loginStudentValidation = exports.registerStudentValidation = void 0;
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
exports.updateStudentParamsValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
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
exports.deleteStudentParamsValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.createCountryValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "name is required",
    }),
});
exports.getCountryByIdQueryValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.updateCountryParamsValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.updateCountryValidation = Joi.object({
    name: Joi.string().trim(),
});
exports.deleteCountryParamsValidation = Joi.object({
    name: Joi.string().hex().length(24).required().messages({
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
exports.getStateByIdQueryValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.updateStateParamsValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.updateStateValidation = Joi.object({
    name: Joi.string().trim(),
});
exports.deleteStateParamsValidation = Joi.object({
    name: Joi.string().hex().length(24).required().messages({
        "string.empty": "name is required",
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
exports.getCityByNameQueryValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.updateCityParamsValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.updateCityValidation = Joi.object({
    name: Joi.string().trim(),
});
exports.deleteCityParamsValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "name is required",
    }),
});
// status: Joi.number()
//   .valid(0, 1, 2)
//   .optional()
//   .messages({
//     "number.base": "Status must be a number",
//     "any.only": "Status must be 0 (pending), 1 (approved), or 2 (rejected)",
//   }),
//# sourceMappingURL=JoiValidation.js.map