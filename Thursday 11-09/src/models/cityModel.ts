import mongoose, { Document, mongo, Schema } from "mongoose";

export interface ICity extends Document {
  name: string;
  stateName: mongoose.Schema.Types.ObjectId;
}

const citySchema: Schema<ICity> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    stateName: [
      {
        type: Schema.Types.ObjectId,
        ref: "State",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const cityModel = mongoose.model<ICity>("City", citySchema);
export default cityModel;
