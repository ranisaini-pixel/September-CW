import studentModel, { IStudent } from "../models/studentModel";
import { Request, Response } from "express";
import { error } from "console";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

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
      return res.status(400).json({
        code: 400,
        message: "Student already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newStudent: IStudent = new studentModel({
        rollNo: rollNo.toString().trim(),
        password: hashedPassword,
        name: name.trim(),
        collegeName: collegeName.trim(),
        course: course.trim(),
        country: country.trim(),
        state: state.trim(),
        city: city.trim(),
      });

      await newStudent?.save();

      const createdStudent = await studentModel
        .findById(newStudent._id)
        .select("-password");

      if (!createdStudent) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "something went wrong while registering the student",
        });
      }
      return res.status(201).json({
        code: 201,
        message: "Student registered successfully",
        student: createdStudent,
      });
    }
  } catch (error: any) {
    console.log("Error:", error);
    res.status(400).json({
      code: 400,
      message: "Error registering student:",
      error: error.message,
    });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo, password } = req.body;

    if (!(rollNo || password)) {
      return res.status(400).json({
        code: 400,
        message: "Please provide username or email",
      });
    } else {
      let existedStudent = await studentModel.findOne({ rollNo });

      if (!existedStudent) {
        return res.status(400).json({
          message: "Student not found",
        });
      } else {
        let isPasswordValidate = await bcrypt.compare(
          password,
          existedStudent.password
        );

        if (!isPasswordValidate) {
          return res.status(401).json({
            status: 401,
            message: "Password Incorrect",
          });
        } else {
          const token = jwt.sign(
            { id: existedStudent._id },
            process.env.PRIVATE_KEY as string,
            {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRY as "1D",
            }
          );

          let updatedStudent = await studentModel.findOneAndUpdate(
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

          return res.status(201).json({
            code: 201,
            message: "Login successful",
            data: loggedInUser,
          });
        }
      }
    }
  } catch (error: any) {
    console.log("Error:", error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error:",
    });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const student = await studentModel.findById({ _id });

    if (!student) {
      return res.status(400).json({
        message: "Student not found",
      });
    } else {
      return res.status(201).json({
        message: "Student Details",
        student: student,
      });
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(500).json({
      code: error,
      message: "Error getting student",
    });
  }
};

export const getStudentList = async (req: Request, res: Response) => {
  try {
    const studentsList = await studentModel
      .find()
      .populate("country", "name")
      .populate("state", "name")
      .populate("city", "name")
      .exec();

    if (!studentsList) {
      return res.status(400).json({
        message: "Students not found",
      });
    } else {
      return res.status(201).json({
        message: "Student Details",
        studentsList,
      });
    }
  } catch {
    console.log("Error:", error);
    return res.status(500).json({
      code: 500,
      message: "Error getting student List",
    });
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
      return res.status(400).json({
        message: "Student not found",
      });
    } else {
      return res.status(201).json({
        message: "Student updated",
        updatedStudent: updatedStudent,
      });
    }
  } catch {
    console.log("Error:", error);
    return res.status(500).json({
      code: 500,
      message: "Error updating student",
    });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const deleted = await studentModel.deleteOne({ _id });

    if (!deleted) {
      return res.status(400).json({
        message: "Student not found",
      });
    } else {
      return res.status(201).json({
        message: "Student deleted",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error deleting user",
    });
  }
};

// const isInvalid = (value: any): boolean => {
//   return (
//     !value ||
//     (typeof value === "string" && value.trim().length === 0) ||
//     (typeof value !== "string" && typeof value !== "number")
//   );
// };

// export const registerStudent = async (req: Request, res: Response) => {
//   try {
//     const {
//       rollNo,
//       password,
//       name,
//       collegeName,
//       course,
//       country,
//       state,
//       city,
//     } = req.body;

//
//     if (isInvalid(rollNo)) {
//       return res.status(400).json({ code: 400, message: "Roll number is required" });
//     }
//     if (isInvalid(password)) {
//       return res.status(400).json({ code: 400, message: "Password is required" });
//     }
//     if (isInvalid(name)) {
//       return res.status(400).json({ code: 400, message: "Name is required" });
//     }
//     if (isInvalid(collegeName)) {
//       return res.status(400).json({ code: 400, message: "College name is required" });
//     }
//     if (isInvalid(course)) {
//       return res.status(400).json({ code: 400, message: "Course is required" });
//     }
//     if (isInvalid(country)) {
//       return res.status(400).json({ code: 400, message: "Country is required" });
//     }
//     if (isInvalid(state)) {
//       return res.status(400).json({ code: 400, message: "State is required" });
//     }
//     if (isInvalid(city)) {
//       return res.status(400).json({ code: 400, message: "City is required" });
//     }

//     // Check if student already exists
//     const existedStudent = await studentModel.findOne({ rollNo: rollNo.trim() });
//     if (existedStudent) {
//       return res.status(400).json({ code: 400, message: "Student already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new student
//     const newStudent: IStudent = new studentModel({
//       rollNo: rollNo.toString().trim(),
//       password: hashedPassword,
//       name: name.trim(),
//       collegeName: collegeName.trim(),
//       course: course.trim(),
//       country: country.trim(),
//       state: state.trim(),
//       city: city.trim(),
//     });

//     await newStudent.save();

//     const createdStudent = await studentModel
//       .findById(newStudent._id)
//       .select("-password");

//     if (!createdStudent) {
//       return res.status(500).json({
//         code: 500,
//         status: "error",
//         message: "Something went wrong while registering the student",
//       });
//     }

//     return res.status(201).json({
//       code: 201,
//       message: "Student registered successfully",
//       student: createdStudent,
//     });
//   } catch (error: any) {
//     console.error("Error:", error);
//     return res.status(500).json({
//       code: 500,
//       message: "Error registering student",
//       error: error.message,
//     });
//   }
// };
