import Post from "./Post";

class Company {
  private _company_id: number;
  private _post: Post;
  private _name: string;
  private _website: string;
  private _information: string;

  constructor(
    name: string,
    post: Post,
    company_id?: number,
    website?: string,
    information?: string
  ) {
    this._name = name;
    this._post = post;
    this._company_id = company_id ?? -1;
    this._website = website ?? "";
    this._information = information ?? "";
  }

  public get company_id(): number {
    return this._company_id;
  }
  public set company_id(value: number) {
    this._company_id = value;
  }

  public get post(): Post {
    return this._post;
  }
  public set post(value: Post) {
    this._post = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get website(): string {
    return this._website;
  }
  public set website(value: string) {
    this._website = value;
  }

  public get information(): string {
    return this._information;
  }
  public set information(value: string) {
    this._information = value;
  }

  public toKeyValuePairs(): { [key: string]: any } {
    let object: { [key: string]: any } = {};
    object["name"] = this.name;
    object["post"] = this.post;
    object["company_id"] = this.company_id;
    object["website"] = this.website;
    object["information"] = this.information;

    return object;
  }
}

export default Company;
