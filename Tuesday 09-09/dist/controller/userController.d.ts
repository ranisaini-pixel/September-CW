import { IncomingMessage, ServerResponse } from "http";
export declare class StudentController {
    static registerStudent(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse<IncomingMessage> | undefined>;
    static login(req: IncomingMessage, res: ServerResponse): Promise<void>;
    static update(req: IncomingMessage, res: ServerResponse): Promise<void>;
    static delete(res: ServerResponse, req: IncomingMessage): Promise<void>;
}
//# sourceMappingURL=userController.d.ts.map