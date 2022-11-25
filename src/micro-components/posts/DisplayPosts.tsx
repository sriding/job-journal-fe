import { Fragment } from "react";
import Company from "../../shared/models/Company";
import Job from "../../shared/models/Job";
import Post from "../../shared/models/Post";

interface IProps {
  posts: Array<{ post: Post; company: Company; job: Job }>;
}

const GetPosts: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <Fragment>
      {props.posts.map((p) => {
        return (
          <div key={p.post.post_id}>
            <p>{p.post.post_notes}</p>
            <p>{p.company.company_information}</p>
            <p>{p.job.job_information}</p>
          </div>
        );
      })}
    </Fragment>
  );
};

export default GetPosts;
