import React from "react";

interface IProps {
  handleCreatePostSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUpdatePostSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
  postNotes: string;
  setPostNotes: React.Dispatch<React.SetStateAction<string>>;
  postState: string;
}
const PostInputForm = (props: IProps) => {
  const handleNotesInputChange = (event: any) => {
    props.setPostNotes(event.target.value);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (props.postState) {
      case "create":
        props.handleCreatePostSubmission(event);
        break;
      case "update":
        props.handleUpdatePostSubmission(event);
        break;
      default:
        break;
    }
  };

  const postStateButtonRender = () => {
    switch (props.postState) {
      case "create":
        return (
          <input
            type="submit"
            value="Create"
            className="PostPopup-Submit-Button"
          />
        );
      case "update":
        return (
          <input
            type="submit"
            value="Update Post"
            className="PostPopup-Submit-Button"
          />
        );
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="PostPopup-INPUT-FORMS">
      <label>
        Notes:
        <textarea
          className="GLOBAL-TEXTAREA-DIMENSIONS"
          value={props.postNotes}
          onChange={handleNotesInputChange}
        />
      </label>
      {postStateButtonRender()}
    </form>
  );
};

export default PostInputForm;
