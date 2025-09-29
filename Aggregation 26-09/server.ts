import * as express from "express";
import commentRoute from "./src/routes/commentRoute";
import { MONGO_URI } from "./constant";
import * as dotenv from "dotenv";
import * as cors from "cors";
import * as cookieparser from "cookie-parser";
import globalErrorHandler from "./src/middleware/globalErrorHandler";
import mongoose from "mongoose";

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

app.use("/comment", commentRoute);

app.use(globalErrorHandler);

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI).then(() => {
      console.log("MongoDB connected");

      app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`);
      });
    });
  } finally {
  }
};

connectDb().catch(console.dir);
