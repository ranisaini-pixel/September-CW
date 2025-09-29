declare class ApiError extends Error {
    statusCode: number;
    data: null;
    success: boolean;
    errors: any[];
    constructor(statusCode: number, message?: string, errors?: any[], stack?: string);
}
export { ApiError };
//# sourceMappingURL=ApiError.d.ts.map