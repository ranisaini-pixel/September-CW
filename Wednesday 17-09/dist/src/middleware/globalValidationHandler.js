"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema, target = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[target], {
            abortEarly: false, // collect all errors
            allowUnknown: false, // block extra fields
            stripUnknown: true, // remove extra fields automatically
        });
        if (error) {
            return res.status(400).json({
                code: 400,
                errors: error.details.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        }
        // ✅ replace original data with validated/cleaned one
        req[target] = value;
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=globalValidationHandler.js.map