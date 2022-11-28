import React from "react";
import LoginButton from "../../micro-components/auth/Login";
import Logout from "../../micro-components/auth/Logout";
import WebsiteTitle from "../../micro-components/titles/WebsiteTitle";

interface IProps {
  isAuthenticated: boolean;
  username: string;
}

const NavigationBar: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div className="GLOBAL-TERTIARY-COLOR-RULES NavigationBar">
      <WebsiteTitle />
      <ul>
        <li>
          {props.isAuthenticated ? (
            props.username
          ) : (
            <LoginButton text="Login" />
          )}
        </li>
        <li>
          {props.isAuthenticated ? <Logout /> : <LoginButton text="Register" />}
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
