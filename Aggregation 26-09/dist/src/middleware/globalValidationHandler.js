"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalValidator = void 0;
const globalValidator = (schema, target) => {
    return async (req, res, next) => {
        try {
            const value = await schema.validateAsync(req[target]);
            // if (error) {
            //   return res.status(400).json({
            //     code: 400,
            //     message: error.message,
            //   });
            // }
            //this will replace previous value with the new value
            req[target] = value;
            // Object.assign(req[target], value);
            console.log(value, "value");
            next();
        }
        catch (error) { }
    };
};
exports.globalValidator = globalValidator;
//# sourceMappingURL=globalValidationHandler.js.map