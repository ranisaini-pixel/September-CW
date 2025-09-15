"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
const studentRoute_1 = require("./src/routes/studentRoute");
const countryRoute_1 = require("./src/routes/countryRoute");
const stateRoute_1 = require("./src/routes/stateRoute");
const cityRoute_1 = require("./src/routes/cityRoute");
const constant_1 = require("./constant");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
// const PORT = 8000;
app.use("/student", studentRoute_1.default);
app.use("/country", countryRoute_1.default);
app.use("/state", stateRoute_1.default);
app.use("/city", cityRoute_1.default);
mongoose_1.default
    .connect(constant_1.MONGO_URI)
    .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
//# sourceMappingURL=server.js.map