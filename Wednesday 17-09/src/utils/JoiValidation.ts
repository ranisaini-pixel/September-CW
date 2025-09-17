import * as Joi from "joi";

export const registerStudentValidation = Joi.object({
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

export const loginStudentValidation = Joi.object({
  rollNo: Joi.number().required().messages({
    "string.empty": "Roll number is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export const updateStudentParamsValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const updateStudentValidation = Joi.object({
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

export const deleteStudentParamsValidation = Joi.object({
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

export const getCountryByIdQueryValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const updateCountryParamsValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const updateCountryValidation = Joi.object({
  name: Joi.string().trim(),
});

export const deleteCountryParamsValidation = Joi.object({
  name: Joi.string().hex().length(24).required().messages({
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

export const getStateByIdQueryValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const updateStateParamsValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const updateStateValidation = Joi.object({
  name: Joi.string().trim(),
});

export const deleteStateParamsValidation = Joi.object({
  name: Joi.string().hex().length(24).required().messages({
    "string.empty": "name is required",
  }),
});

export const createCityValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  stateId: Joi.string().required().messages({
    "string.empty": "State Id is required",
  }),
});

export const getCityByNameQueryValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const updateCityParamsValidation = Joi.object({
  _id: Joi.string().hex().length(24).required().messages({
    "string.empty": "_id is required",
    "string.hex": "_id must be a valid hex string",
    "string.length": "_id must be 24 characters long",
  }),
});

export const updateCityValidation = Joi.object({
  name: Joi.string().trim(),
});

export const deleteCityParamsValidation = Joi.object({
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
