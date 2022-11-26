import GetPostsFailedException from "../exceptions/GetPostsFailedException";
import PostsWithCompaniesAndJobs from "../shared/interfaces/PostsWithCompaniesAndJobs";
import Company from "../shared/models/Company";
import Job from "../shared/models/Job";
import Post from "../shared/models/Post";

class GetPostRequest {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestOnePost(url: string, postId: number): Promise<Post> {
    const postInformationReponse = await fetch(url + postId, {
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });

    return postInformationReponse.json();
  }

  public async requestMultiplePosts(
    url: string,
    startingIndex: number
  ): Promise<Array<PostsWithCompaniesAndJobs>> {
    try {
      // Fetch posts information from api
      const postInformationReponse = await fetch(url + startingIndex, {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      });

      // Grab JSON data from fetch response
      const response = await postInformationReponse.json();

      // API should have returned an empty array or an array of posts
      if (Array.isArray(response)) {
        // Parameter fields must match response payload from api
        const postCompanyJobArray: PostsWithCompaniesAndJobs[] = [];

        response.forEach((entry) => {
          const newPost: Post = new Post(entry._post_notes, entry._post_id);
          postCompanyJobArray.push({
            post: newPost,
            company: new Company(
              entry._company_name,
              newPost,
              entry._company_id,
              entry._company_website,
              entry._company_information
            ),
            job: new Job(
              newPost,
              entry._job_title,
              entry._job_id,
              entry._job_information,
              entry._job_location,
              entry._job_type,
              entry._job_status,
              entry._job_application_submitted_date,
              entry._job_application_dismissed_date
            ),
          });
        });

        return postCompanyJobArray;
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

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }
}

export default GetPostRequest;
