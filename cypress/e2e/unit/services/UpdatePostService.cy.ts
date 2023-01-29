import UpdatePostService from "../../../../src/services/UpdatePostService";
import Post from "../../../../src/shared/models/Post";

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

describe("Testing 'update post service' module", () => {
  const instance: UpdatePostService = new UpdatePostService(
    Cypress.env("token").slice(7)
  );
  it("Testing standard update post functionality", async () => {
    const postId = 1;
    const post: Post = new Post("unit test updating post");
    const response = await instance.requestUpdateForPost(
      "http://localhost:8080/api/post/update/post/by/",
      post,
      postId
    );
    expect(response.post_id).to.equal(1);
    expect(response.post_notes).to.equal("unit test updating post");
    expect(response.user).to.equal(null);
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
