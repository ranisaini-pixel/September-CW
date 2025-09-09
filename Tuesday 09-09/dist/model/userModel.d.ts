import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    rollNo: number;
    collegeName: string;
    name: string;
    course: string;
}
declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default UserModel;
//# sourceMappingURL=userModel.d.ts.map