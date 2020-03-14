"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../../controllers/api");
const router = express_1.Router();
router.post("/", api_1.searchGitUser);
exports.default = router;
//# sourceMappingURL=index.js.map