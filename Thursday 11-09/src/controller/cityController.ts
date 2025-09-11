import cityModel, { ICity } from "../models/cityModel";
import { Request, Response } from "express";
import { error } from "console";

export const createCity = async (req: Request, res: Response) => {
  try {
    const { name, stateName } = req.body;

    if (!name || !stateName) {
      return res.status(400).json({
        message: "All Fields are required",
      });
    } else {
      const existedCity = await cityModel.findOne({ name });

      if (existedCity) {
        return res.status(400).json({
          message: "City already exists",
        });
      } else {
        const newCity: ICity = new cityModel({
          name,
          stateName,
        });

        let createdCity = await newCity.save();

        if (!createdCity) {
          return res.status(400).json({
            status: "error",
            message: "something went wrong while creating the city",
          });
        }
        return res.status(201).json({
          message: "City created successfully",
          country: createdCity,
        });
      }
    }
  } catch (error: any) {
    console.log("Error: ", error);
    res.status(400).json({
      message: "Error creating city:",
    });
  }
};

export const getCityList = async (req: Request, res: Response) => {
  try {
    const cityList = await cityModel
      .find()
      .populate({ path: "country", strictPopulate: false })
      .exec();

    if (!cityList) {
      return res.status(400).json({
        message: "Cities are not found",
      });
    } else {
      return res.status(201).json({
        message: "City Details",
        cityList,
      });
    }
  } catch {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error getting country List",
    });
  }
};

export const getCityByName = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const city = await cityModel
      .findById({ _id })
      .populate({ path: "State", strictPopulate: false })
      .exec();

    if (!city) {
      return res.status(400).json({
        message: "City not found",
      });
    } else {
      return res.status(201).json({
        message: "City Details",
        city,
      });
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error getting city",
    });
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
      return res.status(400).json({
        message: "City not found",
      });
    } else {
      return res.status(201).json({
        message: "City Detail updated",
        updatedCity,
      });
    }
  } catch {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error updating city",
    });
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const deleted = await cityModel.deleteOne({ name });

    if (deleted.deletedCount === 0) {
      return res.status(400).json({
        message: "City not found",
      });
    } else {
      return res.status(201).json({
        message: "City deleted",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error deleting city",
    });
  }
};
