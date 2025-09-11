import * as express from "express";
import connectDb from "./src/dbConnection/dbConnect";
import countryRoute from "./src/routes/countryRoute";
import stateRoute from "./src/routes/stateRoute";
import cityRoute from "./src/routes/cityRoute";

const app = express();

app.use(express.json());

const PORT = 8080;
connectDb();

app.use("/country", countryRoute);
app.use("/state", stateRoute);
app.use("/city", cityRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
