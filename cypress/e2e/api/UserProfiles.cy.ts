import Ajv from "ajv";

import { getUserProfileByUserIdSchema } from "./schemas/UserProfilesSchemas";

describe("Testing User Profiles Controller endpoints (most, if not all, endpoints require authorization", () => {
  const ajv = new Ajv();

  it("Successful request to 'get user profile by token', and returns JSON response containing user profile payload.", () => {
    try {
      cy.request({
        method: "GET",
        url: "/api/userprofiles/get/userprofile/by/token",
        headers: {
          Authorization: Cypress.env("token"),
        },
      }).then((res) => {
        // check status code
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(getUserProfileByUserIdSchema);
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);
        // check pertinent information
        console.log(res.body);
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
