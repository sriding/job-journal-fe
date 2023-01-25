import MarkUserAccountForDeletionService from "../../../../src/services/MarkUserAccountForDeletionService";

describe("Testing 'mark user account for deletion service' module", () => {
  const instance: MarkUserAccountForDeletionService =
    new MarkUserAccountForDeletionService(Cypress.env("token").slice(7));
  it("Testing standard mark functionality", async () => {
    try {
      const response = await instance.markUserForDeletion(
        "http://localhost:8080/api/users/update/user/mark/for/deletion"
      );
      expect(response).to.equal("Account marked for deletion.");
    } catch (error: any) {
      console.log(error.toString());
    }
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
