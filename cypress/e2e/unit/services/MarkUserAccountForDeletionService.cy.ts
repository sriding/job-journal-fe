import MarkUserAccountForDeletionService from "../../../../src/services/MarkUserAccountForDeletionService";

describe("", () => {
  const instance: MarkUserAccountForDeletionService =
    new MarkUserAccountForDeletionService(Cypress.env("token"));
  it("", async () => {
    const response = await instance.markUserForDeletion();
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
