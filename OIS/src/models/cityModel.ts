import mongoose, { Document, Schema } from "mongoose";

export interface ICity extends Document {
  name: string;
  state: mongoose.Schema.Types.ObjectId;
}

const citySchema: Schema<ICity> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "states",
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
