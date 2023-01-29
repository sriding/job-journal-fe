import Ajv from "ajv";

import Post from "../../../src/shared/models/Post";
import Company from "../../../src/shared/models/Company";
import Job from "../../../src/shared/models/Job";
import {
  postModel,
  getPostByTokenSchema,
  getPostsWithCompaniesAndJobsSchema,
  getPostsWithCompaniesAndJobsWithStartingPostIdSchema,
  getPostsWithCompanyAndJobWithStartingIndexFilteredByTextSchema,
  createPostByTokenSchema,
} from "./schemas/PostSchema";
import {
  postsWithCompaniesWithJobsSchema,
  createPostWithCompanyWithJobSchema,
} from "./schemas/JoinQuerySchemas";
import { companyModel } from "./schemas/CompanySchemas";
import { jobModel } from "./schemas/JobSchemas";

const timeToWait = new Promise<void>((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1500);
});

beforeEach(async () => {
  await timeToWait;
});

describe("Testing Post Controller endpoints (most, if not all, endpoints require authorization.", () => {
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

  it("Successful request to 'get posts by token', returning payload containing an array of posts", () => {
    // specify index limit here, results displayed will depend on this value
    try {
      const indexLimit = 0;
      cy.request({
        method: "GET",
        url: `/api/post/get/posts/by/token/${indexLimit}`,
        headers: {
          Authorization: Cypress.env("token"),
        },
      }).then((res) => {
        // check status code
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(getPostByTokenSchema);
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(postModel);
        valid = validate(res.body._payload[0]);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        // check pertinent information
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
        expect(res.body._payload).to.deep.equal([
          {
            _post_id: 2,
            _post_notes: "",
            _post_creation_date: "2022-12-20",
            _post_update_date: "2022-12-20",
            _user: {
              _user_id: 1,
              _auth0_id: "google-oauth2|110428753866664923333",
              _deactivate: true,
              _user_creation_date: "2022-12-20",
              _user_update_date: "2022-12-21",
            },
          },
          {
            _post_id: 1,
            _post_notes: "",
            _post_creation_date: "2022-12-20",
            _post_update_date: "2022-12-20",
            _user: {
              _user_id: 1,
              _auth0_id: "google-oauth2|110428753866664923333",
              _deactivate: true,
              _user_creation_date: "2022-12-20",
              _user_update_date: "2022-12-21",
            },
          },
        ]);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'get posts by token' due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "GET",
        url: `/api/post/get/posts/by/token/0`,
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

  it("Successful request to 'get posts with companies and jobs by token', returns payload containing array of objects containing them.", () => {
    try {
      cy.request({
        method: "GET",
        url: "/api/post/get/posts/with/company/and/job/by/token",
        headers: {
          Authorization: Cypress.env("token"),
        },
      }).then((res) => {
        // check status code
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(getPostsWithCompaniesAndJobsSchema);
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(postsWithCompaniesWithJobsSchema);
        valid = validate(res.body._payload[0]);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);
        // check pertinent information
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
        expect(res.body._payload).to.deep.equal([
          {
            _company_id: 2,
            _company_information: "",
            _company_name: "Google",
            _company_website: "",
            _job_application_dismissed_date: "",
            _job_application_submitted_date: "",
            _job_id: 2,
            _job_information: "",
            _job_location: "",
            _job_status: "",
            _job_title: "Data Analyst",
            _job_type: "",
            _post_id: 2,
            _post_id_fk_company: 2,
            _post_id_fk_job: 2,
            _post_notes: "",
            _user_id_fk_post: 1,
          },
          {
            _company_id: 1,
            _company_information: "",
            _company_name: "Google",
            _company_website: "",
            _job_application_dismissed_date: "",
            _job_application_submitted_date: "",
            _job_id: 1,
            _job_information: "",
            _job_location: "",
            _job_status: "",
            _job_title: "Software Developer",
            _job_type: "",
            _post_id: 1,
            _post_id_fk_company: 1,
            _post_id_fk_job: 1,
            _post_notes: "",
            _user_id_fk_post: 1,
          },
        ]);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'get posts with companies and jobs by token' due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "GET",
        url: `/api/post/get/posts/with/company/and/job/by/token`,
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

  it("Successful request to 'get posts with companies and jobs with starting index', returning payload containing array with information from all 3.", () => {
    try {
      //set post id here, results will change depending on this value
      const postId = 3;
      cy.request({
        method: "GET",
        url: `/api/post/get/posts/with/company/and/job/by/token/${postId}`,
        headers: {
          Authorization: Cypress.env("token"),
        },
      }).then((res) => {
        //check status code
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(
          getPostsWithCompaniesAndJobsWithStartingPostIdSchema
        );
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(postsWithCompaniesWithJobsSchema);
        valid = validate(res.body._payload[0]);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);
        // check pertinent information
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
        expect(res.body._payload).to.deep.equal([
          {
            _company_id: 2,
            _company_information: "",
            _company_name: "Google",
            _company_website: "",
            _job_application_dismissed_date: "",
            _job_application_submitted_date: "",
            _job_id: 2,
            _job_information: "",
            _job_location: "",
            _job_status: "",
            _job_title: "Data Analyst",
            _job_type: "",
            _post_id: 2,
            _post_id_fk_company: 2,
            _post_id_fk_job: 2,
            _post_notes: "",
            _user_id_fk_post: 1,
          },
          {
            _company_id: 1,
            _company_information: "",
            _company_name: "Google",
            _company_website: "",
            _job_application_dismissed_date: "",
            _job_application_submitted_date: "",
            _job_id: 1,
            _job_information: "",
            _job_location: "",
            _job_status: "",
            _job_title: "Software Developer",
            _job_type: "",
            _post_id: 1,
            _post_id_fk_company: 1,
            _post_id_fk_job: 1,
            _post_notes: "",
            _user_id_fk_post: 1,
          },
        ]);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'get posts with companies and jobs with starting index' due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "GET",
        url: `/api/post/get/posts/with/company/and/job/by/token/0`,
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

  it("Successful request to 'get posts with company and job with starting index filtered by text', returns payload containing array of posts.", () => {
    try {
      // text filter that will be applied, will determine results returned
      const textFilter = "Software Developer";
      // upper bound limit, all posts receievd will have a post id LOWER than this number
      const postId = 3;
      cy.request({
        method: "POST",
        url: `api/post/get/posts/with/company/and/job/filtered/by/token/${postId}`,
        headers: {
          Authorization: Cypress.env("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _text: textFilter }),
      }).then((res) => {
        // check status code
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(
          getPostsWithCompanyAndJobWithStartingIndexFilteredByTextSchema
        );
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(postsWithCompaniesWithJobsSchema);
        valid = validate(res.body._payload[0]);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        // check pertinent information
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
        expect(res.body._payload).to.deep.equal([
          {
            _company_id: 1,
            _company_information: "",
            _company_name: "Google",
            _company_website: "",
            _job_application_dismissed_date: "",
            _job_application_submitted_date: "",
            _job_id: 1,
            _job_information: "",
            _job_location: "",
            _job_status: "",
            _job_title: "Software Developer",
            _job_type: "",
            _post_id: 1,
            _post_id_fk_company: 1,
            _post_id_fk_job: 1,
            _post_notes: "",
            _user_id_fk_post: 1,
          },
        ]);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'get posts with company and job with starting index filtered by text' due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "GET",
        url: "/api/post/get/posts/with/company/and/job/filtered/by/token/0",
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

  it("Successful request to 'create post by token', returns payload containing newly created post.", () => {
    try {
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
      }).then((res) => {
        // check status code
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(createPostByTokenSchema);
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(postModel);
        valid = validate(res.body._payload);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);
        // manual checking
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
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

        expect(res.body._payload).to.deep.equal({
          _post_id: res.body._payload._post_id,
          _post_notes: post.post_notes,
          _post_creation_date: formattedDate,
          _post_update_date: formattedDate,
          _user: {
            _user_id: 1,
            _auth0_id: "google-oauth2|110428753866664923333",
            _deactivate: true,
            _user_creation_date: "2022-12-20",
            _user_update_date: "2022-12-21",
          },
        });
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'create post by token' due to invalid authentication", () => {
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

  it("Successful request to 'create post with company with job and by token', returns payload containing super post.", () => {
    try {
      // specify post, company, and job. results shown will depend on these values.
      const post: Post = new Post("Testing post notes");
      const company: Company = new Company("Testing company name");
      const job: Job = new Job("Testing job title");
      cy.request({
        method: "POST",
        url: "/api/post/create/post/with/company/with/job/by/token",
        headers: {
          Authorization: Cypress.env("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _post: post.toKeyValuePairs(),
          _company: company.toKeyValuePairs(),
          _job: job.toKeyValuePairs(),
        }),
      }).then((res) => {
        // check status code
        expect(res.status).to.equal(200);
        // validate schema/s
        let validate = ajv.compile(createPostWithCompanyWithJobSchema);
        let valid = validate(res.body);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(postModel);
        valid = validate(res.body._payload._post);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(companyModel);
        valid = validate(res.body._payload._company);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);

        validate = ajv.compile(jobModel);
        valid = validate(res.body._payload._job);
        if (!valid) throw validate.errors;
        expect(valid).to.equal(true);
        // manual testing
        expect(res.body._success).to.equal(true);
        expect(res.body._message).to.equal("");
        //TODO: ADD MANUAL TEST
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'create post with company with job and by token' due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "POST",
        url: "/api/post/create/post/with/company/with/job/by/token",
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

  it("Successful request to 'update post by post id', returning payload containing updated post.", () => {
    try {
      //postId is the id of the post to update
      const postId = 1;
      //post is a updated post object
      const post: Post = new Post("Testing updating notes");
      cy.request({
        method: "PUT",
        url: `/api/post/update/post/by/${postId}`,
        headers: {
          Authorization: Cypress.env("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post.toKeyValuePairs()),
      }).then((res) => {
        expect(res.status).to.equal(200);
        console.log(res.body);
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  });

  it("Confirm failed request to 'update post by post id' due to invalid authentication", () => {
    try {
      cy.request({
        failOnStatusCode: false,
        method: "PUT",
        url: "/api/post/update/post/by/1",
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

  //TODO: ADD MORE TESTS
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
