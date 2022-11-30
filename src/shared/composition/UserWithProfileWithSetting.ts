import Setting from "../models/Setting";
import UserProfiles from "../models/UserProfiles";
import Users from "../models/Users";

class UserWithProfileWithSetting {
  private _user: Users;
  private _profile: UserProfiles;
  private _setting: Setting;

  constructor(_user: Users, _profile: UserProfiles, _setting: Setting) {
    this._user = _user;
    this._profile = _profile;
    this._setting = _setting;
  }

  public get user(): Users {
    return this._user;
  }
  public set user(value: Users) {
    this._user = value;
  }

  public get profile(): UserProfiles {
    return this._profile;
  }
  public set profile(value: UserProfiles) {
    this._profile = value;
  }

  public get setting(): Setting {
    return this._setting;
  }
  public set setting(value: Setting) {
    this._setting = value;
  }
}

export default UserWithProfileWithSetting;
