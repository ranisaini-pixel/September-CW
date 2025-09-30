import { PipelineStage, Model } from "mongoose";

interface PaginationOptions {
  page?: number;
  limit?: number;
  searchTerm?: string;
  lookup?: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
    pipeline?: PipelineStage[];
  };
}

export const pagination = async (
  model: Model<any>,
  options: PaginationOptions
) => {
  const { page = 1, limit = 10, searchTerm, lookup } = options;

  let filter: any = {};
  if (searchTerm) {
    const search = searchTerm;
    filter = {
      name: { $regex: search, $options: "i" },
    };
  }

  const pipeline: PipelineStage[] = [{ $match: filter }];

  if (lookup) {
    pipeline.push({
      $lookup: {
        from: lookup.from,
        localField: lookup.localField,
        foreignField: lookup.foreignField,
        as: lookup.as,
      },
    });
  }

  pipeline.push(
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
        totalDocs: { $ifNull: [{ $arrayElemAt: ["$totalCount.total", 0] }, 0] },
      },
    }
  );

  const result = await model.aggregate(pipeline);

  return {
    data: result[0]?.paginatedResults || [],
    pagination: {
      totalDocs: result[0]?.totalDocs || 0,
      page,
      limit,
      totalPages: Math.ceil((result[0]?.totalDocs || 0) / limit),
    },
  };
};
