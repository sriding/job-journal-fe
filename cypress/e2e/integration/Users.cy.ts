import Ajv from "ajv";

import {
  getUserIdByTokenSchema,
  createUserWithProfileAndSettingByTokenSchema,
  createUserWithProfileAndSettingByTokenPayloadSuccessSchema,
  markUserForDeletionSchema,
} from "./schemas/UsersSchemas";

const timeToWait = new Promise<void>((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1500);
});

beforeEach(async () => {
  await timeToWait;
});

describe("Testing Users Controller endpoints (most, if not all, endpoints require authorization)", () => {
  const ajv = new Ajv();
  // Get today's date first
  let currentDateSplit = new Date()
    .toLocaleDateString("en-US", { timeZone: "UTC" })
    .split("/");
  let month = currentDateSplit[0];
  if (month.length === 1) {
    month = "0" + month;
  }
  let day = currentDateSplit[1];
  if (day.length === 1) {
    day = "0" + day;
  }
  let year = currentDateSplit[2];
  let formattedDate = year + "-" + month + "-" + day;

  it("Successful request to 'get user id by token' endpoint, and receives a particular JSON response containing the correct user id as a message.", () => {
    try {
      cy.request({
        method: "GET",
        url: "/api/users/get/userid/by/token",
        headers: {
          Authorization: Cypress.env("token"),
        },
      }).then((res) => {
        //Check status code
        expect(res.status).to.equal(200);
        // Validate schema of response
        const validate = ajv.compile(getUserIdByTokenSchema);
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);
        // Check pertinent information
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("1");
        expect(res.body._payload).to.equal(null);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Failed request to 'get user id by token' endpoint due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "GET",
        url: "/api/users/get/userid/by/token",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJqTTJSakZFTmtZM05EUXhOMFZHTjBWRE5qYzFORUZCUlRZMlFqTTFSVE01UkRFMU1qRTBSUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTA0Mjg3NTM4NjY2NjQ5MjMzMzMiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtZWJtN3drd2IuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc0MTM4Mjc4LCJleHAiOjE2NzQyMjQ2NzgsImF6cCI6Imt5dUV3MXJhUXRodXFybXNUbUZiTE0zNnNERXR4cTZiIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciJ9.qhqYa4N5cPZOi6r6JXqmrmZieVJ6CF90CNYlCQ5AL8PrBBz5q3f4eDEd84DzKxIh-VxjfQWmEQXiIQIdsA8G7EsVHCojQ6SN1UTzu0BNwc8gwDXl-gxS7SeXUmwN6B7_YHucQtK9TiNi1RbLvj1naiByYQLAy2NLmpBRWrk1KtG_9ZP-BhFVc7HMoxThuQIPy96N1aeSIdVePLuulvLZ1qlJoMoEUXvuAkct0_uvvzLJGnhQLiy25kJFQROHsndAMWleKn47qHmNdQjLI2eRSNex7DKbdl6DUib8UG-PWW1S_yKZif3EkV2z_-VC-adw3nxMK9C7aiBXZZ2s8EYtpQ",
        },
      }).then((res) => {
        // check status code
        expect(res.status).to.equal(401);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  // it("Successful request to 'Create user with profile and setting by token', and returns JOINED user, profile and setting information", () => {
  //   try {
  //     cy.request({
  //       method: "POST",
  //       url: "/api/users/create/newuser/with/profile/with/setting/by/token",
  //       headers: {
  //         Authorization: Cypress.env("token"),
  //       },
  //     }).then((res) => {
  //       // Check Status code
  //       expect(res.status).to.equal(200);
  //       // Validate Schemas
  //       let validate = ajv.compile(
  //         createUserWithProfileAndSettingByTokenSchema
  //       );
  //       let valid = validate(res.body);
  //       if (!valid) throw validate.errors;
  //       expect(valid).to.equal(true);
  //       validate = ajv.compile(
  //         createUserWithProfileAndSettingByTokenPayloadSuccessSchema
  //       );
  //       valid = validate(res.body._payload);
  //       if (!valid) throw validate.errors;
  //       expect(valid).to.equal(true);
  //       // Check pertinent information
  //       expect(res.body._success).to.equal(true);
  //       expect(res.body._message).to.equal(
  //         "User already exists. Majority of the time, this is considered default behavior."
  //       );
  //       expect(res.body._payload).to.deep.equal({
  //         _auth0_id: "google-oauth2|110428753866664923333",
  //         _deactivate: true,
  //         _profile_id: 1,
  //         _profile_name: "Stephen Riding",
  //         _setting_id: 1,
  //         _user_id: 1,
  //         _user_id_fk_profile: 1,
  //         _user_id_fk_setting: 1,
  //       });
  //     });
  //   } catch (error: any) {
  //     console.log(error.toString());
  //   }
  // });

  it("Failed request to 'create user with profile and setting by token' due to invalid authentication", () => {
    cy.request({
      failOnStatusCode: false,
      method: "POST",
      url: "/api/users/create/newuser/with/profile/with/setting/by/token",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJqTTJSakZFTmtZM05EUXhOMFZHTjBWRE5qYzFORUZCUlRZMlFqTTFSVE01UkRFMU1qRTBSUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTA0Mjg3NTM4NjY2NjQ5MjMzMzMiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtZWJtN3drd2IuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc0MTM4Mjc4LCJleHAiOjE2NzQyMjQ2NzgsImF6cCI6Imt5dUV3MXJhUXRodXFybXNUbUZiTE0zNnNERXR4cTZiIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciJ9.qhqYa4N5cPZOi6r6JXqmrmZieVJ6CF90CNYlCQ5AL8PrBBz5q3f4eDEd84DzKxIh-VxjfQWmEQXiIQIdsA8G7EsVHCojQ6SN1UTzu0BNwc8gwDXl-gxS7SeXUmwN6B7_YHucQtK9TiNi1RbLvj1naiByYQLAy2NLmpBRWrk1KtG_9ZP-BhFVc7HMoxThuQIPy96N1aeSIdVePLuulvLZ1qlJoMoEUXvuAkct0_uvvzLJGnhQLiy25kJFQROHsndAMWleKn47qHmNdQjLI2eRSNex7DKbdl6DUib8UG-PWW1S_yKZif3EkV2z_-VC-adw3nxMK9C7aiBXZZ2s8EYtpQ",
      },
    }).then((res) => {
      expect(res.status).to.equal(401);
    });
  });

  // it("Successful request to 'update user with mark for deletion', and returns JSON response containing message.", () => {
  //   try {
  //     cy.request({
  //       method: "PUT",
  //       url: "/api/users/update/user/mark/for/deletion",
  //       headers: {
  //         Authorization: Cypress.env("token"),
  //       },
  //     }).then((res) => {
  //       // check status code
  //       expect(res.status).to.equal(200);
  //       // validate schema(s)
  //       let validate = ajv.compile(markUserForDeletionSchema);
  //       let valid = validate(res.body);
  //       if (!valid) throw validate.errors;
  //       expect(valid).to.equal(true);
  //       // check pertinent information
  //       expect(res.body._success).to.equal(true);
  //       expect(res.body._message).to.equal("Account marked for deletion.");
  //       expect(res.body._payload).to.equal(null);
  //     });
  //   } catch (error: any) {
  //     console.log(error.toString());
  //   }
  // });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
