"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
require("mocha");
chai_1.default.use(chai_http_1.default);
describe("Hello API Request", () => {
    it("should return response on call", () => {
        // return chai.request(app).get('/')
        //   .then(res => {
        //     chai.expect(res.text).to.eql("Hello World");
        //   })
        return chai_1.default
            .request("http://localhost:3000/")
            .get("/")
            .end(function (err, res) {
            res.should.have.status(200);
        });
    });
});
