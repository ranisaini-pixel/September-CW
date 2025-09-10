import mongoose, { Document } from "mongoose";
export interface IStudent extends Document {
    rollNo: number;
    password: string;
    collegeName: string;
    name: string;
    course: string;
}
declare const StudentModel: mongoose.Model<IStudent, {}, {}, {}, mongoose.Document<unknown, {}, IStudent, {}, {}> & IStudent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default StudentModel;
//# sourceMappingURL=userModel.d.ts.map