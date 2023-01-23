const postModel = {
  type: "object",
  title: "postModel",
  description: "model schema for post",
  properties: {
    _post_id: {
      type: "number",
      description: "id for post",
    },
    _post_creation_date: {
      type: "string",
      description: "date post was created",
    },
    _post_update_date: {
      type: "string",
      description: "last date post was updated",
    },
    _post_notes: {
      type: "string",
      description: "date post was last updated",
    },
    _user: {
      type: "object",
      description: "every post has a corresponding user",
    },
  },
  required: [
    "_post_id",
    "_post_creation_date",
    "_post_update_date",
    "_post_notes",
    "_user",
  ],
  additionalProperties: false,
};

const getPostByTokenSchema = {
  type: "object",
  title: "getPostByTokenSchema",
  description: "payload schema when requesting getpostbytoken endpoint",
  properties: {
    _success: {
      type: "boolean",
      description: "whether or not the request was successful",
    },
    _message: {
      type: "string",
      description: "message received with payload",
    },
    _payload: {
      type: ["array", "null"],
      items: {
        type: "object",
      },
      description: "object containing information",
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

const getPostsWithCompaniesAndJobsSchema = Object.assign(
  {},
  getPostByTokenSchema
);

const getPostsWithCompaniesAndJobsWithStartingPostIdSchema = Object.assign(
  {},
  getPostByTokenSchema
);

const getPostsWithCompanyAndJobWithStartingIndexFilteredByTextSchema =
  Object.assign({}, getPostByTokenSchema);

const createPostByTokenSchema = {
  type: "object",
  title: "createPostByToken",
  description: "JSON payload schema response after creating post",
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
      description: "object containing information",
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

export {
  postModel,
  getPostByTokenSchema,
  getPostsWithCompaniesAndJobsSchema,
  getPostsWithCompaniesAndJobsWithStartingPostIdSchema,
  getPostsWithCompanyAndJobWithStartingIndexFilteredByTextSchema,
  createPostByTokenSchema,
};
