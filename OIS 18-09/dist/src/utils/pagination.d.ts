import { Model } from "mongoose";
interface PaginationOptions {
    page?: number;
    limit?: number;
    searchTerm?: string;
}
export declare const pagination: (model: Model<any>, options: PaginationOptions) => Promise<{
    data: any;
    pagination: {
        totalDocs: any;
        page: number;
        limit: number;
        totalPages: number;
    };
}>;
export {};
//# sourceMappingURL=pagination.d.ts.map