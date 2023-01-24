import GetPostsService from "../../../../src/services/GetPostsService";

describe("", () => {
  const instance: GetPostsService = new GetPostsService(Cypress.env("token"));
  it("", async () => {
    const response = await instance.requestMultiplePosts(
      "http://localhost:8080/api/post/get/posts/with/company/and/job/by/token"
    );
    expect(Array.isArray(response)).to.equal(true);
  });

  //TODO: Other request posts tests
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
