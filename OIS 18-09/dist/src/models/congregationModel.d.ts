import mongoose, { Document } from "mongoose";
export interface ICongregation extends Document {
    congregationName: string;
    congregationState: mongoose.Schema.Types.ObjectId;
    congregationCity: mongoose.Schema.Types.ObjectId;
    zipCode: string;
}
declare const congregationModel: mongoose.Model<ICongregation, {}, {}, {}, mongoose.Document<unknown, {}, ICongregation, {}, {}> & ICongregation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default congregationModel;
//# sourceMappingURL=congregationModel.d.ts.map