import { useAuth0 } from "@auth0/auth0-react";
import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import CreatePostButtonContainer from "./macro-components/containers/CreatePostButtonContainer";
import NavigationBar from "./macro-components/navigation-bar/NavigationBar";
import DisplayPosts from "./micro-components/posts/DisplayPosts";
import GetPostsService from "./services/GetPostsService";
import PostPopup from "./macro-components/popups/PostPopup";
import PostsWithCompaniesAndJobs from "./shared/interfaces/PostsWithCompaniesAndJobsInterface";
import HomePageTitleContainer from "./macro-components/containers/HomePageTitlesContainer";
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
import ClearSearchButtonContainer from "./macro-components/containers/ClearSearchButtonContainer";
import ErrorPopup from "./micro-components/popups/ErrorPopup";
import MustBeSignedInException from "./exceptions/MustBeSignedInException";
import StatusBar from "./micro-components/status-bar/StatusBar";
import HomePageSamplesTitle from "./micro-components/titles/HomePageSamplesTitle";

function App() {
  // App specific state
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accountDeactivated, setAccountDeactivated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [posts, setPosts] = useState<Array<PostsWithCompaniesAndJobs>>([]);
  const [username, setUsername] = useState<string>("");
  const [scrollDistance, setScrollDistance] = useState<number>(0);
  const [postUpdate, setPostUpdate] = useState<boolean>(false);
  const [deletePost, setDeletePost] = useState<boolean>(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number>(-1);
  const [startingIndexForPosts, setStartingIndexForPosts] = useState<number>(0);

  //Popup state
  const [postsPopup, togglePostsPopup] = useState<boolean>(false);
  const [displayDeleteConfirmationPopup, setDisplayDeleteConfirmationPopup] =
    useState<boolean>(false);
  const [toggleErrorPopup, setToggleErrorPopup] = useState<boolean>(false);
  const [errorPopupText, setErrorPopupText] = useState<string>("");
  const [popupText, setPopupText] = useState<string>(
    "Are you sure you want to delete the post?"
  );

  // SearchBar state
  const [searchBarText, setSearchBarText] = useState<string>("");

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

  // Load more state
  const [filteredTextSnapshot, setFilteredTextSnapshot] = useState<string>("");

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

          // Check if user exists in the database. If the user does not exist, create the user.
          let createUserService: CreateUserWithProfileWithSetting =
            new CreateUserWithProfileWithSetting(accessToken);
          const createUserResponse: UserWithProfileWithSetting =
            await createUserService.requestCreation(
              `${process.env.REACT_APP_CREATE_USER_WITH_PROFILE_WITH_SETTING}`
            );

          // Set users current name to display in top right corner
          setUsername(createUserResponse.profile.profile_name);
          // If the user's account has been marked for deletion, display status bar at top of app.
          setAccountDeactivated(createUserResponse.user.deactivate);

          // Fetch initial posts for user
          const posts = await fetchPosts(accessToken);

          // Save posts in memory
          setPosts(posts);
        } else {
          const GetPostsServiceInstance = new GetPostsService("");
          const unauthorizedPosts =
            await GetPostsServiceInstance.requestMultiplePosts(
              `${process.env.REACT_APP_GET_POSTS_FOR_UNAUTHORIZED_USERS}`,
              false
            );
          setPosts(unauthorizedPosts);
          console.log("App rendering...");
        }
      } catch (error: any) {
        setToggleErrorPopup(true);
        setErrorPopupText(error.toString());
      }
    };

    saveToken();

    // Scrolling position needs to be saved and passed down to many components to ensure popups and notifications are in the correct spot
    window.addEventListener("scroll", handleOnScroll);

    // Make sure to remove any event listeners that were created
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [getAccessTokenSilently, isAuthenticated]);

  const handleOnScroll = (event: any) => {
    setScrollDistance(window.scrollY);
  };

  const loadMorePosts = async () => {
    try {
      // starting index should match increments of how many posts should be obtained at once.
      // ie. if 20 posts should be fetched at a single time, then startingIndex can be 0 or 20 or 40 or 60, etc.
      const getPostsService: GetPostsService = new GetPostsService(token);
      if (filteredTextSnapshot.length > 0) {
        const response: PostsWithCompaniesAndJobs[] =
          await getPostsService.requestFilteredPosts(
            `${process.env.REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL_WITH_STANDARD_AND_FILTER}`,
            posts.length > 0 ? posts[posts.length - 1].post.post_id : -1,
            filteredTextSnapshot
          );

        // Push new posts to current posts array if response contains anything
        if (response.length > 0) {
          setPosts([...posts, ...response]);
        }
      } else {
        const response: PostsWithCompaniesAndJobs[] =
          await getPostsService.requestMultiplePostsWithStartingIndex(
            `${process.env.REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL_WITH_STANDARD}`,
            posts.length > 0 ? posts[posts.length - 1].post.post_id : -1
          );

        // Push new posts to current posts array if response contains anything
        if (response.length > 0) {
          setPosts([...posts, ...response]);
        }
      }
    } catch (error: any) {
      setToggleErrorPopup(true);
      setErrorPopupText(error.toString());
    }
  };

  const fetchFilteredPosts = async () => {
    try {
      // Confirm that the user is signed in
      if (!isAuthenticated) {
        throw new MustBeSignedInException(
          "Please create and/or sign in to an account before making a request."
        );
      } else {
        const getPostsService: GetPostsService = new GetPostsService(token);
        if (searchBarText === "") {
          const filteredPosts: PostsWithCompaniesAndJobs[] = await fetchPosts(
            token
          );
          setFilteredTextSnapshot("");
          setPosts(filteredPosts);
        } else {
          const filteredPosts: PostsWithCompaniesAndJobs[] =
            await getPostsService.requestFilteredPosts(
              `${process.env.REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL_WITH_STANDARD_AND_FILTER}`,
              1000000,
              searchBarText
            );

          setFilteredTextSnapshot(searchBarText);
          setPosts(filteredPosts);
        }
      }
    } catch (error: any) {
      setToggleErrorPopup(true);
      setErrorPopupText(error.toString());
    }
  };

  const fetchPosts: any = async (accessToken: string) => {
    try {
      // Ensure that the user is signed in first
      if (!isAuthenticated) {
        throw new MustBeSignedInException(
          "Please create and/or sign in to an account before making a request."
        );
      } else {
        // If there are no posts already saved in memory for the current user, fetch a set of default posts for the user
        const getPostsService: GetPostsService = new GetPostsService(
          accessToken
        );
        const initialPosts: Array<PostsWithCompaniesAndJobs> =
          await getPostsService.requestMultiplePosts(
            `${process.env.REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL}`
          );

        return initialPosts;
      }
    } catch (error: any) {
      setToggleErrorPopup(true);
      setErrorPopupText(error.toString());
    }
  };

  const resetSearchBar = async () => {
    setSearchBarText("");
    try {
      // Ensure user is signed in first
      if (!isAuthenticated) {
        throw new MustBeSignedInException(
          "Please create and/or sign in to an account before making a request."
        );
      } else {
        const initialPosts = await fetchPosts(token);
        setPosts(initialPosts);
      }
    } catch (error: any) {
      setToggleErrorPopup(true);
      setErrorPopupText(error.toString());
    }
  };

  return (
    <div className="GLOBAL-PRIMARY-RULES">
      <NavigationBar
        isAuthenticated={isAuthenticated}
        username={username}
        urlForSettings="settings"
        accountDeactivated={accountDeactivated}
        token={token}
      />
      {accountDeactivated ? <StatusBar /> : <React.Fragment></React.Fragment>}
      <HomePageTitleContainer />
      <SearchBar
        fetchFilteredPosts={fetchFilteredPosts}
        searchBarText={searchBarText}
        setSearchBarText={setSearchBarText}
      />
      {searchBarText.length > 0 ? (
        <ClearSearchButtonContainer resetSearchBar={resetSearchBar} />
      ) : (
        <React.Fragment></React.Fragment>
      )}

      <CreatePostButtonContainer
        togglePostsPopup={togglePostsPopup}
        clearPopupEntries={clearPopupEntries}
        setPostState={setPostState}
        setPostId={setPostId}
      />
      {isAuthenticated ? <Fragment></Fragment> : <HomePageSamplesTitle />}
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
        setToggleErrorPopup={setToggleErrorPopup}
        setErrorPopupText={setErrorPopupText}
      />
      {postsPopup ? (
        <PostPopup
          isAuthenticated={isAuthenticated}
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
          setToggleErrorPopup={setToggleErrorPopup}
          setErrorPopupText={setErrorPopupText}
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
          popupText={popupText}
          scrollDistance={scrollDistance}
          setDeletePost={setDeletePost}
          setDisplayDeleteConfirmationPopup={setDisplayDeleteConfirmationPopup}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {isAuthenticated ? (
        <LoadMoreButtonContainer
          loadMorePosts={loadMorePosts}
          startingIndexForPosts={startingIndexForPosts}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {toggleErrorPopup ? (
        <ErrorPopup
          setToggleErrorPopup={setToggleErrorPopup}
          errorPopupText={errorPopupText}
          scrollDistance={scrollDistance}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
}

export default App;
