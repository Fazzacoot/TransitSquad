"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.adapter = require("axios/lib/adapters/http");
exports.github = axios_1.default.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github.v3+json"
    }
});
//# sourceMappingURL=github.js.map