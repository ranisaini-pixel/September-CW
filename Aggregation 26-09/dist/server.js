"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const express = require("express");
const commentRoute_1 = require("./src/routes/commentRoute");
const constant_1 = require("./constant");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const globalErrorHandler_1 = require("./src/middleware/globalErrorHandler");
const mongoose_1 = require("mongoose");
dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({
    limit: "16kb",
}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieparser());
// const PORT = 8000;
app.use("/comment", commentRoute_1.default);
app.use(globalErrorHandler_1.default);
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(constant_1.MONGO_URI).then(() => {
            console.log("MongoDB connected");
            app.listen(process.env.PORT, () => {
                console.log(`Server running on ${process.env.PORT}`);
            });
        });
    }
    finally {
    }
};
exports.connectDb = connectDb;
(0, exports.connectDb)().catch(console.dir);
//# sourceMappingURL=server.js.map