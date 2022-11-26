import Company from "../models/Company";
import Job from "../models/Job";
import Post from "../models/Post";

interface PostsWithCompaniesAndJobs {
  post: Post;
  company: Company;
  job: Job;
}

export default PostsWithCompaniesAndJobs;
