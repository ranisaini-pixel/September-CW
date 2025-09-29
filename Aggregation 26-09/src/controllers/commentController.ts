import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import commentModel from "../models/commentModel";
import { date } from "joi";
import movieModel from "../models/movieModel";
import { title } from "process";

export const aggregation1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating } = req.query;
    let data = await commentModel.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movie_id",
          foreignField: "_id",
          as: "movies_Details",
        },
      },
      {
        $unwind: "$movies_Details",
      },
      {
        $match: {
          "movies_Details.imdb.rating": { $gt: Number(rating) },
        },
      },
      {
        $project: {
          date: 1,
          email: 1,
          "movies_Details.title": 1,
          "movies_Details.imdb.rating": 1,
        },
      },
    ]);

    return res.json({
      data,
    });
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const aggregation2 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await movieModel.aggregate([
      {
        $match: {
          "imdb.rating": { $gt: 4.0 },
        },
      },
      {
        $unwind: "$languages",
      },
      {
        $group: {
          _id: "$languages",
          movies: {
            $push: {
              title: "$title",
              rating: "$imdb.rating",
              year: "$year",
            },
          },
        },
      },
    ]);

    return res.json({
      data,
    });
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const aggregation3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await movieModel.aggregate([
      {
        $unwind: "$genres",
      },
      {
        $group: {
          _id: "$genres",
          count: {
            $sum: 1,
          },
          movies_genres: {
            $push: {
              title: "$title",
              plot: "$plot",
            },
          },
        },
      },
    ]);

    return res.json({
      data,
    });
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const aggregation4 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await movieModel.aggregate([
      {
        $unwind: "$genres",
      },
      {
        $group: {
          _id: "$genres",
          count: {
            $sum: 1,
          },
          movies_genres: {
            $push: {
              title: "$title",
              plot: "$plot",
            },
          },
        },
      },
    ]);
    return res.json({
      data,
    });
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const aggregation5 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { year } = req.query;
    const data = await movieModel.aggregate([
      {
        $match: {
          year: Number(year),
        },
      },
      {
        $unwind: "$genres",
      },
      {
        $group: {
          _id: "$genres",
          details: {
            $push: {
              id: "$_id",
              title: "$title",
              year: "$year",
            },
          },
        },
      },
    ]);

    return res.json({
      data,
    });
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};
