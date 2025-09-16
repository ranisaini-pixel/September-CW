import stateModel, { IState } from "../models/stateModel";
import { Request, Response } from "express";
import { error } from "console";

export const createState = async (req: Request, res: Response) => {
  try {
    const { name, countryName } = req.body;

    if (!name || !countryName) {
      return res.status(400).json({
        message: "All Fields are required",
      });
    } else {
      const existedState = await stateModel.findOne({ name });

      if (existedState) {
        return res.status(400).json({
          message: "State already exists",
        });
      } else {
        const newState: IState = new stateModel({
          name,
          countryName,
        });

        //wrong country
        let createdState = await newState.save();

        if (!createdState) {
          return res.status(400).json({
            status: "error",
            message: "something went wrong while creating the state",
          });
        }
        return res.status(201).json({
          message: "State created successfully",
          state: createdState,
        });
      }
    }
  } catch (error: any) {
    console.log("Error: ", error);
    res.status(400).json({
      message: "Error creating state:",
    });
  }
};

export const getStateList = async (req: Request, res: Response) => {
  try {
    const stateList = await stateModel
      .find()
      .populate({ path: "country", strictPopulate: false })
      .exec();

    if (!stateList) {
      return res.status(400).json({
        message: "states are not found",
      });
    } else {
      return res.status(201).json({
        message: "state Details",
        stateList,
      });
    }
  } catch {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error getting country List",
    });
  }
};

export const getStateByName = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const state = await stateModel
      .findById({ _id })
      .populate({ path: "country", strictPopulate: false })
      .exec();

    if (!state) {
      return res.status(400).json({
        message: "state not found",
      });
    } else {
      return res.status(201).json({
        message: "State Details",
        state,
      });
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error getting state",
    });
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
      return res.status(400).json({
        message: "State not found",
      });
    } else {
      return res.status(201).json({
        message: "State Detail updated",
        updatedState,
      });
    }
  } catch {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error updating states",
    });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const deleted = await stateModel.deleteOne({ name });

    if (deleted.deletedCount === 0) {
      return res.status(400).json({
        message: "State not found",
      });
    } else {
      return res.status(201).json({
        message: "State deleted",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error deleting country",
    });
  }
};
