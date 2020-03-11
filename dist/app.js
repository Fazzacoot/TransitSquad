"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const view_1 = __importDefault(require("./routes/view"));
const api_1 = __importDefault(require("./routes/api"));
const app = express_1.default();
app.use(body_parser_1.json());
app.use("/", view_1.default);
app.use("/api/v1", api_1.default);
//Error handling function
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000, () => {
    console.log("listining on port 3000");
});
exports.default = app;
//# sourceMappingURL=app.js.map