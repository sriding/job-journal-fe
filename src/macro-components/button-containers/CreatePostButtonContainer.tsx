import CreatePostButton from "../../micro-components/posts/CreatePostButton";

interface IProps {
  togglePostsPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostButtonContainer: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  return (
    <div className="CreatePostButtonContainer">
      <CreatePostButton togglePostsPopup={props.togglePostsPopup} />
    </div>
  );
};

export default CreatePostButtonContainer;
