"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
const router = (0, express_1.Router)();
router.get("/getUsersList", commentController_1.loginAdmin);
exports.default = router;
//# sourceMappingURL=commentRoute.js.map