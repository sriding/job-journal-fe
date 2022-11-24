import User from "./User";

class Post {
  private _id: number;
  private _user: User | null;
  private _notes: string;

  constructor(notes: string, id?: number, user?: User) {
    this._notes = notes;
    this._id = id ?? -1;
    this._user = user ?? null;
  }

  public get notes(): string {
    return this._notes;
  }
  public set notes(value: string) {
    this._notes = value;
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get user(): User | null {
    return this._user;
  }
  public set user(value: User | null) {
    this._user = value;
  }

  public toKeyValuePairs(): { [key: string]: any } {
    let object: { [key: string]: any } = {};
    object["notes"] = this._notes;
    object["id"] = this._id;
    object["user"] = this._user;

    return object;
  }
}

export default Post;
