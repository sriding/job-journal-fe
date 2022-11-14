import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

//Auth0 domain for application
const domain = `${process.env.REACT_APP_AUTH0_DOMAIN}`;
//Auth0 client id for application
const clientId = `${process.env.REACT_APP_AUTH0_CLIENTID}`;
//Auth0 audience for Auth0 management API
const audience = `${process.env.REACT_APP_AUTH0_AUDIENCE}`;
//Auth0 scope for use with Auth0 management API
const scope = `${process.env.REACT_APP_AUTH0_SCOPE}`;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={audience}
    scope={scope}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
