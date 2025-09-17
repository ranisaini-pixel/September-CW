import mongoose, { Document, Schema } from "mongoose";

export interface ICity extends Document {
  name: string;
  stateId: mongoose.Schema.Types.ObjectId;
}

const citySchema: Schema<ICity> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "cities",
  }
);

const cityModel = mongoose.model<ICity>("cities", citySchema);
export default cityModel;
