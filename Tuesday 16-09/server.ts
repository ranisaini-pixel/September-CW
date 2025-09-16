import * as express from "express";
import mongoose from "mongoose";
import studentRoute from "./src/routes/studentRoute";
import countryRoute from "./src/routes/countryRoute";
import stateRoute from "./src/routes/stateRoute";
import cityRoute from "./src/routes/cityRoute";
import { MONGO_URI } from "./constant";
import * as dotenv from "dotenv";
import * as cors from "cors";
import * as cookieparser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieparser());

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
