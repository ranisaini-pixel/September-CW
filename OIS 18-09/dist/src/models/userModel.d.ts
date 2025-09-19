import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    congregationName: string;
    otp: string;
    token: string;
    pinCode: string;
    state: mongoose.Schema.Types.ObjectId;
    city: mongoose.Schema.Types.ObjectId;
}
declare const userModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default userModel;
//# sourceMappingURL=userModel.d.ts.map