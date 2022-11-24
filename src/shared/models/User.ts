class User {
  private _id: number;
  private _auth0Id: string;
  constructor(id: number, auth0Id: string) {
    this._id = id;
    this._auth0Id = auth0Id;
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get auth0Id(): string {
    return this._auth0Id;
  }
  public set auth0Id(value: string) {
    this._auth0Id = value;
  }
}

export default User;
