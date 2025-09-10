"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dbConnect_1 = require("./src/dbConnection/dbConnect");
const userRoute_1 = require("./src/routes/userRoute");
const app = express();
app.use(express.json());
const PORT = 8080;
(0, dbConnect_1.default)();
app.use("/student", userRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
//# sourceMappingURL=server.js.map