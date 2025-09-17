import studentModel, { IStudent } from "../models/studentModel";
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

dotenv.config();

export const registerStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      rollNo,
      password,
      name,
      collegeName,
      course,
      country,
      state,
      city,
    } = req.body;

    if (
      !(
        rollNo ||
        password ||
        name ||
        collegeName ||
        course ||
        country ||
        state ||
        city
      )
    ) {
    }

    const existedStudent = await studentModel.findOne({ rollNo });
    // try {
    //   const existedStudent = await studentModel.findOne({ rollNo });
    //   if (existedStudent) {
    //     throw new ApiError(400, "Student LREADY EXITS");
    //     // throw "Rani";
    //   }
    // } catch (error: any) {
    //   console.log("error", error);
    //   console.log("inside nested catch");
    //   next(error);
    // }

    if (existedStudent) {
      // throw new ApiError(400, "Student already exists");
      return next(new ApiError(400, "Student already exists"));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newStudent: IStudent = new studentModel({
        rollNo: rollNo,
        password: hashedPassword,
        name: name.trim(),
        collegeName: collegeName.toLowerCase().trim(),
        course: course.toLowerCase().trim(),
        country: country.toLowerCase().trim(),
        state: state.toLowerCase().trim(),
        city: city.toLowerCase().trim(),
      });

      await newStudent?.save();

      const createdStudent = await studentModel
        .findById(newStudent._id)
        .select("-password");

      if (!createdStudent) {
        return next(new ApiError(400, "Student not created"));
      }
      return res
        .status(201)
        .json(
          new ApiResponse(201, "Student created successfully", createdStudent)
        );
    }
  } catch (error: any) {
    // console.log("inside catch");

    console.log(error);
    // return res.status(400).json(new ApiResponse(400, error.message, null));
    return next(error);
  }
};
export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo, password } = req.body;

    if (!(rollNo || password)) {
      return next(new ApiError(400, "Please provide username and email"));
    } else {
      let existedStudent = await studentModel.findOne({ rollNo });

      if (!existedStudent) {
        return next(new ApiError(400, "Student not found"));
      } else {
        let isPasswordValidate = await bcrypt.compare(
          password,
          existedStudent.password
        );

        if (!isPasswordValidate) {
          return next(new ApiError(400, "Password Incorrect"));
        } else {
          const token = jwt.sign(
            { id: existedStudent._id },
            process.env.PRIVATE_KEY as string,
            {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRY as "1D",
            }
          );

          await studentModel.findOneAndUpdate(
            { rollNo },
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

          const loggedInUser = await studentModel
            .findById(existedStudent._id)
            .select(
              "-course -password -country -state -city -rollNo -createdAt -updatedAt"
            );

          return res
            .status(200)
            .json(new ApiResponse(200, "Login Successful", loggedInUser));
        }
      }
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentModel.findById(res.locals.student._id);

    if (!student) {
      return next(new ApiError(400, "Student not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Student Details", student));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const getStudentList = async (req: Request, res: Response) => {
  try {
    const studentsList = await studentModel.find();

    if (!studentsList) {
      return next(new ApiError(400, "Student not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "All Student List", studentsList));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const updatedStudent = await studentModel
      .findOneAndUpdate(
        { _id },
        {
          $set: {
            password: req.body.password,
            name: req.body.name,
            collegeName: req.body.collegeName,
            course: req.body.course,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
          },
        },
        { new: true }
      )
      .select("-password");

    let updatedStudentData = await studentModel.findById({ _id });

    if (!updatedStudent) {
      return next(new ApiError(400, "Student not found"));
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Student Details Updated", updatedStudentData)
        );
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const deleted = await studentModel.deleteOne({ _id });

    if (deleted.deletedCount === 0) {
      return next(new ApiError(400, "Student not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Student Deleted Successfully", null));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};
function next(arg0: ApiError) {
  throw new Error("Function not implemented.");
}
