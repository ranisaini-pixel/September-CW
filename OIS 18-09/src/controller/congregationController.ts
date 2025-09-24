import { Request, Response, NextFunction } from "express";
import congregationModel, { ICongregation } from "../models/congregationModel";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const addCongregation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { congregationName, congregationState, congregationCity, zipCode } =
      req.body;

    let existedCongregation = await congregationModel.findOne({
      congregationName,
    });

    if (existedCongregation) {
      return next(new ApiError(400, "Congregation already exists"));
    } else {
      const newCongregation: ICongregation = new congregationModel({
        congregationName,
        congregationState,
        congregationCity,
        zipCode,
      });

      await newCongregation?.save();

      let savedCongregation = await congregationModel
        .findOne({
          congregationName,
        })
        .populate("congregationState", "name")
        .populate("congregationCity", "name");

      if (!savedCongregation) {
        return next(new ApiError(400, "Congregation not added"));
      }
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Congregation added successfully",
            savedCongregation
          )
        );
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};
function next(arg0: ApiError) {
  throw new Error("Function not implemented.");
}
