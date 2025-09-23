import { Request, Response, NextFunction } from "express";
import studentModel from "../models/userModel";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

dotenv.config();

interface DecodedToken extends JwtPayload {
  user: {
    _id: string;
  };
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify token
    const decodedTokenInfo = jwt.verify(
      token,
      process.env.PRIVATE_KEY as string
    ) as DecodedToken;

    const user = await studentModel.findById(decodedTokenInfo.id);

    if (!user) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (token !== user?.token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Attach user to request
    res.locals.user = user;
    console.log(res.locals.user, "ddddd");
    next();
  } catch (error: any) {
    console.log("Error:", error);
    res.status(400).json(new ApiResponse(400, error.message, null));
  }
};
