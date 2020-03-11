import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import nock from "nock";
import MockAdapter from "axios-mock-adapter";
import app from "../app";

import { github } from "../apis/github";
import { getUserInformation } from "../controllers/api";
import expected from "./response/users_response";

chai.use(chaiHttp);
describe("Api Test", () => {
  // it("should GET /api/v1", async function() {
  //   const res = await chai.request(app).get("/api/v1");
  //   expect(res.status).to.equal(200);
  //   expect(res.body).not.to.be.empty;
  //   expect(res.body).to.be.an("object");
  // });

  it("Get a user by username", async () => {
    const mock = new MockAdapter(github);
    mock.onGet("/users/Fazzacoot").reply(200, expected);

    const response = await getUserInformation("Fazzacoot");
    expect(typeof response).to.equal("object");
    expect(response.name).to.equal("Faron Gottlieb");
  });
});
