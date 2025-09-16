import { Request, Response } from "express";
export declare const createCountry: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCountryList: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCountryByName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const searchCountryByName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCountry: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCountry: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=countryController.d.ts.map