import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface ICity extends Document {
  name: string;
  state: ObjectId;
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
    versionKey: false,
  }
);

const cityModel = mongoose.model<ICity>("cities", citySchema);
export default cityModel;
