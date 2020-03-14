import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import MockAdapter from "axios-mock-adapter";

import { github } from "../apis/github";
import {
  getUserInformation,
  countFollowerInformation,
  searchUsers
} from "../controllers/api";
import expectedUser from "./response/users_response";
import expectedFollower from "./response/followes_response";
import expectedSearch from "./response/search_response";

chai.use(chaiHttp);
describe("Api Test", () => {
 
  it("Get a user by username", async () => {
    const mock = new MockAdapter(github);
    mock.onGet("/users/Fazzacoot").reply(200, expectedUser);

    const response = await getUserInformation("Fazzacoot");
    expect(typeof response).to.equal("object");
    expect(response.name).to.equal("Faron Gottlieb");
  });

  it("Count user followers", async () => {
    const mock = new MockAdapter(github);
    mock.onGet("/users/Fazzacoot/following").reply(200, expectedFollower);

    const response = await countFollowerInformation("Fazzacoot");
    expect(typeof response).to.equal("number");
    expect(response).to.equal(1);
  });

  it("Get search result", async () => {
    const mock = new MockAdapter(github);
    mock
      .onGet("/search/users?q=language:Javascript+user:Fazzacoot")
      .reply(200, expectedSearch);

    const response = await searchUsers("Fazzacoot", "Javascript");
    expect(typeof response).to.equal("object");
    expect(response.status).to.equal(200);
    expect(response.data.items[0].login).to.equal("Fazzacoot");
    expect(response.data.items[0].avatar_url).to.equal(
      "https://avatars3.githubusercontent.com/u/10685711?v=4"
    );
  });
});
