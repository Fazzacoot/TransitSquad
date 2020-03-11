import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);

describe("Index Test", () => {
  it("should always pass", function() {
    expect(true).to.equal(true);
  });
  it("should return 200", function(done) {
    chai
      .request(app)
      .get("/")
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.text).to.eql("Hello World");
        done();
      });
  });
  it("should return Hello World", function(done) {
    chai
      .request(app)
      .get("/")
      .end(function(err, res) {
        expect(res.text).to.eql("Hello World");
        done();
      });
  });
});
