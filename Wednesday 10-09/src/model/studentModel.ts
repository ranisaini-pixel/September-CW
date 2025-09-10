import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  rollNo: number;
  password: string;
  collegeName: string;
  name: string;
  course: string;
}

const studentSchema: Schema<IStudent> = new Schema(
  {
    rollNo: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
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
    course: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model<IStudent>("User", studentSchema);
export default StudentModel;
