"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailabilityRequestsList = exports.respondToAvailabilityRequest = exports.userAvailability = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const userAvailabilityModel_1 = require("../models/userAvailabilityModel");
const mongoose_1 = require("mongoose");
const requestUserModel_1 = require("../models/requestUserModel");
const userAvailability = async (req, res, next) => {
    try {
        const { receiverId, content } = req.body;
        const senderId = res.locals.user._id;
        if (!senderId) {
            return next(new ApiError_1.ApiError(400, "Unauthorised "));
        }
        const existingRequest = await requestUserModel_1.default.findOne({
            receiverId,
            senderId,
            content: content,
            status: "0",
        });
        if (existingRequest) {
            return next(new ApiError_1.ApiError(400, "Request already sent and pending"));
        }
        const newRequest = new requestUserModel_1.default({
            receiverId,
            senderId,
            content,
            status: "0",
        });
        await newRequest?.save();
        return res
            .status(200)
            .json(new ApiResponse_1.ApiResponse(200, "Availability request sent successfully", newRequest));
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.userAvailability = userAvailability;
const respondToAvailabilityRequest = async (req, res, next) => {
    try {
        const { status } = req.body;
        const { _id } = req.params; //requestId
        const senderId = res.locals.user?._id; //respond krne wale ki id
        //request exits or not
        const request = await requestUserModel_1.default.findById(_id);
        if (!request) {
            return next(new ApiError_1.ApiError(404, "Request not found"));
        }
        if (request.receiverId.toString() !== senderId.toString()) {
            return next(new ApiError_1.ApiError(403, "Not authorized to respond to this request"));
        }
        //sender and receiver availability
        const senderAvailability = await userAvailabilityModel_1.default.findOne({
            userId: request.senderId,
        });
        const receiverAvailability = await userAvailabilityModel_1.default.findOne({
            userId: request.receiverId,
        });
        const now = new Date();
        if (!senderAvailability || senderAvailability.expiry <= now) {
            return next(new ApiError_1.ApiError(400, "Sender availability has expired"));
        }
        if (!receiverAvailability || receiverAvailability.expiry <= now) {
            return next(new ApiError_1.ApiError(400, "Your availability has expired"));
        }
        request.status = status;
        await request.save();
        return res
            .status(200)
            .json(new ApiResponse_1.ApiResponse(200, `Request ${status} successfully`, request));
    }
    catch (error) {
        console.error("Error", error);
        next(error);
    }
};
exports.respondToAvailabilityRequest = respondToAvailabilityRequest;
const getAvailabilityRequestsList = async (req, res, next) => {
    try {
        const { searchTerm = "", type } = req.query;
        const userId = res.locals.user._id;
        if (!userId) {
            return next(new ApiError_1.ApiError(404, "Unauthorised User"));
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        let pipeline = [];
        let match = {};
        if (type === "0") {
            match = {
                $match: {
                    senderId: new mongoose_1.default.Types.ObjectId(userId),
                },
            };
        }
        else {
            match = {
                $match: {
                    receiverId: new mongoose_1.default.Types.ObjectId(userId),
                },
            };
        }
        pipeline.push(match);
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "receiverId",
                foreignField: "_id",
                as: "ReceiveRequestList",
            },
        }, {
            $unwind: {
                path: "$ReceiveRequestList",
            },
        }, {
            $match: {
                $or: [
                    {
                        "ReceiveRequestList.firstName": {
                            $regex: searchTerm,
                            $options: "i",
                        },
                    },
                    {
                        "ReceiveRequestList.lastName": {
                            $regex: searchTerm,
                            $options: "i",
                        },
                    },
                ],
            },
        }, {
            $project: {
                content: 1,
                status: 1,
                createdAt: 1,
                ReceivedRequest: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                },
            },
        }, { $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit });
        const requests = await requestUserModel_1.default.aggregate(pipeline);
        const totalCount = await requestUserModel_1.default.countDocuments(type === "0" ? { senderId: userId } : { receiverId: userId });
        return res.status(200).json(new ApiResponse_1.ApiResponse(200, "List fetched successfully", {
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
            },
            data: requests,
        }));
    }
    catch (error) {
        console.error("Error fetching request list:", error);
        next(error);
    }
};
exports.getAvailabilityRequestsList = getAvailabilityRequestsList;
//# sourceMappingURL=requestUser.js.map