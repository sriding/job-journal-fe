import Job from "../shared/models/Job";
import Post from "../shared/models/Post";
import Users from "../shared/models/Users";

class CreateJobService {
  private _url: string;
  private _token: string;
  private _job: Job;

  constructor(token: string, job: Job) {
    this._url = "http://localhost:8080/api/job/create/job/by/";
    this._token = token;
    this._job = job;
  }

  public async requestCreateJob(postId: number): Promise<Job> {
    try {
      const request = await fetch(this.url + postId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(this.job.toKeyValuePairs()),
      });

      const response = await request.json();

      // Parameter fields must match response payload from api
      return new Job(
        new Post(
          response._post._post_notes,
          response._post._post_id,
          new Users(
            response._post._user_user_id,
            response._post._user__auth0_id
          )
        ),
        response._job_title,
        response._job_id,
        response._job_information,
        response._job_location,
        response._job_type,
        response._job_status,
        response._job_application_submitted_date,
        response._job_application_dismissed_date
      );
    } catch (error) {
      throw error;
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

  public get job(): Job {
    return this._job;
  }
  public set job(value: Job) {
    this._job = value;
  }
}

export default CreateJobService;
