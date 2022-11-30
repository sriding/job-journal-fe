import UpdatingCompanyFailedException from "../exceptions/UpdatingCompanyFailedException";
import APIResponsePayloadType from "../shared/interfaces/APIResponsePayloadType";
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

      const response: APIResponsePayloadType = await request.json();

      if (response._success) {
        return new Company(
          response._payload._company_name,
          response._payload._company_website,
          response._payload._company_information,
          response._payload._company_id,
          new Post(
            response._payload._post._post_notes,
            response._payload._post._post_id
          )
        );
      } else {
        throw new UpdatingCompanyFailedException(response._message);
      }
    } catch (error) {
      console.log(error);
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
