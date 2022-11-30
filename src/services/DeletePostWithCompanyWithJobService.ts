import PostCompanyJobNotDeletedException from "../exceptions/PostCompanyJobNotDeletedException";
import APIResponsePayloadType from "../shared/interfaces/APIResponsePayloadType";

class DeletePostWithCompanyWithJobService {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestDeletion(url: string, postId: number): Promise<boolean> {
    try {
      const request = await fetch(url + postId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const response: APIResponsePayloadType = await request.json();

      if (response._success) {
        return response._success;
      } else {
        throw new PostCompanyJobNotDeletedException(response._message);
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

export default DeletePostWithCompanyWithJobService;
