import stateModel, { IState } from "../models/stateModel";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const createState = async (req: Request, res: Response) => {
  try {
    const { name, countryId } = req.body;

    if (!name || !countryId) {
      return next(new ApiError(400, "name and countryId required"));
    } else {
      const existedState = await stateModel.findOne({ name });

      if (existedState) {
        return next(new ApiError(400, "State already exists"));
      } else {
        const newState: IState = new stateModel({
          name,
          countryId,
        });

        let createdState = await newState.save();

        if (!createdState) {
          return next(
            new ApiError(400, "something went wrong while creating the state")
          );
        }
        return res
          .status(201)
          .json(
            new ApiResponse(201, "State created successfully", createdState)
          );
      }
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const getStateList = async (req: Request, res: Response) => {
  try {
    const stateList = await stateModel.find();

    if (!stateList) {
      return next(new ApiError(400, "States not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "States List", stateList));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const getStateById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const state = await stateModel.findById({ _id });

    if (!state) {
      return next(new ApiError(400, "state not found"));
    } else {
      return res.status(200).json(new ApiResponse(200, "State details", state));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
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
      return next(new ApiError(400, "State not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "State details updated", updatedState));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const deleted = await stateModel.deleteOne({ name });

    if (deleted.deletedCount === 0) {
      return next(new ApiError(400, "State not found"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "State deleted successfully", null));
    }
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};
function next(arg0: ApiError) {
  throw new Error("Function not implemented.");
}
