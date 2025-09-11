import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Geography");

    console.log("Mongodb Connected Successful");
  } catch (error) {
    console.log("Mongodb Connection Failed");
  }
};

export default connectDb;
