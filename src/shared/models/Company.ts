import Post from "./Post";

class Company {
  private _company_id: number;
  private _post: Post;
  private _company_name: string;
  private _company_website: string;
  private _company_information: string;

  constructor(
    _company_name: string,
    _post: Post,
    _company_id?: number,
    _company_website?: string,
    _company_information?: string
  ) {
    this._company_name = _company_name;
    this._post = _post;
    this._company_id = _company_id ?? -1;
    this._company_website = _company_website ?? "";
    this._company_information = _company_information ?? "";
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

  public get company_name(): string {
    return this._company_name;
  }
  public set company_name(value: string) {
    this._company_name = value;
  }

  public get company_website(): string {
    return this._company_website;
  }
  public set company_website(value: string) {
    this._company_website = value;
  }

  public get company_information(): string {
    return this._company_information;
  }
  public set company_information(value: string) {
    this._company_information = value;
  }

  public toKeyValuePairs(): { [key: string]: any } {
    let object: { [key: string]: any } = {};
    object["_company_name"] = this.company_name;
    object["_post"] = this.post;
    object["_company_id"] = this.company_id;
    object["_company_website"] = this.company_website;
    object["_company_information"] = this.company_information;

    return object;
  }
}

export default Company;
