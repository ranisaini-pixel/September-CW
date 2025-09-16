"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentList = exports.getStudentById = exports.loginStudent = exports.registerStudent = void 0;
const studentModel_1 = require("../models/studentModel");
const console_1 = require("console");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const isInvalid = (value) => {
    return (!value ||
        (typeof value === "string" && value.trim().length === 0) ||
        (typeof value !== "string" && typeof value !== "number"));
};
const registerStudent = async (req, res) => {
    try {
        const { rollNo, password, name, collegeName, course, country, state, city, } = req.body;
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
        const existedStudent = await studentModel_1.default.findOne({ rollNo });
        if (existedStudent) {
            return res.status(400).json({
                code: 400,
                message: "Student already exists",
            });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newStudent = new studentModel_1.default({
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
            const createdStudent = await studentModel_1.default
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
    }
    catch (error) {
        console.log("Error:", error);
        res.status(400).json({
            code: 400,
            message: "Error registering student:",
            error: error.message,
        });
    }
};
exports.registerStudent = registerStudent;
const loginStudent = async (req, res) => {
    try {
        const { rollNo, password } = req.body;
        if (!(rollNo || password)) {
            return res.status(400).json({
                code: 400,
                message: "Please provide username or email",
            });
        }
        else {
            let existedStudent = await studentModel_1.default.findOne({ rollNo });
            if (!existedStudent) {
                return res.status(400).json({
                    message: "Student not found",
                });
            }
            else {
                let isPasswordValidate = await bcrypt.compare(password, existedStudent.password);
                if (!isPasswordValidate) {
                    return res.status(401).json({
                        status: 401,
                        message: "Password Incorrect",
                    });
                }
                else {
                    const token = jwt.sign({ id: existedStudent._id }, process.env.PRIVATE_KEY, {
                        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
                    });
                    let updatedStudent = await studentModel_1.default.findOneAndUpdate({ rollNo }, {
                        $set: {
                            token: token,
                        },
                    }, {
                        upsert: false,
                        runValidators: true,
                    });
                    console.log(updatedStudent, "oopo");
                    // const loggedInUser = await studentModel
                    //   .findById(existedStudent._id)
                    //   .select(
                    //     "-course -password -country -state -city -rollNo -createdAt -updatedAt"
                    //   );
                    return res.status(201).json({
                        code: 201,
                        message: "Login successful",
                        data: updatedStudent,
                    });
                }
            }
        }
    }
    catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error:",
        });
    }
};
exports.loginStudent = loginStudent;
const getStudentById = async (req, res) => {
    try {
        const { _id } = req.query;
        const student = await studentModel_1.default.findById({ _id });
        if (!student) {
            return res.status(400).json({
                message: "Student not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Student Details",
                student: student,
            });
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            code: error,
            message: "Error getting student",
        });
    }
};
exports.getStudentById = getStudentById;
const getStudentList = async (req, res) => {
    try {
        const studentsList = await studentModel_1.default
            .find()
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .exec();
        if (!studentsList) {
            return res.status(400).json({
                message: "Students not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Student Details",
                studentsList,
            });
        }
    }
    catch {
        console.log("Error:", console_1.error);
        return res.status(500).json({
            code: 500,
            message: "Error getting student List",
        });
    }
};
exports.getStudentList = getStudentList;
const updateStudent = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedStudent = await studentModel_1.default
            .findOneAndUpdate({ _id }, {
            $set: {
                password: req.body.password,
                name: req.body.name,
                collegeName: req.body.collegeName,
                course: req.body.course,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
            },
        }, { new: true })
            .select("-password");
        if (!updatedStudent) {
            return res.status(400).json({
                message: "Student not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Student updated",
                updatedStudent: updatedStudent,
            });
        }
    }
    catch {
        console.log("Error:", console_1.error);
        return res.status(500).json({
            code: 500,
            message: "Error updating student",
        });
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        const { _id } = req.params;
        const deleted = await studentModel_1.default.deleteOne({ _id });
        if (!deleted) {
            return res.status(400).json({
                message: "Student not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Student deleted",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting user",
        });
    }
};
exports.deleteStudent = deleteStudent;
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
//# sourceMappingURL=studentController.js.map