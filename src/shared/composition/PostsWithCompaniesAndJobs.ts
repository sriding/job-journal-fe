import Company from "../models/Company";
import Job from "../models/Job";
import Post from "../models/Post";

class PostsWithCompaniesAndJobs {
  private _post: Post;
  private _company: Company;
  private _job: Job;

  constructor(_post: Post, _company: Company, _job: Job) {
    this._post = _post;
    this._company = _company;
    this._job = _job;
  }

  public get post(): Post {
    return this._post;
  }
  public set post(value: Post) {
    this._post = value;
  }

  public get company(): Company {
    return this._company;
  }
  public set company(value: Company) {
    this._company = value;
  }

  public get job(): Job {
    return this._job;
  }
  public set job(value: Job) {
    this._job = value;
  }
}

export default PostsWithCompaniesAndJobs;
