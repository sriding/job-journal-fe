import React from "react";

interface IProps {
  handlePostSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
  postNotes: string;
  setPostNotes: React.Dispatch<React.SetStateAction<string>>;
}
const PostInputForm = (props: IProps) => {
  const handleNotesInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setPostNotes(event.target.value);
  };

  return (
    <form onSubmit={props.handlePostSubmission}>
      <label>
        Notes:
        <input
          type="text"
          value={props.postNotes}
          onChange={handleNotesInputChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default PostInputForm;
