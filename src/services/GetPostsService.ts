import GetPostsFailedException from "../exceptions/GetPostsFailedException";
import Post from "../shared/models/Post";

class GetPostRequest {
  private _url: string;
  private _token: string;

  constructor(token: string) {
    this._url = "http://localhost:8080/api/post/get/posts/by/token";
    this._token = token;
  }

  public async requestOnePost(postId: number): Promise<Post> {
    const postInformationReponse = await fetch(this._url + "/" + postId, {
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });

    return postInformationReponse.json();
  }

  public async requestMultiplePosts(
    startingIndex: number
  ): Promise<Array<Post>> {
    try {
      // Fetch posts information from api
      const postInformationReponse = await fetch(
        this._url + "/" + startingIndex,
        {
          headers: {
            Authorization: `Bearer ${this._token}`,
          },
        }
      );

      // Grab JSON data from fetch response
      const response = await postInformationReponse.json();

      // API should have returned an empty array or an array of posts
      if (Array.isArray(response)) {
        return response;
      } else {
        throw new GetPostsFailedException(response);
      }
    } catch (error: any) {
      if (error instanceof GetPostsFailedException) {
        throw error.getErrorMessage();
      }

      throw error.toString();
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
}

export default GetPostRequest;
