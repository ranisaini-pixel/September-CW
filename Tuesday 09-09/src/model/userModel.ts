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
      trim: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      collegeName: { type: String, required: true },
    },
    course: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
