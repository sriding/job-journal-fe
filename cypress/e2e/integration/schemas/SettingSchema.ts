const settingModel = {
  type: "object",
  title: "settingModel",
  description: "model schema for setting table",
  properties: {
    _setting_id: {
      type: "number",
      description: "id number for setting",
    },
    _setting_creation_date: {
      type: "string",
      description: "when setting was created",
    },
    _setting_update_date: {
      type: "string",
      description: "when setting was last updated",
    },
    _user: {
      type: "object",
      description: "every setting has a corresponding user object",
    },
  },
  required: [
    "_setting_id",
    "_setting_creation_date",
    "_setting_update_date",
    "_user",
  ],
  additionalProperties: false,
};

const getSettingByUserIdSchema = {
  type: "object",
  title: "getSettingByUserIdSchema",
  description:
    "Payload schema for setting 'getSettingsByUserIdSchema' endpoint",
  properties: {
    _success: {
      type: "boolean",
      description: "whether or not the request was successful",
    },
    _message: {
      type: "string",
      description: "message returned with payload",
    },
    _payload: {
      type: ["object", "null"],
      description: "object information returned, if required",
    },
  },
  required: ["_success", "_message", "_payload"],
  additionalProperties: false,
};

const createSettingByUserIdSchema = Object.assign({}, getSettingByUserIdSchema);

export { settingModel, getSettingByUserIdSchema, createSettingByUserIdSchema };
