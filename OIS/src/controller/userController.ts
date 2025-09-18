import userModel, { IUser } from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

dotenv.config();

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      email,
      password,
      congregationName,
      pinCode,
      state,
      city,
    } = req.body;

    const existedUser = await userModel.findOne({ email });

    if (existedUser) {
      return next(new ApiError(400, "User already exists"));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: IUser = new userModel({
        firstName,
        lastName,
        gender,
        email,
        password: hashedPassword,
        congregationName,
        pinCode,
        state,
        city,
      });

      await newUser?.save();

      const createdUser = await userModel
        .findById(newUser._id)
        .select("-password");

      if (!createdUser) {
        return next(new ApiError(400, "User not created"));
      }
      return res
        .status(201)
        .json(new ApiResponse(201, "User created successfully", createdUser));
    }
  } catch (error: any) {
    console.log(error);
    return next(error);
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let existedUser = await userModel.findOne({ email });

    if (!existedUser) {
      return next(
        new ApiError(400, "You are not registered, Register Yourself")
      );
    } else {
      let isPasswordValidate = await bcrypt.compare(
        password,
        existedUser.password
      );

      if (!isPasswordValidate) {
        return next(new ApiError(400, "Password Incorrect"));
      } else {
        const token = jwt.sign(
          { id: existedUser._id },
          process.env.PRIVATE_KEY as string,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as "1D",
          }
        );

        await userModel.findOneAndUpdate(
          { email },
          {
            $set: {
              token: token,
            },
          },
          {
            new: true,
            upsert: true,
          }
        );

        const loggedInUser = await userModel
          .findById(existedUser._id)
          .select(
            "-firstName -lastName -gender -email -password -country -state -city -congregationName -pinCode -createdAt -updatedAt"
          );

        return res
          .status(200)
          .json(new ApiResponse(200, "Login Successful", loggedInUser));
      }
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const otpVerification = async (req: Request, res: Response) => {
  try {
    const { otp, _id } = req.body;

    console.log();

    let otpSaved = await userModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          otp: otp,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    if (!otpSaved) {
      return next(new ApiError(400, "OTP not saved"));
    }
    return res
      .status(201)
      .json(new ApiResponse(201, "OTP saved successfully", otpSaved));
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const updatedUser = await userModel
      .findOneAndUpdate(
        { _id },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            email: req.body.email,
            password: req.body.password,
            congregationName: req.body.congregationName,
            pinCode: req.body.pinCode,
            state: req.body.state,
            city: req.body.city,
          },
        },
        { new: true }
      )
      .select("-password");

    let updatedUserData = await userModel.findById({ _id });

    if (!updatedUser) {
      return next(new ApiError(400, "User Profile not updated"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "User Profile Updated", updatedUserData));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(res.locals.student._id);

    if (!user) {
      return next(new ApiError(400, "User not found"));
    } else {
      return res.status(200).json(new ApiResponse(200, "user Details", user));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

// export const getStudentList = async (req: Request, res: Response) => {
//   try {
//     const studentsList = await studentModel.find();

//     if (!studentsList) {
//       return next(new ApiError(400, "Student not found"));
//     } else {
//       return res
//         .status(200)
//         .json(new ApiResponse(200, "All Student List", studentsList));
//     }
//   } catch (error: any) {
//     console.log("Error:", error);
//     next(error);
//   }
// };

// export const deleteStudent = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;

//     const deleted = await studentModel.deleteOne({ _id });

//     if (deleted.deletedCount === 0) {
//       return next(new ApiError(400, "Student not found"));
//     } else {
//       return res
//         .status(200)
//         .json(new ApiResponse(200, "Student Deleted Successfully", null));
//     }
//   } catch (error: any) {
//     console.log("Error:", error);
//     next(error);
//   }
// };
function next(arg0: ApiError) {
  throw new Error("Function not implemented.");
}
