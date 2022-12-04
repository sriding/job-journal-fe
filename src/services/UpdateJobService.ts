import UpdatingJobFailedException from "../exceptions/UpdatingJobFailedException";
import APIResponsePayloadType from "../shared/interfaces/APIResponsePayloadType";
import Job from "../shared/models/Job";
import Post from "../shared/models/Post";

class UpdateJobService {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestJobUpdate(
    url: string,
    job: Job,
    postId: number
  ): Promise<Job> {
    try {
      const request = await fetch(url + postId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(job.toKeyValuePairs()),
      });

      const response: APIResponsePayloadType = await request.json();

      if (response._success) {
        return new Job(
          response._payload._job_title,
          response._payload._job_information,
          response._payload._job_location,
          response._payload._job_type,
          response._payload._job_status,
          response._payload._job_application_submitted_date,
          response._payload._job_application_dismissed_date,
          response._payload._job_id,
          new Post(
            response._payload._post._post_notes,
            response._payload._post._post_id
          )
        );
      } else {
        console.log(response._message);
        throw new UpdatingJobFailedException(response._message);
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

export default UpdateJobService;
