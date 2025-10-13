import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IState extends Document {
  name: string;
  countryId: ObjectId;
}

const stateSchema: Schema<IState> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    countryId: {
      type: Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "states",
    versionKey: false,
  }
);

const stateModel = mongoose.model<IState>("states", stateSchema);
export default stateModel;
