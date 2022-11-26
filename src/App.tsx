import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import "./App.css";
import CreatePostButtonContainer from "./macro-components/containers/CreatePostButtonContainer";
import NavigationBar from "./macro-components/navigation-bar/NavigationBar";
import DisplayPosts from "./micro-components/posts/DisplayPosts";
import GetPostsService from "./services/GetPostsService";
import PostPopup from "./macro-components/popups/PostPopup";
import CreatePostService from "./services/CreatePostsService";
import CreateCompanyService from "./services/CreateCompanyService";
import CreateJobService from "./services/CreateJobService";
import PostsWithCompaniesAndJobs from "./shared/interfaces/PostsWithCompaniesAndJobs";
import HomePageTitleContainer from "./macro-components/containers/HomePageTitleContainer";
import PositiveNotification from "./micro-components/notifications/PositiveNotification";
import UpdateJobService from "./services/UpdateJobService";
import UpdateCompanyService from "./services/UpdateCompanyService";
import UpdatePostService from "./services/UpdatePostService";
import DeletePostWithCompanyWithJobService from "./services/DeletePostWithCompanyWithJobService";
import CreateUserWithProfileWithSetting from "./services/CreateUserWithProfileWithSetting";

function App() {
  // App specific state
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>("");
  const [posts, setPosts] = useState<Array<PostsWithCompaniesAndJobs>>([]);
  const [postsPopup, togglePostsPopup] = useState<boolean>(false);
  // 2 Types: create and update
  const [postState, setPostState] = useState<string>("create");

  // PostInputForm state
  const [postId, setPostId] = useState<number>(-1);
  const [postNotes, setPostNotes] = useState<string>("");

  // CompanyInputForm state
  const [companyId, setCompanyId] = useState<number>(-1);
  const [companyName, setCompanyName] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [companyInformation, setCompanyInformation] = useState<string>("");

  // JobInputform state
  const [jobId, setJobId] = useState<number>(-1);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobType, setJobType] = useState<string | null>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [jobApplicationDate, setJobApplicationDate] = useState<string | null>(
    ""
  );
  const [jobStatus, setJobStatus] = useState<string | null>("");
  const [jobDismissedDate, setJobDismissedDate] = useState<string | null>("");
  const [jobInformation, setJobInformation] = useState<string>("");

  // Notification state
  const [notificationText, setNotificationText] = useState<string>("");
  const [displayPositiveNotification, setDisplayPositiveNotification] =
    useState<boolean>(false);

  const clearPopupEntries: () => void = () => {
    setPostNotes("");
    setCompanyName("");
    setCompanyWebsite("");
    setCompanyInformation("");
    setJobTitle("");
    setJobType("");
    setJobLocation("");
    setJobApplicationDate("");
    setJobStatus("");
    setJobDismissedDate("");
    setJobInformation("");
  };

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

          // Check if user exists in database. If the user does not exist, create the user.
          let createUserService: CreateUserWithProfileWithSetting =
            new CreateUserWithProfileWithSetting(accessToken);
          const createUserResponse = await createUserService.requestCreation(
            `${process.env.REACT_APP_CREATE_USER_WITH_PROFILE_WITH_SETTING}`
          );
          // Fetch default posts for signed in user
          const getPostsService: GetPostsService = new GetPostsService(
            accessToken
          );
          const posts: Array<PostsWithCompaniesAndJobs> =
            await getPostsService.requestMultiplePosts(
              `${process.env.REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL}`,
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
      <HomePageTitleContainer />
      <CreatePostButtonContainer
        togglePostsPopup={togglePostsPopup}
        clearPopupEntries={clearPopupEntries}
        setPostState={setPostState}
        setPostId={setPostId}
      />
      <DisplayPosts
        posts={posts}
        togglePostsPopup={togglePostsPopup}
        deletePostWithCompanyWithJobService={
          DeletePostWithCompanyWithJobService
        }
        token={token}
        setPostId={setPostId}
        setPostNotes={setPostNotes}
        setCompanyId={setCompanyId}
        setCompanyName={setCompanyName}
        setCompanyWebsite={setCompanyWebsite}
        setCompanyInformation={setCompanyInformation}
        setJobId={setJobId}
        setJobTitle={setJobTitle}
        setJobType={setJobType}
        setJobLocation={setJobLocation}
        setJobApplicationDate={setJobApplicationDate}
        setJobStatus={setJobStatus}
        setJobDismissedDate={setJobDismissedDate}
        setJobInformation={setJobInformation}
        setPostState={setPostState}
      />
      {postsPopup ? (
        <PostPopup
          togglePostsPopup={togglePostsPopup}
          createPostService={CreatePostService}
          createCompanyService={CreateCompanyService}
          createJobService={CreateJobService}
          updatePostService={UpdatePostService}
          updateJobService={UpdateJobService}
          updateCompanyService={UpdateCompanyService}
          token={token}
          setPostNotes={setPostNotes}
          setCompanyName={setCompanyName}
          setCompanyWebsite={setCompanyWebsite}
          setCompanyInformation={setCompanyInformation}
          setJobTitle={setJobTitle}
          setJobType={setJobType}
          setJobLocation={setJobLocation}
          setJobApplicationDate={setJobApplicationDate}
          setJobStatus={setJobStatus}
          setJobDismissedDate={setJobDismissedDate}
          setJobInformation={setJobInformation}
          postId={postId}
          postNotes={postNotes}
          companyId={companyId}
          companyName={companyName}
          companyWebsite={companyWebsite}
          companyInformation={companyInformation}
          jobId={jobId}
          jobTitle={jobTitle}
          jobType={jobType}
          jobLocation={jobLocation}
          jobApplicationDate={jobApplicationDate}
          jobStatus={jobStatus}
          jobDismissedDate={jobDismissedDate}
          jobInformation={jobInformation}
          setDisplayPositiveNotification={setDisplayPositiveNotification}
          setNotificationText={setNotificationText}
          clearPopupEntries={clearPopupEntries}
          postState={postState}
        />
      ) : (
        <React.Fragment />
      )}
      <PositiveNotification
        notificationText={notificationText}
        displayPositiveNotification={displayPositiveNotification}
      />
    </div>
  );
}

export default App;
