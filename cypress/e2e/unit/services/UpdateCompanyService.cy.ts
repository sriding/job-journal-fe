import UpdateCompanyService from "../../../../src/services/UpdateCompanyService";
import Company from "../../../../src/shared/models/Company";

describe("Testing 'update company service' module", () => {
  const instance: UpdateCompanyService = new UpdateCompanyService(
    Cypress.env("token").slice(7)
  );
  it("Testing standard update company functionality", async () => {
    try {
      const company: Company = new Company("unit test update name");
      const postId = 1;
      const response = await instance.requestUpdateForCompany(
        "http://localhost:8080/api/company/update/company/by/",
        company,
        postId
      );
      expect(response.company_id).to.equal(1);
      expect(response.company_name).to.equal("unit test update name");
      expect(response.company_information).to.equal("");
      expect(response.company_website).to.equal("");
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
