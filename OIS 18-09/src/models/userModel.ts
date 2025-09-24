import { boolean } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  congregationName: string;
  otp: string;
  otpExpiration: Date;
  token: string;
  role: string;
  pinCode: string;
  stateId: mongoose.Schema.Types.ObjectId;
  cityId: mongoose.Schema.Types.ObjectId;
  isDeleted: boolean;
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
      enum: ["0", "1", "2"], //0=male, 1=female, 2=other
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
    otpExpiration: {
      type: Date,
    },
    pinCode: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: ["0", "1"], //1=admin and 0=user,
      default: "0",
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "states",
      required: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
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
