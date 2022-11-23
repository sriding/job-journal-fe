const CreatePostButton: React.FunctionComponent = () => {
  return (
    <button
      className="GLOBAL-BUTTON-STYLING-RULES CreatePostButton"
      onClick={() => {
        console.log("Hello world!");
      }}
    >
      Create Post
    </button>
  );
};

export default CreatePostButton;
