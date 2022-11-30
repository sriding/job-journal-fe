import Users from "./Users";

class UserProfiles {
  private _profile_name: string;
  private _profile_id: number;
  private _user: Users | null;

  constructor(_profile_name: string, _profile_id?: number, _user?: Users) {
    this._profile_name = _profile_name;
    this._profile_id = _profile_id ?? -1;
    this._user = _user ?? null;
  }

  public get profile_name(): string {
    return this._profile_name;
  }
  public set profile_name(value: string) {
    this._profile_name = value;
  }

  public get profile_id(): number {
    return this._profile_id;
  }
  public set profile_id(value: number) {
    this._profile_id = value;
  }

  public get user(): Users | null {
    return this._user;
  }
  public set user(value: Users | null) {
    this._user = value;
  }
}

export default UserProfiles;
