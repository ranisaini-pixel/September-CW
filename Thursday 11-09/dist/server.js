"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dbConnect_1 = require("./src/dbConnection/dbConnect");
const countryRoute_1 = require("./src/routes/countryRoute");
const stateRoute_1 = require("./src/routes/stateRoute");
const cityRoute_1 = require("./src/routes/cityRoute");
const app = express();
app.use(express.json());
const PORT = 8080;
(0, dbConnect_1.default)();
app.use("/country", countryRoute_1.default);
app.use("/state", stateRoute_1.default);
app.use("/city", cityRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
//# sourceMappingURL=server.js.map