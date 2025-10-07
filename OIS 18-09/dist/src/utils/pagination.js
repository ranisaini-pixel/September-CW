"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = async (model, options) => {
    const { page = 1, limit = 10, searchTerm, searchField = "name", lookup, } = options;
    // Build filter dynamically
    let filter = {};
    if (searchTerm) {
        filter[searchField] = { $regex: searchTerm, $options: "i" };
    }
    const pipeline = [{ $match: filter }];
    if (lookup) {
        pipeline.push({
            $lookup: {
                from: lookup.from,
                localField: lookup.localField,
                foreignField: lookup.foreignField,
                as: lookup.as,
                ...(lookup.pipeline ? { pipeline: lookup.pipeline } : {}),
            },
        });
    }
    // Facet for pagination
    pipeline.push({
        $facet: {
            totalCount: [{ $count: "total" }],
            paginatedResults: [
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ],
        },
    }, {
        $project: {
            paginatedResults: 1,
            totalDocs: { $ifNull: [{ $arrayElemAt: ["$totalCount.total", 0] }, 0] },
        },
    });
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
exports.pagination = pagination;
//# sourceMappingURL=pagination.js.map