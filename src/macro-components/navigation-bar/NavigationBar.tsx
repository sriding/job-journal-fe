import React from "react";
import LoginButton from "../../micro-components/auth/Login";
import Logout from "../../micro-components/auth/Logout";
import WebsiteTitle from "../../micro-components/titles/WebsiteTitle";

const NavigationBar: React.FunctionComponent = () => {
  return (
    <div className="GLOBAL-TERTIARY-COLOR-RULES NavigationBar">
      <WebsiteTitle />
      <ul>
        <li>
          <LoginButton />
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
