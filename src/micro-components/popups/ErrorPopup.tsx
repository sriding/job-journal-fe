import { useEffect } from "react";

interface IProps {
  errorPopupText: string;
  setToggleErrorPopup: React.Dispatch<React.SetStateAction<boolean>>;
  scrollDistance: number;
}

const ErrorPopup = (props: IProps) => {
  useEffect(() => {
    try {
      let popupElement: any = document.getElementsByClassName("ErrorPopup")[0];
      popupElement.style.setProperty(
        "left",
        `${Math.round((window.innerWidth - popupElement.clientWidth) / 2)}px`
      );
      popupElement.style.setProperty(
        "top",
        `calc(50vh + ${props.scrollDistance - popupElement.offsetHeight / 2}px`
      );
    } catch (error: any) {
      console.log(error.toString());
    }
  }, [props.scrollDistance]);

  return (
    <div className="ErrorPopup">
      <h3>Exception</h3>
      <p>{props.errorPopupText}</p>
      <button onClick={() => props.setToggleErrorPopup(false)}>Okay</button>
    </div>
  );
};

export default ErrorPopup;
