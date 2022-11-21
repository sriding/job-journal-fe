import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import "./App.css";
import CreatePostButtonContainer from "./macro-components/button-containers/CreatePostButtonContainer";
import NavigationBar from "./macro-components/navigation-bar/NavigationBar";
import GetPostRequest from "./services/GetPostRequest";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    const saveToken = async () => {
      if (isAuthenticated) {
        console.log("Authenticated.");
        const accessToken = await getAccessTokenSilently({
          audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
          scope: `${process.env.REACT_APP_AUTH0_SCOPE}`,
        });
        setToken(accessToken);
      } else {
        console.log("Not authenticated.");
      }
    };

    saveToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div className="GLOBAL-PRIMARY-RULES">
      <NavigationBar />
      <CreatePostButtonContainer getPostRequest={new GetPostRequest(token)} />
    </div>
  );
}

export default App;
