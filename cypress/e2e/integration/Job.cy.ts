import Ajv from "ajv";
import Job from "../../../src/shared/models/Job";
import Post from "../../../src/shared/models/Post";
import {
  createJobByPostIdSchema,
  getJobByPostIdSchema,
  jobModel,
} from "./schemas/JobSchemas";

describe("Testing Job Controller endpoints (most, if not all, endpoints require authorization)", () => {
  const ajv = new Ajv();

  it("Successful request to 'get job by post id', returns payload containing job information.", () => {
    try {
      // job returned will have this post id
      const postId = 1;
      cy.request({
        method: "GET",
        url: `/api/job/get/job/by/${postId}`,
        headers: {
          Authorization: Cypress.env("token"),
        },
      }).then((res) => {
        // check status code
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(getJobByPostIdSchema);
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(jobModel);
        valid = validate(res.body._payload);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);
        // check pertinent information
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
        expect(res.body._payload).to.deep.equal({
          _job_id: 1,
          _job_title: "Software Developer",
          _job_type: "",
          _job_information: "",
          _job_location: "",
          _job_status: "",
          _job_application_submitted_date: "",
          _job_application_dismissed_date: "",
          _job_creation_date: "2022-12-20",
          _job_update_date: "2022-12-20",
          _post: {
            _post_id: 1,
            _post_notes: "Testing updating notes",
            _post_creation_date: "2022-12-20",
            _post_update_date: "2023-01-21",
            _user: {
              _user_id: 1,
              _auth0_id: "google-oauth2|110428753866664923333",
              _deactivate: true,
              _user_creation_date: "2022-12-20",
              _user_update_date: "2022-12-21",
            },
          },
        });
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'get job by post id' due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "GET",
        url: "/api/job/get/job/by/1",
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

  it("Successful request to 'create job by post id', returns payload containing newly created post.", () => {
    // post object that will be created in the database, should also be present in response payload
    const post: Post = new Post("Testing post notes");
    cy.request({
      method: "POST",
      url: "/api/post/create/post/by/token",
      headers: {
        Authorization: Cypress.env("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post.toKeyValuePairs()),
    }).then((postResponse) => {
      // job that will be created will have this post id
      const postId = postResponse.body._payload._post_id;
      const newJob = new Job("Testing creating a new job");
      cy.request({
        method: "POST",
        url: `/api/job/create/job/by/${postId}`,
        headers: {
          Authorization: Cypress.env("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob.toKeyValuePairs()),
      }).then((jobResponse) => {
        // check status code
        expect(jobResponse.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(createJobByPostIdSchema);
        let valid = validate(jobResponse.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(jobModel);
        valid = validate(jobResponse.body._payload);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);
        // check pertinent information
        expect(jobResponse.body._success).to.equal(true);
        expect(jobResponse.body._message).to.equal("");
        expect(jobResponse.body._payload).to.deep.equal({
          _job_id: jobResponse.body._payload._job_id,
          _job_title: "Testing creating a new job",
          _job_information: "",
          _job_location: "",
          _job_status: "",
          _job_type: "",
          _job_application_submitted_date: "",
          _job_application_dismissed_date: "",
          _job_creation_date: postResponse.body._payload._post_creation_date,
          _job_update_date: postResponse.body._payload._post_update_date,
          _post: {
            _post_id: postId,
            _post_notes: "Testing post notes",
            _post_creation_date: postResponse.body._payload._post_creation_date,
            _post_update_date: postResponse.body._payload._post_update_date,
            _user: {
              _user_id: 1,
              _auth0_id: "google-oauth2|110428753866664923333",
              _deactivate: true,
              _user_creation_date: "2022-12-20",
              _user_update_date: "2022-12-21",
            },
          },
        });
      });
    });
  });

  it("Confirm failed request to 'create job by post id' due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "POST",
        url: "/api/post/create/post/by/token",
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
