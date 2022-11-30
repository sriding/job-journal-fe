import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import "./App.css";
import CreatePostButtonContainer from "./macro-components/containers/CreatePostButtonContainer";
import NavigationBar from "./macro-components/navigation-bar/NavigationBar";
import DisplayPosts from "./micro-components/posts/DisplayPosts";
import GetPostsService from "./services/GetPostsService";
import PostPopup from "./macro-components/popups/PostPopup";
import PostsWithCompaniesAndJobs from "./shared/interfaces/PostsWithCompaniesAndJobsInterface";
import HomePageTitleContainer from "./macro-components/containers/HomePageTitleContainer";
import UpdateJobService from "./services/UpdateJobService";
import UpdateCompanyService from "./services/UpdateCompanyService";
import UpdatePostService from "./services/UpdatePostService";
import DeletePostWithCompanyWithJobService from "./services/DeletePostWithCompanyWithJobService";
import CreateUserWithProfileWithSetting from "./services/CreateUserWithProfileWithSetting";
import NotificationBar from "./micro-components/notifications/NotificationBar";
import DeleteConfirmation from "./micro-components/popups/DeleteConfirmation";
import SearchBar from "./micro-components/search-bar/SearchBar";
import LoadMoreButtonContainer from "./macro-components/containers/LoadMoreButtonContainer";
import CreatePostWithCompanyWithJobService from "./services/CreatePostWithCompanyWithJobService";
import UserWithProfileWithSetting from "./shared/composition/UserWithProfileWithSetting";

function App() {
  // App specific state
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>("");
  const [posts, setPosts] = useState<Array<PostsWithCompaniesAndJobs>>([]);
  const [postsPopup, togglePostsPopup] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [scrollDistance, setScrollDistance] = useState<number>(0);
  const [postUpdate, setPostUpdate] = useState<boolean>(false);
  const [displayDeleteConfirmationPopup, setDisplayDeleteConfirmationPopup] =
    useState<boolean>(false);
  const [deletePost, setDeletePost] = useState<boolean>(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number>(-1);
  const [startingIndexForPosts, setStartingIndexForPosts] = useState<number>(0);

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
  const [jobType, setJobType] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [jobApplicationDate, setJobApplicationDate] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<string>("");
  const [jobDismissedDate, setJobDismissedDate] = useState<string>("");
  const [jobInformation, setJobInformation] = useState<string>("");

  // Notification state
  const [notificationText, setNotificationText] = useState<string>("");
  const [displayConfirmationNotification, setDisplayConfirmationNotification] =
    useState<boolean>(false);
  const [notificationColorCssClass, setnotificationColorCssClass] =
    useState<string>("GLOBAL-POSITIVE-COLOR");

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

  const handleOnScroll = (event: any) => {
    setScrollDistance(window.scrollY);
  };

  const loadMorePosts = async (startingIndex: number) => {
    try {
      // starting index should match increments of how many posts should be obtained at once.
      // ie. if 20 posts should be fetched at a single time, then startingIndex can be 0 or 20 or 40 or 60, etc.
      const getPostsService: GetPostsService = new GetPostsService(token);
      const response: PostsWithCompaniesAndJobs[] =
        await getPostsService.requestMultiplePosts(
          `${process.env.REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL}`,
          startingIndexForPosts + 20
        );

      // Push new posts to current posts array
      setPosts([...posts, ...response]);

      // Update starting index in case load more is clicked again
      setStartingIndexForPosts(startingIndexForPosts + 20);
    } catch (error: any) {
      console.log(error.toString());
    }
  };

  useEffect(() => {
    const saveToken = async () => {
      try {
        if (isAuthenticated && posts.length === 0) {
          console.log("Authenticated.");
          // Get auth token from Auth0
          const accessToken = await getAccessTokenSilently({
            audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
            scope: `${process.env.REACT_APP_AUTH0_SCOPE}`,
          });

          // Save auth token in memory
          setToken(accessToken);

          // Check if user exists in the database. If the user does not exist, create the user.
          let createUserService: CreateUserWithProfileWithSetting =
            new CreateUserWithProfileWithSetting(accessToken);
          const createUserResponse: UserWithProfileWithSetting =
            await createUserService.requestCreation(
              `${process.env.REACT_APP_CREATE_USER_WITH_PROFILE_WITH_SETTING}`
            );

          // Set users current name to display in top right corner
          setUsername(createUserResponse.profile.profile_name);

          // If there are no posts already saved in memory for the current user, fetch a set of default posts for the user
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

          // Save starting index that was used for fetching posts
          setStartingIndexForPosts(0);

          // Scrolling position needs to be saved and passed down to many components to ensure popups and notifications are in the correct spot
          window.addEventListener("scroll", handleOnScroll);

          // Make sure to remove any event listeners that were created
          return () => {
            window.removeEventListener("scroll", handleOnScroll);
          };
        } else {
          console.log("App rendering...");
        }
      } catch (error: any) {
        console.log("APP ERROR: " + error.toString());
      }
    };

    saveToken();
  }, [getAccessTokenSilently, isAuthenticated, posts.length]);

  return (
    <div className="GLOBAL-PRIMARY-RULES">
      <NavigationBar isAuthenticated={isAuthenticated} username={username} />
      <HomePageTitleContainer />
      <SearchBar />
      <CreatePostButtonContainer
        togglePostsPopup={togglePostsPopup}
        clearPopupEntries={clearPopupEntries}
        setPostState={setPostState}
        setPostId={setPostId}
      />
      <DisplayPosts
        posts={posts}
        setPosts={setPosts}
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
        setPostUpdate={setPostUpdate}
        postUpdate={postUpdate}
        setnotificationColorCssClass={setnotificationColorCssClass}
        setNotificationText={setNotificationText}
        setDisplayConfirmationNotification={setDisplayConfirmationNotification}
        setDisplayDeleteConfirmationPopup={setDisplayDeleteConfirmationPopup}
        postIdToDelete={postIdToDelete}
        setPostIdToDelete={setPostIdToDelete}
        setDeletePost={setDeletePost}
        deletePost={deletePost}
      />
      {postsPopup ? (
        <PostPopup
          togglePostsPopup={togglePostsPopup}
          createPostWithCompanyWithJobService={
            CreatePostWithCompanyWithJobService
          }
          updatePostService={UpdatePostService}
          updateJobService={UpdateJobService}
          updateCompanyService={UpdateCompanyService}
          token={token}
          posts={posts}
          setPosts={setPosts}
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
          setDisplayConfirmationNotification={
            setDisplayConfirmationNotification
          }
          setNotificationText={setNotificationText}
          clearPopupEntries={clearPopupEntries}
          postState={postState}
          scrollDistance={scrollDistance}
          setPostUpdate={setPostUpdate}
          postUpdate={postUpdate}
          setnotificationColorCssClass={setnotificationColorCssClass}
        />
      ) : (
        <React.Fragment />
      )}
      {displayConfirmationNotification ? (
        <NotificationBar
          notificationText={notificationText}
          scrollDistance={scrollDistance}
          notificationColorCssClass={notificationColorCssClass}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {displayDeleteConfirmationPopup ? (
        <DeleteConfirmation
          scrollDistance={scrollDistance}
          setDeletePost={setDeletePost}
          setDisplayDeleteConfirmationPopup={setDisplayDeleteConfirmationPopup}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {posts.length > 0 && posts.length >= 20 ? (
        <LoadMoreButtonContainer
          loadMorePosts={loadMorePosts}
          startingIndexForPosts={startingIndexForPosts}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
}

export default App;
