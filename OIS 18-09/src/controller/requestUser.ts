import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import userAvailabilityModel, {
  IUserAvailability,
} from "../models/userAvailabilityModel";
import mongoose from "mongoose";
import requestUserModel, { IRequestUser } from "../models/requestUserModel";
import { preferences } from "joi";

export const userAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiverId, preference, numberOfPassenger } = req.body;

    const senderId = res.locals.user._id;

    if (!senderId) {
      return next(new ApiError(400, "Unauthorised "));
    }

    const existingRequest = await requestUserModel.findOne({
      receiverId,
      senderId,
      preference: preference,
      status: "0",
    });

    if (existingRequest) {
      return next(new ApiError(400, "Request already sent and pending"));
    }

    if (preference === "0") {
      const newRequest: IRequestUser = new requestUserModel({
        receiverId,
        senderId,
        preference,
        numberOfPassenger: numberOfPassenger,
        status: "0",
      });

      await newRequest?.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Availability request sent successfully",
            newRequest
          )
        );
    } else {
      const newRequest: IRequestUser = new requestUserModel({
        receiverId,
        senderId,
        preference,
        numberOfPassenger: null,
        status: "0",
      });

      await newRequest?.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Availability request sent successfully",
            newRequest
          )
        );
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const respondToAvailabilityRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, response } = req.body;
    const { _id } = req.params; //requestId
    const senderId = res.locals.user?._id; //respond krne wale ki id

    //request exits or not
    const request = await requestUserModel.findById(_id);
    if (!request) {
      return next(new ApiError(404, "Request not found"));
    }

    if (request.receiverId.toString() !== senderId.toString()) {
      return next(
        new ApiError(403, "Not authorized to respond to this request")
      );
    }

    //sender and receiver availability
    const senderAvailability = await userAvailabilityModel.findOne({
      userId: request.senderId,
    });

    const receiverAvailability = await userAvailabilityModel.findOne({
      userId: request.receiverId,
    });

    const now = new Date();

    if (!senderAvailability || senderAvailability.expiry <= now) {
      return next(new ApiError(400, "Sender availability has expired"));
    }

    if (!receiverAvailability || receiverAvailability.expiry <= now) {
      return next(new ApiError(400, "Your availability has expired"));
    }

    request.status = status;
    request.response = response;
    await request.save();

    return res
      .status(200)
      .json(new ApiResponse(200, `Request ${status} successfully`, request));
  } catch (error: any) {
    console.error("Error", error);
    next(error);
  }
};

export const getAvailabilityRequestsList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchTerm = "", type } = req.query;
    const userId = res.locals.user._id;

    if (!userId) {
      return next(new ApiError(404, "Unauthorised User"));
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    let pipeline: any[] = [];
    let match: any = {};
    if (type === "0") {
      match = {
        $match: {
          senderId: new mongoose.Types.ObjectId(userId),
        },
      };
    } else {
      match = {
        $match: {
          receiverId: new mongoose.Types.ObjectId(userId),
        },
      };
    }
    pipeline.push(match);
    pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "receiverId",
          foreignField: "_id",
          as: "ReceiveRequestList",
        },
      },
      {
        $unwind: {
          path: "$ReceiveRequestList",
        },
      },
      {
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
      },
      {
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
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    );

    const requests = await requestUserModel.aggregate(pipeline);
    const totalCount = await requestUserModel.countDocuments(
      type === "0" ? { senderId: userId } : { receiverId: userId }
    );

    return res.status(200).json(
      new ApiResponse(200, "List fetched successfully", {
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
        },
        data: requests,
      })
    );
  } catch (error) {
    console.error("Error fetching request list:", error);
    next(error);
  }
};

// export const getRequestById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { _id } = req.query;

//   const request = await requestUserModel
//     .findById({ _id })
//     .populate("senderId", "firstName lastName congregationName");

//   return res.status(200).json(
//     new ApiResponse(200, "Your Request", {
//       senderDetails: request,
//       // RequestDetail: ,
//     })
//   );
// };

export const getRequestById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, searchTerm = "" } = req.query;

    const pipeline: any[] = [
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "senderDetails",
        },
      },
      { $unwind: "$senderDetails" },
    ];

    if (searchTerm && searchTerm !== "") {
      pipeline.push({
        $match: {
          $or: [
            {
              "senderDetails.firstName": {
                $regex: searchTerm,
                $options: "i",
              },
            },
            {
              "senderDetails.lastName": {
                $regex: searchTerm,
                $options: "i",
              },
            },
          ],
        },
      });
    }

    pipeline.push({
      $project: {
        firstName: "$senderDetails.firstName",
        lastName: "$senderDetails.lastName",
        congregationName: "$senderDetails.congregationName",
        preferences: 1,
        numberOfPassenger: 1,
        response: 1,
      },
    });

    pipeline.push(
      { $sort: { createdAt: -1 } },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) }
    );

    const result = await requestUserModel.aggregate(pipeline);

    return res.status(201).json(
      new ApiResponse(201, "Request Details", {
        result,
        page,
        limit,
      })
    );
  } catch (error) {
    next(error);
    console.log("Error:", error);
  }
};
