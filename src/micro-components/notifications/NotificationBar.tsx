import React, { useEffect } from "react";

interface IProps {
  notificationText: string;
  scrollDistance: number;
  notificationColorCssClass: string;
}

const PositiveNotification = (props: IProps) => {
  useEffect(() => {
    let notificationBarElement: any = document.getElementsByClassName(
      "GLOBAL-NOTIFICATION-BAR"
    )[0];
    notificationBarElement.style.setProperty(
      "top",
      `calc(90vh + ${props.scrollDistance}px - 18px)`
    );
  }, [props.scrollDistance]);
  return (
    <div
      className={`GLOBAL-NOTIFICATION-BAR ${props.notificationColorCssClass}`}
    >
      <h2 className="GLOBAL-NOTIFICATION-TEXT">{props.notificationText}</h2>
    </div>
  );
};

export default PositiveNotification;
