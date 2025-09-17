"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            //   return res.status(400).json(new ApiResponse(400,err))
            return res.status(400).json({
                code: 400,
                errors: error.details.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        }
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=ValidateSchema.js.map