import { useEffect } from "react";

interface IProps {
  popupText: string;
  scrollDistance: number;
  setDeletePost: any;
  setDisplayDeleteConfirmationPopup: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

// This component needs to be adjusted since it is not sufficiently reusable.
// Look at setDeletePost, should be a generic function passed down instead
const DeleteConfirmation = (props: IProps) => {
  useEffect(() => {
    try {
      const deleteConfirmationElement: any =
        document.getElementsByClassName("DeleteConfirmation")[0];
      deleteConfirmationElement.style.setProperty(
        "top",
        `calc(50vh - 50px + ${props.scrollDistance}px)`
      );
    } catch (error: any) {
      console.log(error.toString());
    }
  }, [props.scrollDistance]);

  return (
    <div className="DeleteConfirmation">
      <p>{props.popupText}</p>
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
