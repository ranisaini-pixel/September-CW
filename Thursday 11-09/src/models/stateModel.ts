import mongoose, { Document, Schema } from "mongoose";

export interface IState extends Document {
  name: string;
  countryName: mongoose.Schema.Types.ObjectId;
}

const stateSchema: Schema<IState> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    countryName: [
      {
        type: Schema.Types.ObjectId,
        ref: "Country",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const stateModel = mongoose.model<IState>("State", stateSchema);
export default stateModel;
