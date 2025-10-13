import { NextFunction, Request, Response } from "express";
export declare const userAvailability: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const respondToAvailabilityRequest: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const getAvailabilityRequestsList: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=requestUser.d.ts.map