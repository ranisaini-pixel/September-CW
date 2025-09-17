import countryModel, { ICountry } from "../models/countryModel";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const createCountry = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ApiError(400, "Name is required");
    } else {
      const existedCountry = await countryModel.findOne({ name });

      if (existedCountry) {
        throw new ApiError(400, "Country already exists");
      } else {
        const newCountry: ICountry = new countryModel({
          name,
        });

        let createdCountry = await newCountry.save();

        if (!createdCountry) {
          throw new ApiError(
            400,
            "something went wrong while creating the country"
          );
        }
        return res
          .status(200)
          .json(
            new ApiResponse(200, "Country created successfully", createdCountry)
          );
      }
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const getCountryList = async (req: Request, res: Response) => {
  try {
    const countryList = await countryModel.find();

    if (!countryList) {
      throw new ApiError(400, "Countries are not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Countries List", countryList));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const getCountryById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const country = await countryModel.findById({ _id });

    if (!country) {
      throw new ApiError(400, "Country not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Country Details", country));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const updatedCountry = await countryModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true }
    );

    if (!updatedCountry) {
      throw new ApiError(400, "Country not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Country details updated", updateCountry));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const deleted = await countryModel.deleteOne({ name });

    if (deleted.deletedCount === 0) {
      throw new ApiError(400, "Country not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Country deleted successfully", null));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};
