import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

type ValidationTarget = "body" | "query" | "params";

export const globalValidator = (
  schema: ObjectSchema,
  target: ValidationTarget = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
