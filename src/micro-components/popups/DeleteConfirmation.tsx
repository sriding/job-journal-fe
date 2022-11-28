import { useEffect } from "react";

interface IProps {
  scrollDistance: number;
  setDeletePost: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayDeleteConfirmationPopup: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const DeleteConfirmation = (props: IProps) => {
  useEffect(() => {
    const deleteConfirmationElement: any =
      document.getElementsByClassName("DeleteConfirmation")[0];
    deleteConfirmationElement.style.setProperty(
      "top",
      `calc(50vh - 50px + ${props.scrollDistance}px)`
    );
  }, [props.scrollDistance]);

  return (
    <div className="DeleteConfirmation">
      <p>Are you sure you want to delete this post?</p>
      <div>
        <button
          className="GLOBAL-BUTTON-STYLING-RULES"
          onClick={() => {
            props.setDeletePost(true);
            props.setDisplayDeleteConfirmationPopup(false);
          }}
        >
          Yes
        </button>
        <button
          className="GLOBAL-BUTTON-STYLING-RULES"
          onClick={() => {
            props.setDisplayDeleteConfirmationPopup(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
