import Company from "../shared/models/Company";
import Post from "../shared/models/Post";

class UpdateCompanyService {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestUpdateForCompany(
    url: string,
    company: Company,
    postId: number
  ): Promise<Company> {
    try {
      const request = await fetch(url + postId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._token}`,
        },
        body: JSON.stringify(company.toKeyValuePairs()),
      });

      const response = await request.json();

      return new Company(
        response._company_name,
        new Post(response._post._post_notes, response._post._post_id),
        response._company_id,
        response._company_website,
        response._company_information
      );
    } catch (error) {
      throw error;
    }
  }

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }
}

export default UpdateCompanyService;
