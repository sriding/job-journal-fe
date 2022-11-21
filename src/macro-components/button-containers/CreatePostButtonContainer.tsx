import CreatePostButton from "../../micro-components/posts/CreatePostButton";
import GetPostRequest from "../../services/GetPostRequest";

interface IProps {
  getPostRequest: GetPostRequest;
}

const CreatePostButtonContainer: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  return (
    <div className="CreatePostButtonContainer">
      <CreatePostButton getPostRequest={props.getPostRequest} />
    </div>
  );
};

export default CreatePostButtonContainer;
