import Job from "../shared/models/Job";

class CreateJobService {
  private _url: string;
  private _token: string;
  private _job: Job;

  constructor(token: string, job: Job) {
    this._url = "http://localhost:8080/api/job/create/job/by/";
    this._token = token;
    this._job = job;
  }

  public async requestCreateJob(postId: number) {
    const request = await fetch(this.url + postId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(this.job.toKeyValuePairs()),
    });

    const response = await request.json();

    return response;
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
