import mongoose, { Document, Schema } from "mongoose";

export interface ICongregation extends Document {
  congregationName: string;
  congregationState: mongoose.Schema.Types.ObjectId;
  congregationCity: mongoose.Schema.Types.ObjectId;
  zipCode: string;
}

const congregationSchema: Schema<ICongregation> = new Schema(
  {
    congregationName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    congregationState: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "states",
      required: true,
    },
    congregationCity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "congregations",
  }
);

const congregationModel = mongoose.model<ICongregation>(
  "congregations",
  congregationSchema
);
export default congregationModel;
