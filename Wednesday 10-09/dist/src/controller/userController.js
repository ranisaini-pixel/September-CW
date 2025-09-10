"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentList = exports.getStudentById = exports.loginStudent = exports.registerStudent = void 0;
const userModel_1 = require("../model/userModel");
const bcrypt = require("bcrypt");
const console_1 = require("console");
const registerStudent = async (req, res) => {
    try {
        const { rollNo, password, name, collegeName, course } = req.body;
        if (!rollNo || !password || !name || !collegeName || !course) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        else {
            const existedStudent = await userModel_1.default.findOne({ rollNo });
            if (existedStudent) {
                return res.status(400).json({
                    message: "Student already exists",
                });
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newStudent = new userModel_1.default({
                    rollNo,
                    password: hashedPassword,
                    name,
                    collegeName,
                    course,
                });
                await newStudent.save();
                const createdStudent = await userModel_1.default.findById(newStudent._id).select("-password");
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
    }
    catch (error) {
        res.status(400).json({
            message: "Error registering student:",
            error,
        });
    }
};
exports.registerStudent = registerStudent;
const loginStudent = async (req, res) => {
    try {
        const { rollNo } = req.body;
        const student = await userModel_1.default.find({ rollNo });
        if (student.length === 0) {
            return res.status(400).json({
                message: "Student not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Login successful",
                student,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Internal Server Error:",
            error,
        });
    }
};
exports.loginStudent = loginStudent;
const getStudentById = async (req, res) => {
    try {
        const { rollNo } = req.query;
        const student = await userModel_1.default.findById({ rollNo });
        if (!student) {
            return res.status(400).json({
                message: "Student not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Student Details",
                user: student,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error getting student",
            error,
        });
    }
};
exports.getStudentById = getStudentById;
const getStudentList = async (req, res) => {
    try {
        const studentsList = await userModel_1.default.find();
        if (!studentsList) {
            return res.status(400).json({
                message: "Students not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Student Details",
                studentsList,
            });
        }
    }
    catch {
        return res.status(500).json({
            message: "Error getting student List",
            error: console_1.error,
        });
    }
};
exports.getStudentList = getStudentList;
const updateStudent = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const updatedUser = await userModel_1.default.findOneAndUpdate({ rollNo }, {
            $set: {
                password: req.body.password,
                name: req.body.name,
                collegeName: req.body.collegeName,
                course: req.body.course,
            },
        }, { new: true }).select("-password");
        if (!updatedUser) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        else {
            return res.status(200).json({
                message: "User updated",
                user: updatedUser,
            });
        }
    }
    catch {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "Error updating user" }));
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const deleted = await userModel_1.default.deleteOne({ rollNo });
        if (!deleted) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        else {
            return res.status(200).json({
                message: "User deleted",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error deleting user",
        });
    }
};
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=userController.js.map