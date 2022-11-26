import Job from "../shared/models/Job";
import Post from "../shared/models/Post";

class UpdateJobService {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestJobUpdate(url: string, job: Job, postId: number) {
    const request = await fetch(url + postId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(job.toKeyValuePairs()),
    });

    const response = await request.json();

    // TODO: map JSON response to Job object
    return new Job(
      response._post,
      response._job_title,
      response._job_id,
      response._job_information,
      response._job_location,
      response._job_type,
      response._job_status,
      response._job_application_submitted_date,
      response._job_application_dismissed_date
    );
  }

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }
}

export default UpdateJobService;
