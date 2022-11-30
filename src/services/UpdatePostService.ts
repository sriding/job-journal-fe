import UpdatingPostFailedException from "../exceptions/UpdatingPostFailedException";
import APIResponsePayloadType from "../shared/interfaces/APIResponsePayloadType";
import Post from "../shared/models/Post";

class UpdatePostService {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestUpdateForPost(
    url: string,
    post: Post,
    postId: number
  ): Promise<Post> {
    try {
      const request = await fetch(url + postId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._token}`,
        },
        body: JSON.stringify(post.toKeyValuePairs()),
      });

      const response: APIResponsePayloadType = await request.json();

      if (response._success) {
        return new Post(
          response._payload._post_notes,
          response._payload._post_id
        );
      } else {
        throw new UpdatingPostFailedException(response._message);
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

export default UpdatePostService;
