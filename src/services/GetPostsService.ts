import GetPostsFailedException from "../exceptions/GetPostsFailedException";
import APIResponsePayloadType from "../shared/interfaces/APIResponsePayloadType";
import PostsWithCompaniesAndJobs from "../shared/interfaces/PostsWithCompaniesAndJobsInterface";
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
    url: string
  ): Promise<Array<PostsWithCompaniesAndJobs>> {
    try {
      // Fetch posts information from api
      const postInformationReponse = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      });

      // Grab JSON data from fetch response
      const response: APIResponsePayloadType =
        await postInformationReponse.json();

      if (response._success) {
        // API should have returned an empty array or an array of posts
        // Parameter fields must match response payload from api
        const postCompanyJobArray: PostsWithCompaniesAndJobs[] = [];

        response._payload.forEach((entry: typeof response._payload) => {
          const newPost: Post = new Post(entry._post_notes, entry._post_id);
          postCompanyJobArray.push({
            post: newPost,
            company: new Company(
              entry._company_name,
              entry._company_website,
              entry._company_information,
              entry._company_id,
              newPost
            ),
            job: new Job(
              entry._job_title,
              entry._job_information,
              entry._job_location,
              entry._job_type,
              entry._job_status,
              entry._job_application_submitted_date,
              entry._job_application_dismissed_date,
              entry._job_id,
              newPost
            ),
          });
        });

        return postCompanyJobArray;
      } else {
        throw new GetPostsFailedException(response._message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async requestMultiplePostsWithStartingIndex(
    url: string,
    postId: number
  ): Promise<PostsWithCompaniesAndJobs[]> {
    try {
      // Fetch posts information from api
      const postInformationReponse = await fetch(url + postId, {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      });

      // Grab JSON data from fetch response
      const response: APIResponsePayloadType =
        await postInformationReponse.json();

      if (response._success) {
        // API should have returned an empty array or an array of posts
        // Parameter fields must match response payload from api
        const postCompanyJobArray: PostsWithCompaniesAndJobs[] = [];

        if (response._payload.length === 0) {
          return [];
        }

        response._payload.forEach((entry: typeof response._payload) => {
          const newPost: Post = new Post(entry._post_notes, entry._post_id);
          postCompanyJobArray.push({
            post: newPost,
            company: new Company(
              entry._company_name,
              entry._company_website,
              entry._company_information,
              entry._company_id,
              newPost
            ),
            job: new Job(
              entry._job_title,
              entry._job_information,
              entry._job_location,
              entry._job_type,
              entry._job_status,
              entry._job_application_submitted_date,
              entry._job_application_dismissed_date,
              entry._job_id,
              newPost
            ),
          });
        });

        return postCompanyJobArray;
      } else {
        throw new GetPostsFailedException(response._message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async requestFilteredPosts(
    url: string,
    postId: number,
    text: string = ""
  ): Promise<PostsWithCompaniesAndJobs[]> {
    try {
      const request = await fetch(url + postId + "/filtered/by/" + text, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const response: APIResponsePayloadType = await request.json();

      if (response._success) {
        // Parameter fields must match response payload from api
        const postCompanyJobArray: PostsWithCompaniesAndJobs[] = [];

        if (response._payload.length === 0) {
          return [];
        }

        response._payload.forEach((entry: typeof response._payload) => {
          const newPost: Post = new Post(entry._post_notes, entry._post_id);
          postCompanyJobArray.push({
            post: newPost,
            company: new Company(
              entry._company_name,
              entry._company_website,
              entry._company_information,
              entry._company_id,
              newPost
            ),
            job: new Job(
              entry._job_title,
              entry._job_information,
              entry._job_location,
              entry._job_type,
              entry._job_status,
              entry._job_application_submitted_date,
              entry._job_application_dismissed_date,
              entry._job_id,
              newPost
            ),
          });
        });

        return postCompanyJobArray;
      } else {
        throw new GetPostsFailedException(response._message);
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

export default GetPostRequest;
