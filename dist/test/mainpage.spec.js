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
const app_1 = __importDefault(require("../app"));
chai_1.default.use(chai_http_1.default);
describe("Index Test", () => {
    it("should always pass", function () {
        chai_1.expect(true).to.equal(true);
    });
    it("should return 200", function (done) {
        chai_1.default
            .request(app_1.default)
            .get("/")
            .end(function (err, res) {
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.text).to.eql("Hello World");
            done();
        });
    });
    it("should return Hello World", function (done) {
        chai_1.default
            .request(app_1.default)
            .get("/")
            .end(function (err, res) {
            chai_1.expect(res.text).to.eql("Hello World");
            done();
        });
    });
});
//# sourceMappingURL=mainpage.spec.js.map