import React from "react";
import LoginButton from "../../micro-components/auth/Login";
import Logout from "../../micro-components/auth/Logout";
import WebsiteTitle from "../../micro-components/titles/WebsiteTitle";
import { Link } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  username: string;
  token: string;
  urlForSettings: string;
  accountDeactivated: boolean;
}

const NavigationBar: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div className="GLOBAL-TERTIARY-COLOR-RULES NavigationBar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <WebsiteTitle />
      </Link>
      <ul>
        <li>
          {props.isAuthenticated ? (
            <Link
              to={props.urlForSettings}
              style={{ textDecoration: "none" }}
              state={{
                isAuthenticated: props.isAuthenticated,
                username: props.username,
                token: props.token,
                accountDeactivated: props.accountDeactivated,
              }}
            >
              <p className="GLOBAL-TERTIARY-COLOR-RULES">{props.username}</p>
            </Link>
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
