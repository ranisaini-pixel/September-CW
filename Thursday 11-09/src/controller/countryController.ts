import countryModel, { ICountry } from "../models/countryModel";
import { Request, Response } from "express";
import { error } from "console";

export const createCountry = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    } else {
      const existedCountry = await countryModel.findOne({ name });

      if (existedCountry) {
        return res.status(400).json({
          message: "Country already exists",
        });
      } else {
        const newCountry: ICountry = new countryModel({
          name,
        });

        let createdCountry = await newCountry.save();

        if (!createdCountry) {
          return res.status(400).json({
            status: "error",
            message: "something went wrong while creating the country",
          });
        }
        return res.status(201).json({
          message: "Country created successfully",
          country: createdCountry,
        });
      }
    }
  } catch (error: any) {
    console.log("Error: ", error);
    res.status(400).json({
      message: "Error creating country:",
    });
  }
};

export const getCountryList = async (req: Request, res: Response) => {
  try {
    const countryList = await countryModel.find();

    if (!countryList) {
      return res.status(400).json({
        message: "Countries are not found",
      });
    } else {
      return res.status(201).json({
        message: "Country Details",
        countryList,
      });
    }
  } catch {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error getting country List",
    });
  }
};

export const getCountryByName = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const country = await countryModel.findById({ _id });

    if (!country) {
      return res.status(400).json({
        message: "Country not found",
      });
    } else {
      return res.status(201).json({
        message: "Country Details",
        country,
      });
    }
  } catch (error: any) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error getting country",
    });
  }
};

export const searchCountryByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const countryName = await countryModel.find({ name });

    if (!countryName) {
      return res.status(400).json({
        message: "Country not found",
      });
    } else {
      return res.status(201).json({
        message: "Country Details",
        countryName,
      });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error getting country",
    });
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
      return res.status(400).json({
        message: "Country not found",
      });
    } else {
      return res.status(201).json({
        message: "Country Detail updated",
        updatedCountry,
      });
    }
  } catch {
    console.log("Error:", error);
    return res.status(500).json({
      message: "Error updating country",
    });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const deleted = await countryModel.deleteOne({ name });

    if (deleted.deletedCount === 0) {
      return res.status(400).json({
        message: "Country not found",
      });
    } else {
      return res.status(201).json({
        message: "Country deleted",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error deleting country",
    });
  }
};
