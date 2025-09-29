"use strict";
// import { Request, Response, NextFunction } from "express";
// import * as jwt from "jsonwebtoken";
// import * as bcrypt from "bcrypt";
// import * as moment from "moment";
// import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiResponse";
// import userModel from "../models/userModel";
// import { sendMail } from "../utils/nodemailer";
Object.defineProperty(exports, "__esModule", { value: true });
// export const loginAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;
//     let existedUser = await userModel.findOne({ email });
//     if (!existedUser) {
//       return next(new ApiError(400, "Invalid credentials"));
//     } else {
//       if (existedUser.role === "1") {
//         let isPasswordValidate = await bcrypt.compare(
//           password,
//           existedUser.password
//         );
//         if (!isPasswordValidate) {
//           return next(new ApiError(400, "Invalid credentials"));
//         } else {
//           const token = jwt.sign(
//             { id: existedUser._id },
//             process.env.PRIVATE_KEY as string,
//             {
//               expiresIn: process.env.ACCESS_TOKEN_EXPIRY as "1D",
//             }
//           );
//           await userModel.findOneAndUpdate(
//             { email },
//             {
//               $set: {
//                 token: token,
//               },
//             },
//             {
//               new: true,
//               upsert: true,
//             }
//           );
//           const loggedInUser = await userModel
//             .findById(existedUser._id)
//             .select(
//               "-firstName -lastName -gender -email -password -country -state -city -congregationName -pinCode -stateId -cityId -createdAt -updatedAt"
//             );
//           return res
//             .status(200)
//             .json(new ApiResponse(200, "Login Successful", loggedInUser));
//         }
//       } else {
//         return next(new ApiError(400, "Access Denied, You are not an admin"));
//       }
//     }
//   } catch (error: any) {
//     console.log("Error:", error);
//     next(error);
//   }
// };
// export const ForgotPassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email } = req.body;
//     let otp = Math.floor(100000 + Math.random() * 900000);
//     const otpExpiration = moment().add(2, "minutes").toDate();
//     let existedUser = await userModel.findOne({ email });
//     if (existedUser) {
//       //send OTP on mail
//       await sendMail(
//         email,
//         "Your OTP Code",
//         `Your OTP is: ${otp} <p>Valid for 2 minutes</p >`
//       );
//       //otp saved to database
//       let otpSaved = await userModel.findOneAndUpdate(
//         { email },
//         {
//           $set: {
//             otp: otp,
//             otpExpiration: otpExpiration,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//       if (!otpSaved) {
//         return next(new ApiError(400, "OTP not saved"));
//       }
//       return res
//         .status(201)
//         .json(new ApiResponse(201, "OTP saved successfully", {}));
//     } else {
//       return next(new ApiError(400, "Admin not exists"));
//     }
//   } catch (error: any) {
//     console.log("Error:", error);
//     next(error);
//   }
// };
// export const getAdminDetails = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { _id } = req.query;
//     const admin = await userModel
//       .findById({ _id })
//       .select("-password -isDeleted -token");
//     if (!admin) {
//       return next(new ApiError(400, "Admin not found"));
//     } else {
//       return res.status(200).json(new ApiResponse(200, "Admin Details", admin));
//     }
//   } catch (error: any) {
//     console.log("Error:", error);
//     next(error);
//   }
// };
//# sourceMappingURL=adminController.js.map