import mongoose from "mongoose";
declare const movieModel: mongoose.Model<{}, {}, {}, {}, mongoose.Document<unknown, {}, {}, {}, {
    strict: false;
    collection: string;
}> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    strict: false;
    collection: string;
}, {}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{}>, {}, mongoose.ResolveSchemaOptions<{
    strict: false;
    collection: string;
}>> & mongoose.FlatRecord<{}> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>>;
export default movieModel;
//# sourceMappingURL=movieModel.d.ts.map