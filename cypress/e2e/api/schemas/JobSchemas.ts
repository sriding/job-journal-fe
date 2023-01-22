const jobModel = {
  type: "object",
  title: "jobModel",
  description: "standard model for job table in db",
  properties: {
    _job_id: {
      type: "number",
      description: "id of job",
    },
    _job_title: {
      type: "string",
      description: "title of job",
    },
    _job_information: {
      type: "string",
      description: "information about job",
    },
    _job_location: {
      type: "string",
      description: "location of job",
    },
    _job_status: {
      type: "string",
      description: "status of job",
    },
    _job_type: {
      type: "string",
      description: "type of job",
    },
    _job_application_submitted_date: {
      type: "string",
      description: "date job application was sent",
    },
    _job_application_dismissed_date: {
      type: "string",
      description: "date job application was dismissed",
    },
    _job_creation_date: {
      type: "string",
      description: "date job was created in db",
    },
    _job_update_date: {
      type: "string",
      description: "date job was last updated in db",
    },
    _post: {
      type: "object",
      description: "every job has a corresponding post object",
    },
  },
  required: [
    "_job_id",
    "_job_title",
    "_job_information",
    "_job_location",
    "_job_status",
    "_job_type",
    "_job_creation_date",
    "_job_update_date",
    "_job_application_submitted_date",
    "_job_application_dismissed_date",
    "_post",
  ],
  additionalProperties: false,
};

export { jobModel };
