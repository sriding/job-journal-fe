class User {
  private _id: number;
  private _auth0Id: string;
  private _dateCreated: Date;
  private _dateUpdated: Date;

  constructor(
    id: number,
    auth0Id: string,
    dateCreated: Date,
    dateUpdated: Date
  ) {
    this._id = id;
    this._auth0Id = auth0Id;
    this._dateCreated = dateCreated;
    this._dateUpdated = dateUpdated;
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

  public get dateCreated(): Date {
    return this._dateCreated;
  }
  public set dateCreated(value: Date) {
    this._dateCreated = value;
  }

  public get dateUpdated(): Date {
    return this._dateUpdated;
  }
  public set dateUpdated(value: Date) {
    this._dateUpdated = value;
  }
}

export default User;
