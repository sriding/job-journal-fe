class Users {
  private _user_id: number;
  private _auth0_id: string;

  constructor(_user_id: number, _auth0_id: string) {
    this._user_id = _user_id;
    this._auth0_id = _auth0_id;
  }

  public get user_id(): number {
    return this._user_id;
  }
  public set user_id(value: number) {
    this._user_id = value;
  }

  public get auth0_id(): string {
    return this._auth0_id;
  }
  public set auth0_id(value: string) {
    this._auth0_id = value;
  }
}

export default Users;
