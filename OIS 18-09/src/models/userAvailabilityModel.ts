import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IUserAvailability extends Document {
  userId: ObjectId;
  expiry: Date;
}

const userAvailabilitySchema: Schema<IUserAvailability> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "user_availabilities",
    versionKey: false,
  }
);

const userAvailabilityModel = mongoose.model<IUserAvailability>(
  "user_availabilities",
  userAvailabilitySchema
);

export default userAvailabilityModel;
