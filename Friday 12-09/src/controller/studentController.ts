import studentModel, { IStudent } from "../models/studentModel";
import { Request, Response } from "express";
import { error } from "console";
import * as bcrypt from "bcrypt";
import { connected } from "process";

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

    if (
      !rollNo ||
      !password ||
      !name ||
      !collegeName ||
      !course ||
      !country ||
      !state ||
      !city
    ) {
      return res.status(400).json({
        code: 400,
        message: "All fields are required",
      });
    } else {
      const existedStudent = await studentModel.findOne({ rollNo });

      if (existedStudent) {
        return res.status(400).json({
          code: 400,
          message: "Student already exists",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent: IStudent = new studentModel({
          rollNo,
          password: hashedPassword,
          name,
          collegeName,
          course,
          country,
          state,
          city,
        });

        const createdStudent = await studentModel
          .findById(newStudent._id)
          .select("-password");

        console.log(createdStudent, "eeeee");

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
    }
  } catch (error: any) {
    console.log("Error:", error);
    res.status(400).json({
      code: 400,
      message: "Error registering student:",
    });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo } = req.body;

    const student = await studentModel
      .find({ rollNo })
      .populate("country", "name")
      .populate("state", "name")
      .populate("city", "name")
      .exec();

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
    const student = await studentModel
      .findById({ _id })
      .populate("country", "name")
      .populate("state", "name")
      .populate("city", "name")
      .exec();

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
