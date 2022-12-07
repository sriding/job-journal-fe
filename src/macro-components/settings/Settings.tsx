import NavigationBar from "../navigation-bar/NavigationBar";
import { useLocation } from "react-router-dom";
import SettingPageTitle from "../../micro-components/titles/SettingPageTitle";
import DeleteUserButton from "../../micro-components/settings/DeleteUserButton";
import NotificationBar from "../../micro-components/notifications/NotificationBar";
import React, { useEffect, useState } from "react";
import DeleteConfirmation from "../../micro-components/popups/DeleteConfirmation";
import MarkUserAccountForDeletionService from "../../services/MarkUserAccountForDeletionService";
import StatusBar from "../../micro-components/status-bar/StatusBar";

interface IProps {
  isAuthenticated: boolean;
  username: string;
  urlForSettings: string;
  accountDeactivated: boolean;
  token: string;
}

const Settings = () => {
  const state: IProps = useLocation().state;
  const [scrollDistance, setScrollDistance] = useState<number>(0);
  // For Notifications
  const [toggleNotification, setToggleNotification] = useState<boolean>(false);
  const [notificationText, setNotificationText] = useState<string>("");
  const [notificationCSSClass, setNotificationCSSClass] = useState<string>(
    "GLOBAL-POSITIVE-COLOR"
  );
  // For Popup
  const [displayDeleteConfirmationPopup, setDisplayDeleteConfirmationPopup] =
    useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>(
    "Are you sure you want to mark your account for deletion? This cannot be undone (as of now)."
  );

  const markAccountForDeletion = async (bool: boolean) => {
    // call service here
    try {
      const markAccountForDeletionService: MarkUserAccountForDeletionService =
        new MarkUserAccountForDeletionService(state.token);

      const response =
        await markAccountForDeletionService.markUserForDeletion();

      setToggleNotification(true);
      setNotificationText("Account successfully marked for deletion!");
    } catch (error: any) {
      console.log(error.toString());
    } finally {
      setDisplayDeleteConfirmationPopup(false);
      setTimeout(() => {
        setToggleNotification(false);
        setNotificationText("");
      }, 3000);
    }
  };

  return (
    <div className="GLOBAL-PRIMARY-RULES Settings">
      <NavigationBar
        accountDeactivated={state.accountDeactivated}
        isAuthenticated={state.isAuthenticated}
        username={state.username}
        urlForSettings={state.urlForSettings}
        token={state.token}
      />
      {state.accountDeactivated ? (
        <StatusBar />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <SettingPageTitle />
      <DeleteUserButton
        setToggleNotification={setToggleNotification}
        token={state.token}
        setDisplayDeleteConfirmationPopup={setDisplayDeleteConfirmationPopup}
      />
      {displayDeleteConfirmationPopup ? (
        <DeleteConfirmation
          popupText={popupText}
          scrollDistance={scrollDistance}
          setDeletePost={markAccountForDeletion}
          setDisplayDeleteConfirmationPopup={setDisplayDeleteConfirmationPopup}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {toggleNotification ? (
        <NotificationBar
          notificationText={notificationText}
          notificationColorCssClass={notificationCSSClass}
          scrollDistance={scrollDistance}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};

export default Settings;
