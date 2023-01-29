import GetPostsService from "../../../../src/services/GetPostsService";

const timeToWait = (milliseconds: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

beforeEach(async () => {
  await timeToWait(1500);
});

describe("Testing 'get posts service' module", () => {
  const instance: GetPostsService = new GetPostsService(
    Cypress.env("token").slice(7)
  );
  it("Testing standard gets posts method", async () => {
    const response = await instance.requestMultiplePosts(
      "http://localhost:8080/api/post/get/posts/with/company/and/job/by/token"
    );
    expect(Array.isArray(response)).to.equal(true);
  });

  //TODO: Other request posts tests
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
