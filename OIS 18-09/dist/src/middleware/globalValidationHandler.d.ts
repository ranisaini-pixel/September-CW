import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
type ValidationTarget = "body" | "query" | "params";
export declare const globalValidator: (schema: ObjectSchema, target: ValidationTarget) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=globalValidationHandler.d.ts.map