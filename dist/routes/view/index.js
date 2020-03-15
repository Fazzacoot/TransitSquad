"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const view_1 = require("../../controllers/view");
const router = express_1.Router();
router.get("/", view_1.renderDocument);
exports.default = router;
//# sourceMappingURL=index.js.map