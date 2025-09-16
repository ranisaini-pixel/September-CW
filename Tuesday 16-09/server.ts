import * as express from "express";
import mongoose from "mongoose";
import studentRoute from "./src/routes/studentRoute";
import countryRoute from "./src/routes/countryRoute";
import stateRoute from "./src/routes/stateRoute";
import cityRoute from "./src/routes/cityRoute";
import { MONGO_URI } from "./constant";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// const PORT = 8000;

app.use("/student", studentRoute);
app.use("/country", countryRoute);
app.use("/state", stateRoute);
app.use("/city", cityRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
