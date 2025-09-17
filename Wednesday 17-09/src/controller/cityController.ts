import cityModel, { ICity } from "../models/cityModel";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const createCity = async (req: Request, res: Response) => {
  try {
    const { name, stateId } = req.body;

    if (!name || !stateId) {
      throw new ApiError(400, "name and stateId required");
    } else {
      const existedCity = await cityModel.findOne({ name });

      if (existedCity) {
        throw new ApiError(400, "City already exists");
      } else {
        const newCity: ICity = new cityModel({
          name,
          stateId,
        });

        let createdCity = await newCity.save();

        if (!createdCity) {
          throw new ApiError(
            400,
            "something went wrong while creating the city"
          );
        }
        return res
          .status(200)
          .json(new ApiResponse(200, "City created successfully", createdCity));
      }
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const getCityList = async (req: Request, res: Response) => {
  try {
    const cityList = await cityModel.find();

    if (!cityList) {
      throw new ApiError(400, "Cities are not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Cities List", cityList));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const getCityByName = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const city = await cityModel.findById({ _id });

    if (!city) {
      throw new ApiError(400, "City not found");
    } else {
      return res.status(200).json(new ApiResponse(200, "City Details", city));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const updateCity = async (req: Request, res: Response) => {
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
      throw new ApiError(400, "City not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "City updated successfully", updateCity));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const deleted = await cityModel.deleteOne({ name });

    if (deleted.deletedCount === 0) {
      throw new ApiError(400, "City not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "City deleted successfully", deleteCity));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};
