"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const getTodos = (req, res, next) => {
    res.status(200).send("Hello World");
};
router.get("/", getTodos);
exports.default = router;
//# sourceMappingURL=index.js.map