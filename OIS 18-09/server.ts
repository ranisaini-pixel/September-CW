import * as express from "express";
import mongoose from "mongoose";
import adminRoute from "./src/routes/adminRoute";
import userRoute from "./src/routes/userRoute";
import stateRoute from "./src/routes/stateRoute";
import cityRoute from "./src/routes/cityRoute";
import congregationRoute from "./src/routes/congregationRoute";
import userAvailabilityRoute from "./src/routes/userAvailabiltyRoute";
import { MONGO_URI } from "./constant";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { task } from "./src/cron/node-cron";
import * as cookieparser from "cookie-parser";
import globalErrorHandler from "./src/middleware/globalErrorHandler";

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

app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/state", stateRoute);
app.use("/city", cityRoute);
app.use("/congregation", congregationRoute);
app.use("/userAvailability", userAvailabilityRoute);

// app.get("*", (req, res) => {
//   return res
//     .status(400)
//     .json(new ApiResponse(400, "Welcome to CodingWorkx", null));
// });

// app.all("/*", (req, res, next) => {
//   next(new ApiError(404, `This path ${req.originalUrl} isn't on this server!`));
// });
task.start();

app.use(globalErrorHandler);

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
