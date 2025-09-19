import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  congregationName: string;
  otp: string;
  token: string;
  pinCode: string;
  state: mongoose.Schema.Types.ObjectId;
  city: mongoose.Schema.Types.ObjectId;
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    congregationName: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    pinCode: {
      type: String,
      required: true,
    },
    token: {
      type: String,
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

const userModel = mongoose.model<IUser>("users", userSchema);
export default userModel;
