import studentModel, { IStudent } from "../models/studentModel";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

dotenv.config();

const isInvalid = (value: any): boolean => {
  return (
    !value ||
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value !== "string" && typeof value !== "number")
  );
};

export const registerStudent = async (req: Request, res: Response) => {
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

    if (isInvalid(rollNo)) {
      return res
        .status(400)
        .json({ code: 400, message: "Roll number is required" });
    }
    if (isInvalid(password)) {
      return res
        .status(400)
        .json({ code: 400, message: "Password is required" });
    }
    if (isInvalid(name)) {
      return res.status(400).json({ code: 400, message: "Name is required" });
    }
    if (isInvalid(collegeName)) {
      return res
        .status(400)
        .json({ code: 400, message: "College name is required" });
    }
    if (isInvalid(course)) {
      return res.status(400).json({ code: 400, message: "Course is required" });
    }
    if (isInvalid(country)) {
      return res
        .status(400)
        .json({ code: 400, message: "Country is required" });
    }
    if (isInvalid(state)) {
      return res.status(400).json({ code: 400, message: "State is required" });
    }
    if (isInvalid(city)) {
      return res.status(400).json({ code: 400, message: "City is required" });
    }

    const existedStudent = await studentModel.findOne({ rollNo });

    if (existedStudent) {
      throw new ApiError(400, "Student already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newStudent: IStudent = new studentModel({
        rollNo: rollNo.toString().trim(),
        password: hashedPassword,
        name: name.trim(),
        collegeName: collegeName.lowerCase().trim(),
        course: course.lowerCase().trim(),
        country: country.lowerCase().trim(),
        state: state.lowerCase().trim(),
        city: city.lowerCase().trim(),
      });

      await newStudent?.save();

      const createdStudent = await studentModel
        .findById(newStudent._id)
        .select("-password");

      if (!createdStudent) {
        throw new ApiError(400, "Student not created");
      }
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Student created successfully", createdStudent)
        );
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo, password } = req.body;

    if (!(rollNo || password)) {
      throw new ApiError(400, "Please provide username or email");
    } else {
      let existedStudent = await studentModel.findOne({ rollNo });

      if (!existedStudent) {
        throw new ApiError(400, "Student not found");
      } else {
        let isPasswordValidate = await bcrypt.compare(
          password,
          existedStudent.password
        );

        if (!isPasswordValidate) {
          throw new ApiError(400, "Password Incorrect");
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
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentModel.findById(res.locals.student._id);

    if (!student) {
      throw new ApiError(400, "Student not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Student Details", student));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const getStudentList = async (req: Request, res: Response) => {
  try {
    const studentsList = await studentModel.find();

    if (!studentsList) {
      throw new ApiError(400, "Student not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "All Student List", studentsList));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
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

    if (!updatedStudent) {
      throw new ApiError(400, "Student not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Student Details Updated", updateStudent));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const deleted = await studentModel.deleteOne({ _id });

    if (deleted.deletedCount === 0) {
      throw new ApiError(400, "Student not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Student Deleted Successfully", null));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};
