import Users from "./Users";

class Post {
  private _post_id: number;
  private _user: Users | null;
  private _post_notes: string;

  constructor(_post_notes: string, _post_id?: number, _user?: Users) {
    this._post_notes = _post_notes;
    this._post_id = _post_id ?? -1;
    this._user = _user ?? null;
  }

  public get post_id(): number {
    return this._post_id;
  }
  public set post_id(value: number) {
    this._post_id = value;
  }

  public get user(): Users | null {
    return this._user;
  }
  public set user(value: Users | null) {
    this._user = value;
  }

  public get post_notes(): string {
    return this._post_notes;
  }
  public set post_notes(value: string) {
    this._post_notes = value;
  }

  public toKeyValuePairs(): { [key: string]: any } {
    let object: { [key: string]: any } = {};
    object["_post_notes"] = this.post_notes;
    object["_post_id"] = this.post_id;
    object["_user"] = this.user;

    return object;
  }
}

export default Post;
