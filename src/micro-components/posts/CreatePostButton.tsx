import { useState } from "react";
import GetPostRequest from "../../services/GetPostRequest";
import Post from "../../shared/models/Post";

interface IProps {
  getPostRequest: GetPostRequest;
}

const CreatePostButton: React.FunctionComponent<IProps> = (props: IProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div>
      <button
        className="GLOBAL-BUTTON-STYLING-RULES CreatePostButton"
        onClick={() =>
          props.getPostRequest.requestMultiplePosts(0).then((p) => {
            console.log(p);
            setPosts(p);
          })
        }
      >
        Create Post
      </button>
      <div>{posts ? 0 : posts}</div>
    </div>
  );
};

export default CreatePostButton;
