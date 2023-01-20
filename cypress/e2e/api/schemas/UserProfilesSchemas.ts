const getUserProfileByUserIdSchema = {
  type: "object",
  title: "getUserProfileByUserIdSchema",
  description: "payload schema from get user profile by token endpoint",
  properties: {
    _success: {
      type: "boolean",
      description: "whether or not the request was successful",
    },
    _message: {
      type: "string",
      description: "message supplied with payload",
    },
    _payload: {
      type: ["object", "null"],
      description: "payload containing information",
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export { getUserProfileByUserIdSchema };
