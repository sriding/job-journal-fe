import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface IProps {
  text: string;
}

const Login = (props: IProps) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      type="button"
      className="GLOBAL-BUTTON-STYLING-RULES"
    >
      {props.text}
    </button>
  );
};

export default Login;
