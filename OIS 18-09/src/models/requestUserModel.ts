import mongoose, { Document, Schema, ObjectId } from "mongoose";

enum statusType {
  pending = "0",
  confirmed = "1",
  cancelled = "2",
}

enum preferenceType {
  "I can Drive" = "0",
  "I Need a Ride" = "1",
}

enum responseType {
  "Yes! Text Me" = "0",
  "Yes! Call Me" = "1",
  "I Can't Right" = "2",
  "Possibly Later" = "3",
  "Text Me" = "4",
  "Call Me" = "5",
}

export interface IRequestUser extends Document {
  receiverId: ObjectId;
  senderId: ObjectId;
  preference: preferenceType;
  numberOfPassenger: Number;
  response: responseType;
  status: statusType;
}

const requestUserSchema: Schema<IRequestUser> = new Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    preference: {
      type: String,
      enum: preferenceType,
      required: true,
    },
    numberOfPassenger: {
      type: Number,
    },
    response: {
      type: String,
      enum: responseType,
      default: null,
    },
    status: {
      type: String,
      enum: statusType,
      default: statusType.pending,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "requestedUsers",
    versionKey: false,
  }
);

const requestUserModel = mongoose.model<IRequestUser>(
  "requestedUsers",
  requestUserSchema
);
export default requestUserModel;
