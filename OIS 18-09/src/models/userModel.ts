import { boolean } from "joi";
import mongoose, { Document, Schema, ObjectId } from "mongoose";

enum genderType {
  male = "0",
  female = "1",
}

enum roleType {
  user = "0",
  admin = "1",
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  gender: genderType;
  email: string;
  password: string;
  congregationName: string;
  otp: string;
  otpExpiration: Date;
  token: string;
  role: roleType;
  pinCode: string;
  stateId: ObjectId;
  cityId: ObjectId;
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
      enum: genderType,
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
      enum: roleType,
      default: roleType.user,
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
    collection: "users",
    versionKey: false,
  }
);

const userModel = mongoose.model<IUser>("users", userSchema);
export default userModel;
