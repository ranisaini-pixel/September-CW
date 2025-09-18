"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalValidator = void 0;
const globalValidator = (schema, target = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[target], {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: true,
        });
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });
        }
        //this will replace previous value with the new value
        req[target] = value;
        next();
    };
};
exports.globalValidator = globalValidator;
//# sourceMappingURL=globalValidationHandler.js.map