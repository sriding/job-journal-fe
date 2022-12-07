import UserProfileSettingNotCreatedException from "../exceptions/UserProfileSettingNotCreatedException";
import UserWithProfileWithSetting from "../shared/composition/UserWithProfileWithSetting";
import APIResponsePayloadType from "../shared/interfaces/APIResponsePayloadType";
import APIResponsePayloadTypeSpecialCase from "../shared/interfaces/APIResponsePayloadTypeSpecialCase";
import Setting from "../shared/models/Setting";
import UserProfiles from "../shared/models/UserProfiles";
import Users from "../shared/models/Users";

class CreateUserWithProfileWithSetting {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestCreation(
    url: string
  ): Promise<UserWithProfileWithSetting> {
    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const response:
        | APIResponsePayloadType
        | APIResponsePayloadTypeSpecialCase = await request.json();

      // Bit of a special case here. If the user already exists in the database, the response payload will
      // be in a different format thus requiring two types for the respone variable
      if (response._success && response._message === "") {
        // For if the user does not exist
        console.log("User did not exist, but they do now: ", response);
        const userFromResponse: Users = new Users(
          response._payload._user._user_id,
          response._payload._user._auth0_id,
          response._payload._user._deactivate
        );

        return new UserWithProfileWithSetting(
          userFromResponse,
          new UserProfiles(
            response._payload._userProfiles._profile_name,
            response._payload._userProfiles._profile_id,
            userFromResponse
          ),
          new Setting(response._payload._setting._setting_id, userFromResponse)
        );
      } else if (response._success) {
        // For if the user already exists
        const userFromResponse: Users = new Users(
          response._payload._user_id,
          response._payload._auth0_id,
          response._payload._deactivate
        );

        return new UserWithProfileWithSetting(
          userFromResponse,
          new UserProfiles(
            response._payload._profile_name,
            response._payload._profile_id,
            userFromResponse
          ),
          new Setting(response._payload._setting_id, userFromResponse)
        );
      } else {
        throw new UserProfileSettingNotCreatedException(response._message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }
}

export default CreateUserWithProfileWithSetting;
