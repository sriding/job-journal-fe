const postsWithCompaniesWithJobsSchema = {
  type: "object",
  title: "postsWithCompaniesWithJobs",
  description:
    "object containing post, company, and job information for a single post",
  properties: {
    _company_id: {
      type: "number",
      description: "id for the company",
    },
    _company_information: {
      type: "string",
      description: "information on the company",
    },
    _company_name: {
      type: "string",
      description: "name of the company",
    },
    _company_website: {
      type: "string",
      description: "website for the company",
    },
    _job_application_dismissed_date: {
      type: "string",
      description: "date job was dismissed",
    },
    _job_application_submitted_date: {
      type: "string",
      description: "date job application was sent",
    },
    _job_id: {
      type: "number",
      description: "id for the job",
    },
    _job_information: {
      type: "string",
      description: "information about the job",
    },
    _job_location: {
      type: "string",
      description: "location of the job",
    },
    _job_status: {
      type: "string",
      description: "status of the job",
    },
    _job_title: {
      type: "string",
      description: "title of job",
    },
    _job_type: {
      type: "string",
      description: "type of job",
    },
    _post_id: {
      type: "number",
      description: "id for the post",
    },
    _post_id_fk_company: {
      type: "number",
      description: "company id on post",
    },
    _post_id_fk_job: {
      type: "number",
      description: "job id on post",
    },
    _post_notes: {
      type: "string",
      description: "notes for the post",
    },
    _user_id_fk_post: {
      type: "number",
      description: "post id on user",
    },
  },
  required: [
    "_company_id",
    "_company_information",
    "_company_name",
    "_company_website",
    "_job_application_dismissed_date",
    "_job_application_submitted_date",
    "_job_id",
    "_job_information",
    "_job_location",
    "_job_status",
    "_job_title",
    "_job_type",
    "_post_id",
    "_post_id_fk_company",
    "_post_id_fk_job",
    "_post_notes",
    "_user_id_fk_post",
  ],
  additionalProperties: false,
};

const createPostWithCompanyWithJobSchema = {
  type: "object",
  title: "createPostWithCompanyWithJob",
  description: "payload schema for post, company, and job objects",
  properties: {
    _success: {
      type: "boolean",
      description: "whether or not the request was successful",
    },
    _message: {
      type: "string",
      description: "message returned with the payload",
    },
    _payload: {
      type: ["object", "null"],
      properties: {
        _post: {
          type: "object",
          description: "post object portion",
        },
        _company: {
          type: "object",
          description: "company object portion",
        },
        _job: {
          type: "object",
          description: "job object portion",
        },
      },
      description: "object containing information",
      required: ["_post", "_company", "_job"],
      additionalProperties: false,
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

export { postsWithCompaniesWithJobsSchema, createPostWithCompanyWithJobSchema };
