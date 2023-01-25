import UpdateJobService from "../../../../src/services/UpdateJobService";
import Job from "../../../../src/shared/models/Job";

describe("", () => {
  const instance: UpdateJobService = new UpdateJobService(
    Cypress.env("token").slice(7)
  );
  it("", async () => {
    try {
      const postId = 1;
      const job: Job = new Job("unit test updated job title");
      const response = await instance.requestJobUpdate(
        "http://localhost:8080/api/job/update/job/by/",
        job,
        postId
      );
      expect(response.job_id).to.equal(1);
      expect(response.job_title).to.equal("unit test updated job title");
      expect(response.job_information).to.equal("");
      expect(response.job_location).to.equal("");
      expect(response.job_status).to.equal("");
      expect(response.job_type).to.equal("");
      expect(response.job_application_submitted_date).to.equal("");
      expect(response.job_application_dismissed_date).to.equal("");
      expect(response.post?.post_id).to.equal(postId);
      expect(response.post?.post_notes).to.equal("Testing updating notes");
      expect(response.post?.user).to.equal(null);
    } catch (error: any) {
      console.log(error.toString());
    }
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
