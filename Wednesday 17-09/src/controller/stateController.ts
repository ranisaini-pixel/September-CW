import stateModel, { IState } from "../models/stateModel";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const createState = async (req: Request, res: Response) => {
  try {
    const { name, countryId } = req.body;

    if (!name || !countryId) {
      throw new ApiError(400, "All Fields are required");
    } else {
      const existedState = await stateModel.findOne({ name });

      if (existedState) {
        throw new ApiError(400, "State already exists");
      } else {
        const newState: IState = new stateModel({
          name,
          countryId,
        });

        let createdState = await newState.save();

        if (!createdState) {
          throw new ApiError(
            400,
            "something went wrong while creating the state"
          );
        }
        return res
          .status(200)
          .json(
            new ApiResponse(200, "State created successfully", createdState)
          );
      }
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const getStateList = async (req: Request, res: Response) => {
  try {
    const stateList = await stateModel.find();

    if (!stateList) {
      throw new ApiError(400, "states not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "States List", stateList));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const getStateById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const state = await stateModel.findById({ _id });

    if (!state) {
      throw new ApiError(400, "state not found");
    } else {
      return res.status(200).json(new ApiResponse(200, "State details", state));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const updateState = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const updatedState = await stateModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true }
    );

    if (!updatedState) {
      throw new ApiError(400, "State not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "State details updated", updatedState));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const deleted = await stateModel.deleteOne({ name });

    if (deleted.deletedCount === 0) {
      throw new ApiError(400, "State not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "State deleted successfully", null));
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(400).json(new ApiResponse(400, error.message, null));
  }
};
