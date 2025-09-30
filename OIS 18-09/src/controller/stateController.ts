import stateModel, { IState } from "../models/stateModel";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { IPagination } from "../utils/Interfaces";

export const createState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

// export const getStateList = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const limit = parseInt(req.query.limit as string) || 10;
//     const skip = (page - 1) * limit;

//     let filter: any = {};
//     if (req.query.searchTerm) {
//       const search = req.query.searchTerm;
//       filter = {
//         name: { $regex: search, $options: "i" },
//       };
//     }
//     const stateList = await stateModel
//       .find(filter)
//       .skip(skip)
//       .limit(limit)
//       .exec();

//     const totalCount = await stateModel.countDocuments(filter);

//     if (!stateList) {
//       return next(new ApiError(400, "States not found"));
//     } else {
//       return res
//         .status(200)
//         .json(new ApiResponse(200, "States List", stateList));
//     }
//   } catch (error: any) {
//     console.log("Error:", error);
//     next(error);
//   }
// };

export const getStateList = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit = 10, searchTerm }: IPagination = req.query;

    let filter: any = {};
    if (searchTerm) {
      const search = searchTerm;
      filter = {
        name: { $regex: search, $options: "i" },
      };
    }

    // const totalCount = await stateModel.countDocuments(filter);

    // const stateList = await stateModel.aggregate([
    //   {
    //     $match: filter,
    //   },
    //   {
    //     $skip: (page - 1) * limit,
    //   },
    //   {
    //     $limit: limit,
    //   },
    //   {
    //     $sort: {
    //       createdAt: -1,
    //     },
    //   },
    // ]);

    const stateList = await stateModel.aggregate([
      {
        $match: filter,
      },
      {
        $facet: {
          totalCount: [{ $count: "total" }],
          paginatedResults: [
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
        },
      },
      {
        $project: {
          paginatedResults: 1,
          totalDocs: {
            $ifNull: [{ $arrayElemAt: ["$totalCount.totalDocs", 0] }, 0],
          },
        },
      },
    ]);

    if (!stateList) {
      return next(new ApiError(400, "States not found"));
    }
    return res.status(200).json(
      new ApiResponse(200, "States List", {
        states: stateList[0].paginatedResults || { data: [], totalDocs: 0 },
        pagination: {
          totalDocs: stateList[0].totalDocs,
          page,
          limit,
          totalPages: Math.ceil(stateList[0].totalDocs / limit),
        },
      })
    );
  } catch (error: any) {
    console.log("Error:", error);
    next(error);
  }
};

export const getStateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const updateState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const deleteState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

// const result = stateList[0] || { data: [], total: 0 };
