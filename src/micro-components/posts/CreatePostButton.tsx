interface IProps {
  togglePostsPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostButton: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <button
      className="GLOBAL-BUTTON-STYLING-RULES CreatePostButton"
      onClick={() => {
        props.togglePostsPopup(true);
      }}
    >
      Create Post
    </button>
  );
};

export default CreatePostButton;
