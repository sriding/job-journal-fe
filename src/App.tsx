import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import "./App.css";
import CreatePostButtonContainer from "./macro-components/button-containers/CreatePostButtonContainer";
import NavigationBar from "./macro-components/navigation-bar/NavigationBar";
import DisplayPosts from "./micro-components/posts/DisplayPosts";
import GetPostsService from "./services/GetPostsService";
import Post from "./shared/models/Post";
import PostPopup from "./macro-components/popups/PostPopup";
import CreatePostService from "./services/CreatePostsService";
import CreateCompanyService from "./services/CreateCompanyService";
import CreateJobService from "./services/CreateJobService";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>("");
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [postsPopup, togglePostsPopup] = useState<boolean>(false);

  useEffect(() => {
    const saveToken = async () => {
      try {
        if (isAuthenticated) {
          console.log("Authenticated.");
          // Get auth token from Auth0
          const accessToken = await getAccessTokenSilently({
            audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
            scope: `${process.env.REACT_APP_AUTH0_SCOPE}`,
          });
          // Save auth token in memory
          setToken(accessToken);
          // Fetch default posts for signed in user
          const getPostsService: GetPostsService = new GetPostsService(
            accessToken
          );
          const posts: Array<Post> = await getPostsService.requestMultiplePosts(
            0
          );
          // Save posts in memory
          setPosts(posts);
        } else {
          console.log("Not authenticated.");
        }
      } catch (error) {
        console.log("APP ERROR: " + error);
      }
    };

    saveToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div className="GLOBAL-PRIMARY-RULES">
      <NavigationBar />
      <CreatePostButtonContainer togglePostsPopup={togglePostsPopup} />
      <DisplayPosts posts={posts} />
      {postsPopup ? (
        <PostPopup
          togglePostsPopup={togglePostsPopup}
          createPostService={CreatePostService}
          createCompanyService={CreateCompanyService}
          createJobService={CreateJobService}
          token={token}
        />
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}

export default App;
