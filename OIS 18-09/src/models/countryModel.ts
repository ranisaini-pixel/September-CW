import mongoose, { Document, Schema } from "mongoose";

export interface ICountry extends Document {
  name: string;
}

const countrySchema: Schema<ICountry> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: "countries",
    versionKey: false,
  }
);

const countryModel = mongoose.model<ICountry>("countries", countrySchema);
export default countryModel;
