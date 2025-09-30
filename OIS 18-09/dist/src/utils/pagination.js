"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = async (model, options) => {
    const { page = 1, limit = 10, searchTerm } = options;
    let filter = {};
    if (searchTerm) {
        const search = searchTerm;
        filter = {
            name: { $regex: search, $options: "i" },
        };
    }
    const pipeline = [
        { $match: filter },
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
        },
    ];
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