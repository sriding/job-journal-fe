const companyModel = {
  type: "object",
  title: "companyModel",
  description: "standard model for company table in db",
  properties: {
    _company_id: {
      type: "number",
      description: "id for company",
    },
    _company_name: {
      type: "string",
      description: "name of company",
    },
    _company_website: {
      type: "string",
      description: "website for company",
    },
    _company_information: {
      type: "string",
      description: "information about company",
    },
    _company_creation_date: {
      type: "string",
      description: "date company was created in db",
    },
    _company_update_date: {
      type: "string",
      description: "last time company was updated in db",
    },
    _post: {
      type: "object",
      description: "each company has a corresponding post object",
    },
  },
  required: [
    "_company_id",
    "_company_name",
    "_company_website",
    "_company_information",
    "_company_creation_date",
    "_company_update_date",
    "_post",
  ],
  additionalProperties: false,
};

const getCompanyByPostIdSchema = {
  type: "object",
  title: "getCompanyByPostId",
  description:
    "payload schema of response from get company by post id endpoint",
  properties: {
    _success: {
      type: "boolean",
      description: "whether or not request was successful",
    },
    _message: {
      type: "string",
      description: "message returned with payload",
    },
    _payload: {
      type: ["object", "null"],
      description: "object containing information about request",
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

const createCompanyByPostIdSchema = Object.assign({}, getCompanyByPostIdSchema);

export { companyModel, getCompanyByPostIdSchema, createCompanyByPostIdSchema };
