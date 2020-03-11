"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const github_1 = require("../../apis/github");
const router = express_1.Router();
const getInfo = async (req, res, next) => {
    const git = await github_1.github.get("/search/users?q=language:Javascript+or+TypeScript+user:orhanveli");
    res.status(200).json(git.data);
};
router.get("/", getInfo);
exports.default = router;
