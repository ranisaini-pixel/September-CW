import mongoose, { Document } from "mongoose";
export interface IState extends Document {
    name: string;
    countryId: mongoose.Schema.Types.ObjectId;
}
declare const stateModel: mongoose.Model<IState, {}, {}, {}, mongoose.Document<unknown, {}, IState, {}, {}> & IState & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default stateModel;
//# sourceMappingURL=stateModel.d.ts.map