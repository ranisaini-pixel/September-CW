import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/studentsData"
    );

    console.log("Mongodb Connected Successful");
  } catch (error) {
    console.log("Mongodb Connection Failed");
  }
};

export default connectDb;
