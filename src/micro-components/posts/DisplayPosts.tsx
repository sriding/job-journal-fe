import { Fragment } from "react";
import Post from "../../shared/models/Post";

interface IProps {
  posts: Array<Post>;
}

const GetPosts: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <Fragment>
      {props.posts.map((p) => {
        return (
          <div key={p.id}>
            <p>{p.user ? p.user.auth0Id : "No user information."}</p>
            <p>{p.notes}</p>
          </div>
        );
      })}
    </Fragment>
  );
};

export default GetPosts;
