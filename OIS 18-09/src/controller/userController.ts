import userModel, { IUser } from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import * as dotenv from "dotenv";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { sendMail } from "../utils/nodemailer";

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
      stateId,
      cityId,
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
        stateId,
        cityId,
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
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
            "-firstName -lastName -gender -email -password -country -state -city -congregationName -pinCode -stateId -cityId -createdAt -updatedAt"
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

export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    let otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiration = moment().add(2, "minutes").toDate();

    let otpSaved = await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          otp: otp,
          otpExpiration: otpExpiration,
        },
      },
      {
        new: true,
      }
    );

    //send OTP on mail
    await sendMail(
      email,
      "Your OTP Code",
      `Your OTP is: ${otp} <p>Valid for 2 minutes</p >`
    );

    if (!otpSaved) {
      return next(new ApiError(400, "OTP not saved"));
    }
    return res
      .status(201)
      .json(new ApiResponse(201, "OTP saved successfully", {}));
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const otpVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp } = req.body;
    const { _id } = req.query;

    const user = await userModel.findById({ _id });

    if (!user) {
      return next(new ApiError(400, "User not exists"));
    }

    if (user.otp == otp) {
      if (
        user.otpExpiration ||
        new Date(user.otpExpiration).getTime() < Date.now()
      ) {
        return next(new ApiError(400, "OTP expired"));
      } else {
        await userModel.updateOne(
          { _id },
          { $set: { otp: null, otpExpiration: null } }
        );

        return res
          .status(201)
          .json(new ApiResponse(200, "OTP verified successfully", {}));
      }
    } else {
      return next(new ApiError(400, "Invalid OTP"));
    }
  } catch (error: any) {
    console.error("Error:", error);
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;

    const updatedUser = await userModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          gender: req.body.gender,
          email: req.body.email,
          congregationName: req.body.congregationName,
          pinCode: req.body.pinCode,
          state: req.body.state,
          city: req.body.city,
        },
      },
      {
        new: true,
      }
    );

    let updatedUserData = await userModel
      .findById({ _id })
      .select("-password -token");

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

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.query;
    const { password, confirmPassword } = req.body;

    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            password: hashedPassword,
          },
        },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json(new ApiResponse(200, "Password has been Reset Successfully", {}));
    } else {
      return next(
        new ApiError(400, "Password and Confirm Password should be equal")
      );
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.query;
    const { oldPassword, currentPassword, confirmPassword } = req.body;

    const user = await userModel.findById({ _id });

    if (!user) {
      next(new ApiError(400, "User not found"));
    }
    let userPassword = user?.password as string;

    const isMatch = await bcrypt.compare(oldPassword, userPassword);

    if (isMatch) {
      if (oldPassword !== currentPassword) {
        if (currentPassword === confirmPassword) {
          const hashedPassword = await bcrypt.hash(confirmPassword, 10);
          await userModel.findByIdAndUpdate(
            { _id },
            {
              $set: {
                password: hashedPassword,
              },
            },
            {
              new: true,
            }
          );
          return res
            .status(200)
            .json(
              new ApiResponse(200, "Password has been changed Successfully", {})
            );
        } else {
          next(
            new ApiError(
              400,
              "currentPassword and confirmPassword should be equal"
            )
          );
        }
      } else {
        next(
          new ApiError(
            400,
            "oldPassword and currentPassword should not be equal"
          )
        );
      }
    } else {
      next(new ApiError(400, "Incorrect Password"));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const user = await userModel.findById(_id);

    if (user) {
      await userModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            token: null,
          },
        },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json(new ApiResponse(200, "User Logout Successfully", {}));
    } else {
      next(new ApiError(400, "User not found"));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let _id = res.locals.user._id;

    const deleted = await userModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          isDeleted: true,
        },
      }
    );

    if (!deleted) {
      return next(new ApiError(400, "User not deleted"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "User deleted successfully", null));
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
function data(value: string): string | PromiseLike<string> {
  throw new Error("Function not implemented.");
}
