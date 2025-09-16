import { Request, Response } from "express";
export declare const createState: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getStateList: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getStateByName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateState: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteState: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=stateController.d.ts.map