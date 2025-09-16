import { Request, Response, NextFunction } from "express";
import studentModel from "../models/studentModel";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";

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
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(402).json({
        code: 402,
        status: "failed",
        message: "Unauthorized request",
      });
      return;
    }

    // Verify token
    const decodedTokenInfo = jwt.verify(
      token,
      process.env.PRIVATE_KEY as string
    ) as DecodedToken;

    const student = await studentModel.findById(decodedTokenInfo.id);

    if (!student) {
      res.status(404).json({
        status: "failed",
        message: "Invalid Access Token",
      });
      return;
    }

    // Attach user to request
    res.locals.student = student;
    next();
  } catch (error: any) {
    res.status(401).json({
      status: "failed",
      error: error?.message,
      message: "Invalid Access Token",
    });
  }
};
