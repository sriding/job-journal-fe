import Post from "../shared/models/Post";

class UpdatePostService {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestUpdateForPost(url: string, post: Post, postId: number) {
    try {
      const request = await fetch(url + postId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._token}`,
        },
        body: JSON.stringify(post.toKeyValuePairs()),
      });

      const response = await request.json();

      return new Post(response._post_notes, response._post_id);
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

export default UpdatePostService;
