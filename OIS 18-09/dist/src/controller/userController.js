"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.updateUser = exports.otpVerification = exports.loginUser = exports.signup = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
dotenv.config();
const signup = async (req, res, next) => {
    try {
        const { firstName, lastName, gender, email, password, congregationName, pinCode, state, city, } = req.body;
        const existedUser = await userModel_1.default.findOne({ email });
        if (existedUser) {
            return next(new ApiError_1.ApiError(400, "User already exists"));
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel_1.default({
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
            const createdUser = await userModel_1.default
                .findById(newUser._id)
                .select("-password");
            if (!createdUser) {
                return next(new ApiError_1.ApiError(400, "User not created"));
            }
            return res
                .status(201)
                .json(new ApiResponse_1.ApiResponse(201, "User created successfully", createdUser));
        }
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
};
exports.signup = signup;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let existedUser = await userModel_1.default.findOne({ email });
        if (!existedUser) {
            return next(new ApiError_1.ApiError(400, "You are not registered, Register Yourself"));
        }
        else {
            let isPasswordValidate = await bcrypt.compare(password, existedUser.password);
            if (!isPasswordValidate) {
                return next(new ApiError_1.ApiError(400, "Password Incorrect"));
            }
            else {
                const token = jwt.sign({ id: existedUser._id }, process.env.PRIVATE_KEY, {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
                });
                await userModel_1.default.findOneAndUpdate({ email }, {
                    $set: {
                        token: token,
                    },
                }, {
                    new: true,
                    upsert: true,
                });
                const loggedInUser = await userModel_1.default
                    .findById(existedUser._id)
                    .select("-firstName -lastName -gender -email -password -country -state -city -congregationName -pinCode -createdAt -updatedAt");
                return res
                    .status(200)
                    .json(new ApiResponse_1.ApiResponse(200, "Login Successful", loggedInUser));
            }
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.loginUser = loginUser;
const otpVerification = async (req, res) => {
    try {
        const { otp, _id } = req.body;
        console.log();
        let otpSaved = await userModel_1.default.findOneAndUpdate({ _id }, {
            $set: {
                otp: otp,
            },
        }, {
            new: true,
            upsert: true,
        });
        if (!otpSaved) {
            return next(new ApiError_1.ApiError(400, "OTP not saved"));
        }
        return res
            .status(201)
            .json(new ApiResponse_1.ApiResponse(201, "OTP saved successfully", otpSaved));
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.otpVerification = otpVerification;
const updateUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedUser = await userModel_1.default
            .findOneAndUpdate({ _id }, {
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
        }, { new: true })
            .select("-password");
        let updatedUserData = await userModel_1.default.findById({ _id });
        if (!updatedUser) {
            return next(new ApiError_1.ApiError(400, "User Profile not updated"));
        }
        else {
            return res
                .status(200)
                .json(new ApiResponse_1.ApiResponse(200, "User Profile Updated", updatedUserData));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.updateUser = updateUser;
const getUserById = async (req, res) => {
    try {
        const user = await userModel_1.default.findById(res.locals.student._id);
        if (!user) {
            return next(new ApiError_1.ApiError(400, "User not found"));
        }
        else {
            return res.status(200).json(new ApiResponse_1.ApiResponse(200, "user Details", user));
        }
    }
    catch (error) {
        console.log("Error:", error);
        next(error);
    }
};
exports.getUserById = getUserById;
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
function next(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=userController.js.map