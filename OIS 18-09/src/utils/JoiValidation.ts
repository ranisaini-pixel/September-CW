import * as Joi from "joi";

export const signupUserValidation = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First Name is required",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last Name is required",
  }),
  gender: Joi.string().trim().required().valid("0", "1", "2").messages({
    "string.empty": "Gender is required",
  }),
  role: Joi.string().valid("1").trim().messages({
    "string.empty": " Role is required",
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
      "string.pattern.base":
        "Password must only contain numbers (no special characters and characters).",
    }),
  congregationName: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .trim()
    .required()
    .messages({
      "string.empty": "Congregation Name is required",
      "string.pattern.base":
        "Congregation Name must only contain letters and numbers (no special characters).",
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
      "string.pattern.base":
        "Password must only contain numbers (no special characters and characters).",
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

export const loginUserValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "in"] } })
    .required(),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export const sendOTPValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "in"] } })
    .required(),
});

export const OTPVerificationValidation = Joi.object({
  otp: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(6)
    .required()
    .messages({
      "string.empty": "OTP is required",
      "string.min": "OTP must be at least 6 characters long",
      "string.pattern.base":
        "OTP must only contain numbers (no special characters and characters).",
    }),
});

export const updateValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const updateUserValidation = Joi.object({
  firstName: Joi.string().trim().messages({
    "string.empty": "First Name is required",
  }),
  lastName: Joi.string().trim().messages({
    "string.empty": "Last Name is required",
  }),
  gender: Joi.string().trim().valid("0", "1", "2").messages({
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
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
  city: Joi.string().trim().messages({
    "string.empty": "City is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const resetPasswordValidation = Joi.object({
  password: Joi.string()
    .min(8)
    .max(15)
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/,
      "password"
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 15 characters long",
      "string.pattern.name":
        "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    }),

  confirmPassword: Joi.string()
    .min(8)
    .max(15)
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/,
      "password"
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 15 characters long",
      "string.pattern.name":
        "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    }),
});

export const changePasswordValidation = Joi.object({
  oldPassword: Joi.string()
    .min(8)
    .max(15)
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/,
      "password"
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 15 characters long",
      "string.pattern.name":
        "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    }),
  currentPassword: Joi.string()
    .min(8)
    .max(15)
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/,
      "password"
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 15 characters long",
      "string.pattern.name":
        "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    }),

  confirmPassword: Joi.string()
    .min(8)
    .max(15)
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,15}$/,
      "password"
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 15 characters long",
      "string.pattern.name":
        "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    }),
});

export const addCongregationValidation = Joi.object({
  congregationName: Joi.string().trim().required().messages({
    "string.empty": "First Name is required",
  }),
  congregationState: Joi.string().trim().required().messages({
    "string.empty": "Last Name is required",
  }),
  congregationCity: Joi.string().trim().required().messages({
    "string.empty": "Last Name is required",
  }),
  zipCode: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(6)
    .required()
    .messages({
      "string.empty": "Pin Code is required",
      "string.min": "Pin Code must be at least 6 characters long",
      "string.pattern.base":
        "Password must only contain numbers (no special characters and characters).",
    }),
});

export const updateCSCValidation = Joi.object({
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

export const searchTearmValidation = Joi.object({
  searchTerm: Joi.string().trim().required().messages({
    "string.empty": "searchTearm is required",
  }),
});

export const deleteStudentValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const createCountryValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
});

export const getByIdValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const deleteCSCValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
});

export const createStateValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  countryId: Joi.string().required().messages({
    "string.empty": "Country Id is required",
  }),
});

export const createCityValidation = Joi.object({
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
