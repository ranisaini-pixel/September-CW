import cityModel, { ICity } from "../models/cityModel";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const createCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, state } = req.body;

    const existedCity = await cityModel.findOne({ name });

    if (existedCity) {
      return next(new ApiError(400, "City already exists"));
    } else {
      const newCity: ICity = new cityModel({
        name,
        state,
      });

      let createdCity = await newCity.save();

      if (!createdCity) {
        return next(
          new ApiError(400, "something went wrong while creating the city")
        );
      }
      return res
        .status(201)
        .json(new ApiResponse(201, "City created successfully", createdCity));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const getCityList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    // Filtering
    let filter = {};
    if (req.query.searchTerm) {
      filter = [
        { name: { $regex: req.query.searchTerm, $options: "i" } },
        // Add other fields you want to search here
        { category: { $regex: req.query.searchTerm, $options: "i" } },
        { subCategory: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }
    const cityList = await cityModel.find().populate("state", "name").exec();

    if (!cityList) {
      return next(new ApiError(400, "Cities are not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Cities List", cityList));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const getCityById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.query;

    const city = await cityModel
      .findById({ _id })
      .populate("state", "name")
      .exec();

    if (!city) {
      return next(new ApiError(400, "City not found"));
    } else {
      return res.status(200).json(new ApiResponse(200, "City Details", city));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const updateCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;

    const updatedCity = await cityModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true }
    );

    if (!updatedCity) {
      return next(new ApiError(400, "City not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "City updated successfully", updatedCity));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const deleteCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;

    const deleted = await cityModel.deleteOne({ name });

    if (deleted.deletedCount === 0) {
      return next(new ApiError(400, "City not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "City deleted successfully", deleteCity));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};
function next(arg0: ApiError) {
  throw new Error("Function not implemented.");
}
