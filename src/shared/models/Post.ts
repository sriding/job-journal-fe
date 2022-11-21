import User from "./User";

class Post {
  private _id: number;
  private _user: User;
  private _notes: string;
  private _dateCreated: Date;
  private _dateUpdated: Date;

  constructor(
    id: number,
    user: User,
    notes: string,
    dateCreated: Date,
    dateUpdated: Date
  ) {
    this._id = id;
    this._user = user;
    this._notes = notes;
    this._dateCreated = dateCreated;
    this._dateUpdated = dateUpdated;
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  public get notes(): string {
    return this._notes;
  }
  public set notes(value: string) {
    this._notes = value;
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

export default Post;
