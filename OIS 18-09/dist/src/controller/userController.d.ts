import { NextFunction, Request, Response } from "express";
export declare const signup: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const loginUser: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const otpVerification: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const updateUser: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const getUserById: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=userController.d.ts.map