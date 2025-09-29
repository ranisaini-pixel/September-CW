import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {},
  { strict: false, collection: "comments" }
);

const commentModel = mongoose.model("comments", commentSchema);
export default commentModel;
