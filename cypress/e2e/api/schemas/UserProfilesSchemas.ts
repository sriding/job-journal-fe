const userProfilesModel = {
  type: "object",
  title: "userProfilesModel",
  description: "model schema for users profile",
  properties: {
    _profile_id: {
      type: "number",
      description: "profile id",
    },
    _profile_name: {
      type: "string",
      description: "profile name",
    },
    _profile_creation_date: {
      type: "string",
      description: "creation date of profile",
    },
    _profile_update_date: {
      type: "string",
      description: "last time profile was updated",
    },
    _user: {
      type: "object",
      description: "each profile has a corresponding user",
    },
  },
  required: [
    "_profile_id",
    "_profile_name",
    "_profile_creation_date",
    "_profile_update_date",
    "_user",
  ],
  additionalProperties: false,
};

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
export { userProfilesModel, getUserProfileByUserIdSchema };
