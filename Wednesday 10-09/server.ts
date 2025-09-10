import * as express from "express";
import connectDb from "./src/dbConnection/dbConnect";
import userRoute from "./src/routes/studentRoute";

const app = express();

app.use(express.json());

const PORT = 8080;
connectDb();

app.use("/student", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
