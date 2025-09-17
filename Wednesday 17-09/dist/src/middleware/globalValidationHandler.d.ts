import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
type ValidationTarget = "body" | "query" | "params";
export declare const validate: (schema: ObjectSchema, target?: ValidationTarget) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=globalValidationHandler.d.ts.map