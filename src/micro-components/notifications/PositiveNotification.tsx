import React from "react";

interface IProps {
  notificationText: string;
  displayPositiveNotification: boolean;
}

const PositiveNotification = (props: IProps) => {
  return (
    <div className="GLOBAL-NOTIFICATION-BAR">
      {props.displayPositiveNotification ? (
        <div className="GLOBAL-POSITIVE-COLOR">
          <p>{props.notificationText}</p>
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};

export default PositiveNotification;
