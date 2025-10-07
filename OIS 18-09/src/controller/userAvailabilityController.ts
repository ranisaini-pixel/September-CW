import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import userAvailabilityModel, {
  IUserAvailability,
} from "../models/userAvailabilityModel";

export const userAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { expiry } = req.body;
    const userId = res.locals.user._id;

    if (!userId) {
      return next(new ApiError(400, "Unauthorised "));
    }

    const expiryDate = new Date(expiry);
    const now = new Date();

    // const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    // if (expiryDate < oneHourFromNow) {
    //   return res.status(400).json({
    //     code: 400,
    //     message: "Availability must be at least one hour from now.",
    //   });
    // }

    const existing = await userAvailabilityModel.findOne({ userId });

    if (existing) {
      existing.expiry = expiryDate;
      await existing.save();
    } else {
      const newUserAvailability: IUserAvailability = new userAvailabilityModel({
        userId,
        expiry: expiryDate,
      });

      await newUserAvailability.save();
    }

    // const isAvailable = expiryDate > now;

    return res
      .status(201)
      .json(new ApiResponse(201, "Expiry Time set successfully", {}));
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};
