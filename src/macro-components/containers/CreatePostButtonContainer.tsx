import CreatePostButton from "../../micro-components/posts/CreatePostButton";

interface IProps {
  togglePostsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  clearPopupEntries: () => void;
  setPostState: React.Dispatch<React.SetStateAction<string>>;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}

const CreatePostButtonContainer: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  return (
    <div className="GLOBAL-HOME-PAGE-CENTERING">
      <CreatePostButton
        togglePostsPopup={props.togglePostsPopup}
        clearPopupEntries={props.clearPopupEntries}
        setPostState={props.setPostState}
        setPostId={props.setPostId}
      />
    </div>
  );
};

export default CreatePostButtonContainer;
