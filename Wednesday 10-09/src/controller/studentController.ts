import StudentModel, { IStudent } from "../model/studentModel";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { error } from "console";

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo, password, name, collegeName, course } = req.body;

    if (!rollNo || !password || !name || !collegeName || !course) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      const existedStudent = await StudentModel.findOne({ rollNo });

      if (existedStudent) {
        return res.status(400).json({
          message: "Student already exists",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent: IStudent = new StudentModel({
          rollNo,
          password: hashedPassword,
          name,
          collegeName,
          course,
        });

        let createdStudent = await newStudent.save();

        if (!createdStudent) {
          return res.status(400).json({
            status: "error",
            message: "something went wrong while registering the student",
          });
        }
        return res.status(201).json({
          message: "Student registered successfully",
          user: createdStudent,
        });
      }
    }
  } catch (error: any) {
    res.status(400).json({
      message: "Error registering student:",
      error,
    });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo } = req.body;

    const student = await StudentModel.find({ rollNo });

    if (student.length === 0) {
      return res.status(400).json({
        message: "Student not found",
      });
    } else {
      return res.status(201).json({
        message: "Login successful",
        student,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error:",
      error,
    });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const student = await StudentModel.findById({ _id });

    if (!student) {
      return res.status(400).json({
        message: "Student not found",
      });
    } else {
      return res.status(201).json({
        message: "Student Details",
        user: student,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error getting student",
      error,
    });
  }
};

export const getStudentList = async (req: Request, res: Response) => {
  try {
    const studentsList = await StudentModel.find();

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
    return res.status(500).json({
      message: "Error getting student List",
      error,
    });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo } = req.params;
    const updatedUser = await StudentModel.findOneAndUpdate(
      { rollNo },
      {
        $set: {
          password: req.body.password,
          name: req.body.name,
          collegeName: req.body.collegeName,
          course: req.body.course,
        },
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(400).json({
        message: "User not found",
      });
    } else {
      return res.status(201).json({
        message: "User updated",
        user: updatedUser,
      });
    }
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Error updating user" }));
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo } = req.params;

    const deleted = await StudentModel.deleteOne({ rollNo });

    if (!deleted) {
      return res.status(400).json({
        message: "User not found",
      });
    } else {
      return res.status(201).json({
        message: "User deleted",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error deleting user",
    });
  }
};
