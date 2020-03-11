"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const github_1 = require("../apis/github");
const api_1 = require("../controllers/api");
const users_response_1 = __importDefault(require("./response/users_response"));
chai_1.default.use(chai_http_1.default);
describe("Api Test", () => {
    // it("should GET /api/v1", async function() {
    //   const res = await chai.request(app).get("/api/v1");
    //   expect(res.status).to.equal(200);
    //   expect(res.body).not.to.be.empty;
    //   expect(res.body).to.be.an("object");
    // });
    it("Get a user by username", async () => {
        const mock = new axios_mock_adapter_1.default(github_1.github);
        mock.onGet("/users/Fazzacoot").reply(200, users_response_1.default);
        const response = await api_1.getUserInformation("Fazzacoot");
        chai_1.expect(typeof response).to.equal("object");
        chai_1.expect(response.name).to.equal("Faron Gottlieb");
    });
});
//# sourceMappingURL=api.spec.js.map