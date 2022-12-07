interface IProps {
  setToggleNotification: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setDisplayDeleteConfirmationPopup: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const DeleteUserButton = (props: IProps) => {
  return (
    <div id="DeleteUserButton">
      <button
        className="GLOBAL-DELETE-BUTTONS"
        onClick={async () => {
          try {
            props.setDisplayDeleteConfirmationPopup(true);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Mark Account for Deletion
      </button>
      <p className="GLOBAL-SUB-EXPLAINATION-TEXT">
        Clicking this will mark your account for deletion. Your account and all
        corresponding account information will be permantenly removed at the end
        of the week (PST) and you will no longer be able to login.
      </p>
    </div>
  );
};

export default DeleteUserButton;
