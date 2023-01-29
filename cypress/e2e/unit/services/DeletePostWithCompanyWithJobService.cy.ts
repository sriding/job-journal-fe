import CreatePostWithCompanyWithJobService from "../../../../src/services/CreatePostWithCompanyWithJobService";
import DeletePostWithCompanyWithJobService from "../../../../src/services/DeletePostWithCompanyWithJobService";
import Company from "../../../../src/shared/models/Company";
import Job from "../../../../src/shared/models/Job";
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

describe("Testing 'delete post with company with job service' module", () => {
  const instance: DeletePostWithCompanyWithJobService =
    new DeletePostWithCompanyWithJobService(Cypress.env("token"));
  it("Testing standard delete behavior", async () => {
    try {
      // create a post with company and job first
      const createPostInstance: CreatePostWithCompanyWithJobService =
        new CreatePostWithCompanyWithJobService(Cypress.env("token"));
      const createPostResponse = await createPostInstance.requestCreation(
        "http://localhost:8080/api/post/create/post/with/company/with/job/by/token",
        new Post("unit test notes"),
        new Company("unit test company"),
        new Job("unit test job")
      );
      //now delete the post
      const postId = createPostResponse.post.post_id;
      const response = await instance.requestDeletion(
        "http://localhost:8080/api/post/delete/post/by/",
        postId
      );
      expect(response).to.equal(true);
    } catch (error: any) {
      console.log(error.toString());
    }
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
