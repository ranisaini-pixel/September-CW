import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  rollNo: number;
  name: string;
  password: string;
  collegeName: string;
  token: string;
  course: string;
  country: mongoose.Schema.Types.ObjectId;
  state: mongoose.Schema.Types.ObjectId;
  city: mongoose.Schema.Types.ObjectId;
}

const stateSchema: Schema<IStudent> = new Schema(
  {
    rollNo: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "countries",
      required: true,
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: "states",
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "students",
  }
);

const studentModel = mongoose.model<IStudent>("students", stateSchema);
export default studentModel;
