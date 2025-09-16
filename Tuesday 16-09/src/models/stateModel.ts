import mongoose, { Document, Schema } from "mongoose";

export interface IState extends Document {
  name: string;
  countryId: mongoose.Schema.Types.ObjectId;
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
  }
);

const stateModel = mongoose.model<IState>("states", stateSchema);
export default stateModel;
