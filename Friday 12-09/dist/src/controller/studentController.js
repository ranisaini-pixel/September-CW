"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentList = exports.getStudentById = exports.loginStudent = exports.registerStudent = void 0;
const studentModel_1 = require("../models/studentModel");
const console_1 = require("console");
const bcrypt = require("bcrypt");
const registerStudent = async (req, res) => {
    try {
        const { rollNo, password, name, collegeName, course, country, state, city, } = req.body;
        if (!rollNo ||
            !password ||
            !name ||
            !collegeName ||
            !course ||
            !country ||
            !state ||
            !city) {
            return res.status(400).json({
                code: 400,
                message: "All fields are required",
            });
        }
        else {
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
                    rollNo,
                    password: hashedPassword,
                    name,
                    collegeName,
                    course,
                    country,
                    state,
                    city,
                });
                let createdStudent = await newStudent.save();
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
    }
    catch (error) {
        console.log("Error:", error);
        res.status(400).json({
            code: 400,
            message: "Error registering student:",
        });
    }
};
exports.registerStudent = registerStudent;
const loginStudent = async (req, res) => {
    try {
        const { rollNo } = req.body;
        const student = await studentModel_1.default
            .find({ rollNo })
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .exec();
        if (student.length === 0) {
            return res.status(400).json({
                message: "Student not found",
            });
        }
        else {
            return res.status(201).json({
                message: "Login successful",
                student,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error:",
            error,
        });
    }
};
exports.loginStudent = loginStudent;
const getStudentById = async (req, res) => {
    try {
        const { _id } = req.query;
        const student = await studentModel_1.default
            .findById({ _id })
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .exec();
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
//# sourceMappingURL=studentController.js.map