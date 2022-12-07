import MarkingUserAccountForDeletionError from "../exceptions/MarkingUserAccountForDeletionError";
import APIResponsePayloadType from "../shared/interfaces/APIResponsePayloadType";

class MarkUserAccountForDeletionService {
  private _token: string;

  constructor(_token: string) {
    this._token = _token;
  }

  public async markUserForDeletion(
    url: string = `${process.env.REACT_APP_MARK_USER_FOR_DELETION_URL}`
  ): Promise<string> {
    try {
      const request = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const response: APIResponsePayloadType = await request.json();

      if (response._success) {
        return response._message;
      } else {
        throw new MarkingUserAccountForDeletionError(response._message);
      }
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

export default MarkUserAccountForDeletionService;
