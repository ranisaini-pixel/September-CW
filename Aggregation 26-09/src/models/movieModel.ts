import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {},
  { strict: false, collection: "movies" }
);

const movieModel = mongoose.model("movies", movieSchema);
export default movieModel;
