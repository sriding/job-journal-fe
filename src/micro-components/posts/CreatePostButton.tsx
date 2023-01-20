interface IProps {
  togglePostsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  clearPopupEntries: () => void;
  setPostState: React.Dispatch<React.SetStateAction<string>>;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}

const CreatePostButton: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <button
      type="button"
      className="GLOBAL-BUTTON-STYLING-RULES CreatePostButton"
      onClick={() => {
        try {
          props.clearPopupEntries();
          props.setPostId(-1);
          props.setPostState("create");
          props.togglePostsPopup(true);
        } catch (error) {}
      }}
    >
      Create Post
    </button>
  );
};

export default CreatePostButton;
