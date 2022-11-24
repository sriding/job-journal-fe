import Post from "../shared/models/Post";

class CreatePostService {
  private _post: Post;
  private _url: string;
  private _token: string;

  constructor(post: Post, token: string) {
    this._post = post;
    this._token = token;
    this._url = "http://localhost:8080/api/post/create/post/by/token";
  }

  public async createPostRequest() {
    try {
      const request = await fetch(this._url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._token}`,
        },
        body: JSON.stringify(this._post.toKeyValuePairs()),
      });

      const response = await request.json();

      return response;
    } catch (error) {
      throw error;
    }
  }

  public get post(): Post {
    return this._post;
  }

  public set post(value: Post) {
    this._post = value;
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
}

export default CreatePostService;
