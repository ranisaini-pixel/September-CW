import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    congregationName: string;
    otp: string;
    otpExpiration: Date;
    token: string;
    pinCode: string;
    stateId: mongoose.Schema.Types.ObjectId;
    cityId: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}
declare const userModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default userModel;
//# sourceMappingURL=userModel.d.ts.map