const userModel = {
  type: "object",
  title: "standard user database table details",
  description: "payload schema for a user",
  properties: {
    _user_id: {
      type: "number",
      description: "user id",
    },
    _auth0_id: {
      type: "string",
      description: "auth0 id",
    },
    _deactivate: {
      type: "boolean",
      description: "whether or not the user has deactivated their account",
    },
    _user_creation_date: {
      type: "string",
      description: "creation date",
    },
    _user_update_date: {
      type: "string",
      description: "updated informaion date",
    },
  },
  required: [
    "_user_id",
    "_auth0_id",
    "_deactivate",
    "_user_creation_date",
    "_user_update_date",
  ],
  additionalProperties: false,
};

const getUserIdByTokenSchema = {
  type: "object",
  title: "getUserIdByToken",
  description: "payload schema from the getting user id by token endpoint",
  properties: {
    _success: {
      type: "boolean",
      description: "whether the request was successful or not",
    },
    _message: {
      type: "string",
      description: "message returned from request",
    },
    _payload: {
      type: "null",
      description: "payload returned from request",
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

const createUserWithProfileAndSettingByTokenSchema = {
  type: "object",
  title: "createUserWithProfileAndSettingByToken",
  description:
    "payload schema from the create a user with profile and settings endpoint",
  properties: {
    _success: {
      type: "boolean",
      description: "whether the request was successful or not",
    },
    _message: {
      type: "string",
      description: "message returned with the request",
    },
    _payload: {
      type: ["null", "object"],
      description: "payload returned from request",
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

const createUserWithProfileAndSettingByTokenPayloadSuccessSchema = {
  type: "object",
  title: "createUserWithProfileAndSettingByTokenPayloadSuccessSchema",
  description:
    "payload schema from a successful request to the createUserWithProfileAndSettingByToken endpoint",
  properties: {
    _auth0_id: {
      type: "string",
      description: "Auth0 id for the current user",
    },
    _deactivate: {
      type: "boolean",
      description: "Whether or not the user's account is deactivated",
    },
    _profile_id: {
      type: "number",
      description: "Profile id for the current user",
    },
    _profile_name: {
      type: "string",
      description: "Profile name for the current user",
    },
    _setting_id: {
      type: "number",
      description: "Setting id for the current user",
    },
    _user_id: {
      type: "number",
      description: "User id for the current user",
    },
    _user_id_fk_profile: {
      type: "number",
      description:
        "User id (as a foreign key in userprofiles) for the current user",
    },
    _user_id_fk_setting: {
      type: "number",
      description: "User id (as a foreign key in setting) for the current user",
    },
  },
  required: [
    "_auth0_id",
    "_deactivate",
    "_profile_id",
    "_profile_name",
    "_setting_id",
    "_user_id",
    "_user_id_fk_profile",
    "_user_id_fk_setting",
  ],
  additionalProperties: false,
};

const markUserForDeletionSchema = {
  type: "object",
  title: "markUserForDeletionSchema",
  description: "payload schema from mark user for deletion endpoint",
  properties: {
    _success: {
      type: "boolean",
      description: "whether or not the request was successful",
    },
    _message: {
      type: "string",
      description: "message returned with the request",
    },
    _payload: {
      type: "null",
      description: "payload returned from request",
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

export {
  userModel,
  getUserIdByTokenSchema,
  createUserWithProfileAndSettingByTokenSchema,
  createUserWithProfileAndSettingByTokenPayloadSuccessSchema,
  markUserForDeletionSchema,
};
