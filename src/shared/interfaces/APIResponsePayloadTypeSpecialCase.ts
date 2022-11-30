type APIResponsePayloadTypeSpecialCase = {
  _message: string;
  _success: boolean;
  _payload: {
    _auth0_id: string;
    _profile_id: number;
    _profile_name: string;
    _setting_id: number;
    _user_id: number;
    _user_id_fk_profile: number;
    _user_id_fk_setting: number;
  };
};

export default APIResponsePayloadTypeSpecialCase;
