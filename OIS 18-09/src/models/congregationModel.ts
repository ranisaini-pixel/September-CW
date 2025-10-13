import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface ICongregation extends Document {
  congregationName: string;
  congregationState: ObjectId;
  congregationCity: ObjectId;
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
    versionKey: false,
  }
);

const congregationModel = mongoose.model<ICongregation>(
  "congregations",
  congregationSchema
);
export default congregationModel;
