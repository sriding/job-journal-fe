import Users from "./Users";

class Setting {
  private _setting_id: number;
  private _user: Users | null;

  constructor(_setting_id?: number, _user?: Users) {
    this._setting_id = _setting_id ?? -1;
    this._user = _user ?? null;
  }

  public get setting_id(): number {
    return this._setting_id;
  }
  public set setting_id(value: number) {
    this._setting_id = value;
  }
  public get user(): Users | null {
    return this._user;
  }
  public set user(value: Users | null) {
    this._user = value;
  }
}

export default Setting;
