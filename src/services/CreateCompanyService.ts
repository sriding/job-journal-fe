import Company from "../shared/models/Company";
import Post from "../shared/models/Post";
import Users from "../shared/models/Users";

class CreateCompanyService {
  private _url: string;
  private _token: string;
  private _postId: number;

  constructor(token: string, postId: number) {
    this._url = "http://localhost:8080/api/company/create/company/by/";
    this._token = token;
    this._postId = postId;
  }

  public async requestCompanyCreation(company: Company): Promise<Company> {
    try {
      const request = await fetch(this.url + this.postId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(company.toKeyValuePairs()),
      });

      const response = await request.json();

      // Parameter fields must match response payload from api
      return new Company(
        response._company_name,
        new Post(
          response._post._post_notes,
          response._post._post_id,
          new Users(
            response._post._user_user_id,
            response._post._user__auth0_id
          )
        ),
        response._company_id,
        response._company_website,
        response._company_information
      );
    } catch (error) {
      throw error;
    }
  }

  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }

  public get postId(): number {
    return this._postId;
  }
  public set postId(value: number) {
    this._postId = value;
  }
}

export default CreateCompanyService;
