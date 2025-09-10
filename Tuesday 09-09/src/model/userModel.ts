import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  rollNo: number;
  collegeName: string;
  name: string;
  course: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    rollNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    collegeName: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema); //move to contant
export default UserModel;
