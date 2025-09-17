import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ApiResponse } from "../utils/ApiResponse";

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      //   return res.status(400).json(new ApiResponse(400,err))
      return res.status(400).json({
        code: 400,
        message: error.message,
      });
    }

    next();
  };
};

export const queryvalidator = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      //   return res.status(400).json(new ApiResponse(400,err))
      return res.status(400).json({
        code: 400,
        message: error.message,
      });
    }

    next();
  };
};

export const paramsValidator = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      //   return res.status(400).json(new ApiResponse(400,err))
      return res.status(400).json({
        code: 400,
        message: error.message,
      });
    }

    next();
  };
};
