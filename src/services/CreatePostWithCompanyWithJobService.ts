import PostCompanyJobNotCreatedException from "../exceptions/PostCompanyJobNotCreatedException";
import PostsWithCompaniesAndJobs from "../shared/composition/PostsWithCompaniesAndJobs";
import APIResponsePayloadType from "../shared/interfaces/APIResponsePayloadType";
import Company from "../shared/models/Company";
import Job from "../shared/models/Job";
import Post from "../shared/models/Post";

class CreatePostWithCompanyWithJobService {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestCreation(
    url: string,
    post: Post,
    company: Company,
    job: Job
  ): Promise<PostsWithCompaniesAndJobs> {
    try {
      const bodyOfRequest = {
        _post: {
          _post_notes: post.post_notes,
        },
        _company: {
          _company_information: company.company_information,
          _company_name: company.company_name,
          _company_website: company.company_website,
        },
        _job: {
          _job_application_dismissed_date: job.job_application_dismissed_date,
          _job_application_submitted_date: job.job_application_submitted_date,
          _job_information: job.job_information,
          _job_location: job.job_location,
          _job_status: job.job_status,
          _job_title: job.job_title,
          _job_type: job.job_type,
        },
      };

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(bodyOfRequest),
      });

      const response: APIResponsePayloadType = await request.json();

      if (response._success) {
        const postInResponse = new Post(
          response._payload._post._post_notes,
          response._payload._post._post_id
        );

        return new PostsWithCompaniesAndJobs(
          postInResponse,
          new Company(
            response._payload._company._company_name,
            response._payload._company._company_website,
            response._payload._company._company_information,
            response._payload._company._company_id,
            postInResponse
          ),
          new Job(
            response._payload._job._job_title,
            response._payload._job._job_information,
            response._payload._job._job_location,
            response._payload._job._job_type,
            response._payload._job._job_status,
            response._payload._job._job_application_submitted_date,
            response._payload._job._job_application_dismissed_date,
            response._payload._job._job_id,
            postInResponse
          )
        );
      } else {
        throw new PostCompanyJobNotCreatedException(response._message);
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

export default CreatePostWithCompanyWithJobService;
