"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCityValidation = exports.createStateValidation = exports.deleteCSCValidation = exports.getByIdValidation = exports.createCountryValidation = exports.deleteStudentValidation = exports.updateCSCValidation = exports.changePasswordValidation = exports.resetPasswordValidation = exports.updateUserValidation = exports.updateValidation = exports.OTPVerificationValidation = exports.sendOTPValidation = exports.loginUserValidation = exports.signupUserValidation = void 0;
const Joi = require("joi");
exports.signupUserValidation = Joi.object({
    firstName: Joi.string().trim().required().messages({
        "string.empty": "First Name is required",
    }),
    lastName: Joi.string().trim().required().messages({
        "string.empty": "Last Name is required",
    }),
    gender: Joi.string().trim().required().messages({
        "string.empty": "Gender is required",
    }),
    email: Joi.string()
        .email({ tlds: { allow: ["com", "in"] } })
        .required(),
    password: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(6)
        .max(6)
        .trim()
        .required()
        .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base": "Password must only contain numbers (no special characters and characters).",
    }),
    congregationName: Joi.string()
        .pattern(/^[a-zA-Z0-9]+$/)
        .trim()
        .required()
        .messages({
        "string.empty": "Congregation Name is required",
        "string.pattern.base": "Congregation Name must only contain letters and numbers (no special characters).",
        "any.required": "Password is required.",
    }),
    pinCode: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(6)
        .max(6)
        .required()
        .messages({
        "string.empty": "Pin Code is required",
        "string.min": "Pin Code must be at least 6 characters long",
        "string.pattern.base": "Password must only contain numbers (no special characters and characters).",
    }),
    stateId: Joi.string().hex().length(24).trim().required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
    cityId: Joi.string().hex().length(24).trim().required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.loginUserValidation = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: ["com", "in"] } })
        .required(),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
    }),
});
exports.sendOTPValidation = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: ["com", "in"] } })
        .required(),
});
exports.OTPVerificationValidation = Joi.object({
    otp: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(6)
        .max(6)
        .required()
        .messages({
        "string.empty": "OTP is required",
        "string.min": "OTP must be at least 6 characters long",
        "string.pattern.base": "OTP must only contain numbers (no special characters and characters).",
    }),
});
exports.updateValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.updateUserValidation = Joi.object({
    firstName: Joi.string().trim().messages({
        "string.empty": "First Name is required",
    }),
    lastName: Joi.string().trim().messages({
        "string.empty": "Last Name is required",
    }),
    gender: Joi.string().trim().messages({
        "string.empty": "Gender is required",
    }),
    email: Joi.string().email({ tlds: { allow: ["com", "in"] } }),
    congregationName: Joi.string().trim().messages({
        "string.empty": "Congregation Name is required",
    }),
    pinCode: Joi.string().min(6).messages({
        "string.empty": "Pin Code is required",
        "string.min": "Pin Code must be at least 6 characters long",
    }),
    state: Joi.string().trim().messages({
        "string.empty": "State is required",
    }),
    city: Joi.string().trim().messages({
        "string.empty": "City is required",
    }),
});
exports.resetPasswordValidation = Joi.object({
    password: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(6)
        .max(6)
        .trim()
        .required()
        .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base": "Password must only contain numbers (no special characters and characters).",
    }),
    confirmPassword: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(6)
        .max(6)
        .trim()
        .required()
        .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base": "Password must only contain numbers (no special characters and characters).",
    }),
});
exports.changePasswordValidation = Joi.object({
    oldPassword: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(6)
        .max(6)
        .trim()
        .required()
        .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base": "Password must only contain numbers (no special characters and characters).",
    }),
    currentPassword: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(6)
        .max(6)
        .trim()
        .required()
        .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base": "Password must only contain numbers (no special characters and characters).",
    }),
    confirmPassword: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(6)
        .max(6)
        .trim()
        .required()
        .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base": "Password must only contain numbers (no special characters and characters).",
    }),
});
exports.updateCSCValidation = Joi.object({
    name: Joi.string().trim(),
    countryId: Joi.string().hex().length(24).messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
    stateId: Joi.string().hex().length(24).messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.deleteStudentValidation = Joi.object({
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
exports.getByIdValidation = Joi.object({
    _id: Joi.string().hex().length(24).required().messages({
        "string.empty": "_id is required",
        "string.hex": "_id must be a valid hex string",
        "string.length": "_id must be 24 characters long",
    }),
});
exports.deleteCSCValidation = Joi.object({
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
    state: Joi.string().required().messages({
        "string.empty": "State Id is required",
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