import Ajv from "ajv";

import {
  settingModel,
  getSettingByUserIdSchema,
  createSettingByUserIdSchema,
} from "./schemas/SettingSchema";

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

describe("Testing Setting Controller endpoints (most, if not all, endpoints requrie authorization.", () => {
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

  it("Successful request to 'get settings information by user id', returns payload containing setting information.", () => {
    try {
      cy.request({
        method: "GET",
        url: "/api/setting/get/setting/by/token",
        headers: {
          Authorization: Cypress.env("token"),
        },
      }).then((res) => {
        // check status
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(getSettingByUserIdSchema);
        let valid = validate(res.body);
        if (!valid) throw validate.errors;

        validate = ajv.compile(settingModel);
        valid = validate(res.body._payload);
        if (!valid) throw validate.errors;
        // check pertinent information
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
        expect(res.body._payload).to.deep.equal({
          _setting_id: 1,
          _setting_creation_date: formattedDate,
          _setting_update_date: formattedDate,
          _user: {
            _user_id: 1,
            _auth0_id: "google-oauth2|110428753866664923333",
            _deactivate: false,
            _user_creation_date: formattedDate,
            _user_update_date: formattedDate,
          },
        });
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'get settings information by user id' due to invalid authentication.", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "GET",
        url: "/api/setting/get/setting/by/token",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJqTTJSakZFTmtZM05EUXhOMFZHTjBWRE5qYzFORUZCUlRZMlFqTTFSVE01UkRFMU1qRTBSUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTA0Mjg3NTM4NjY2NjQ5MjMzMzMiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtZWJtN3drd2IuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc0MTM4Mjc4LCJleHAiOjE2NzQyMjQ2NzgsImF6cCI6Imt5dUV3MXJhUXRodXFybXNUbUZiTE0zNnNERXR4cTZiIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciJ9.qhqYa4N5cPZOi6r6JXqmrmZieVJ6CF90CNYlCQ5AL8PrBBz5q3f4eDEd84DzKxIh-VxjfQWmEQXiIQIdsA8G7EsVHCojQ6SN1UTzu0BNwc8gwDXl-gxS7SeXUmwN6B7_YHucQtK9TiNi1RbLvj1naiByYQLAy2NLmpBRWrk1KtG_9ZP-BhFVc7HMoxThuQIPy96N1aeSIdVePLuulvLZ1qlJoMoEUXvuAkct0_uvvzLJGnhQLiy25kJFQROHsndAMWleKn47qHmNdQjLI2eRSNex7DKbdl6DUib8UG-PWW1S_yKZif3EkV2z_-VC-adw3nxMK9C7aiBXZZ2s8EYtpQ",
        },
      }).then((res) => {
        expect(res.status).to.equal(401);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Successful request to 'create setting by token', returns payload containing newly created setting.", () => {
    // TODO: Handle if setting already exists first
  });

  it("Confirm failed request to 'create setting by token' due to invalid authentication.", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "POST",
        url: "/api/setting/create/setting/by/token",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJqTTJSakZFTmtZM05EUXhOMFZHTjBWRE5qYzFORUZCUlRZMlFqTTFSVE01UkRFMU1qRTBSUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTA0Mjg3NTM4NjY2NjQ5MjMzMzMiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtZWJtN3drd2IuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc0MTM4Mjc4LCJleHAiOjE2NzQyMjQ2NzgsImF6cCI6Imt5dUV3MXJhUXRodXFybXNUbUZiTE0zNnNERXR4cTZiIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciJ9.qhqYa4N5cPZOi6r6JXqmrmZieVJ6CF90CNYlCQ5AL8PrBBz5q3f4eDEd84DzKxIh-VxjfQWmEQXiIQIdsA8G7EsVHCojQ6SN1UTzu0BNwc8gwDXl-gxS7SeXUmwN6B7_YHucQtK9TiNi1RbLvj1naiByYQLAy2NLmpBRWrk1KtG_9ZP-BhFVc7HMoxThuQIPy96N1aeSIdVePLuulvLZ1qlJoMoEUXvuAkct0_uvvzLJGnhQLiy25kJFQROHsndAMWleKn47qHmNdQjLI2eRSNex7DKbdl6DUib8UG-PWW1S_yKZif3EkV2z_-VC-adw3nxMK9C7aiBXZZ2s8EYtpQ",
        },
      }).then((res) => {
        expect(res.status).to.equal(401);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Successful request to 'Delete setting by token', returns payload containing true or false.", () => {
    // Need to work on create setting first
  });

  it("Confirm failed request to 'Delete setting by token' due to invalid authentication.", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "DELETE",
        url: "/api/setting/delete/setting/by/token",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJqTTJSakZFTmtZM05EUXhOMFZHTjBWRE5qYzFORUZCUlRZMlFqTTFSVE01UkRFMU1qRTBSUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTA0Mjg3NTM4NjY2NjQ5MjMzMzMiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtZWJtN3drd2IuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi1lYm03d2t3Yi5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc0MTM4Mjc4LCJleHAiOjE2NzQyMjQ2NzgsImF6cCI6Imt5dUV3MXJhUXRodXFybXNUbUZiTE0zNnNERXR4cTZiIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciJ9.qhqYa4N5cPZOi6r6JXqmrmZieVJ6CF90CNYlCQ5AL8PrBBz5q3f4eDEd84DzKxIh-VxjfQWmEQXiIQIdsA8G7EsVHCojQ6SN1UTzu0BNwc8gwDXl-gxS7SeXUmwN6B7_YHucQtK9TiNi1RbLvj1naiByYQLAy2NLmpBRWrk1KtG_9ZP-BhFVc7HMoxThuQIPy96N1aeSIdVePLuulvLZ1qlJoMoEUXvuAkct0_uvvzLJGnhQLiy25kJFQROHsndAMWleKn47qHmNdQjLI2eRSNex7DKbdl6DUib8UG-PWW1S_yKZif3EkV2z_-VC-adw3nxMK9C7aiBXZZ2s8EYtpQ",
        },
      }).then((res) => {
        expect(res.status).to.equal(401);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
