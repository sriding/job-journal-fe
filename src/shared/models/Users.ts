class Users {
  private _user_id: number;
  private _auth0_id: string;
  private _deactivate: boolean = false;

  constructor(_user_id: number, _auth0_id: string, _deactivate: boolean) {
    this._user_id = _user_id;
    this._auth0_id = _auth0_id;
    this._deactivate = _deactivate;
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

  public get deactivate(): boolean {
    return this._deactivate;
  }
}

export default Users;
