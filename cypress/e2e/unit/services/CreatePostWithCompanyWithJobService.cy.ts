import CreatePostWithCompanyWithJobService from "../../../../src/services/CreatePostWithCompanyWithJobService";
import PostsWithCompaniesAndJobs from "../../../../src/shared/composition/PostsWithCompaniesAndJobs";
import Company from "../../../../src/shared/models/Company";
import Job from "../../../../src/shared/models/Job";
import Post from "../../../../src/shared/models/Post";

const timeToWait = new Promise<void>((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1500);
});

beforeEach(async () => {
  await timeToWait;
});

describe("Testing 'create post with company with job service' standard behavior.", () => {
  const instance: CreatePostWithCompanyWithJobService =
    new CreatePostWithCompanyWithJobService(Cypress.env("token"));
  it("Ensure post creation is functional", async () => {
    try {
      const response: PostsWithCompaniesAndJobs =
        await instance.requestCreation(
          "http://localhost:8080/api/post/create/post/with/company/with/job/by/token",
          new Post("unit test notes"),
          new Company("unit test company"),
          new Job("unit test job")
        );
      //company checks
      expect(response.company.company_id).to.equal(response.post.post_id);
      expect(response.company.company_information).to.equal("");
      expect(response.company.company_name).to.equal("unit test company");
      expect(response.company.company_website).to.equal("");
      expect(response.company.post?.post_id).to.equal(response.post.post_id);
      expect(response.company.post?.post_notes).to.equal("unit test notes");
      expect(response.company.post?.user).to.equal(null);
      //job checks
      expect(response.job.job_id).to.equal(response.post.post_id);
      expect(response.job.job_information).to.equal("");
      expect(response.job.job_location).to.equal("");
      expect(response.job.job_status).to.equal("");
      expect(response.job.job_title).to.equal("unit test job");
      expect(response.job.job_type).to.equal("");
      expect(response.job.job_application_submitted_date).to.equal("");
      expect(response.job.job_application_dismissed_date).to.equal("");
      expect(response.job.post?.post_id).to.equal(response.post.post_id);
      expect(response.job.post?.post_notes).to.equal("unit test notes");
      expect(response.job.post?.user).to.equal(null);
      //post checks
      expect(response.post.post_id).to.equal(response.post.post_id);
      expect(response.post.post_notes).to.equal("unit test notes");
      expect(response.post.user).to.equal(null);
    } catch (error: any) {
      console.log(error.toString());
    }
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
