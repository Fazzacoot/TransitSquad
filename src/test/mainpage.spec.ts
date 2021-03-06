import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);

describe("Index Test", () => {
  it("should return 200", function(done) {
    chai
      .request(app)
      .get("/")
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
