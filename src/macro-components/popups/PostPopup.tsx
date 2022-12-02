import React, { useEffect } from "react";
import FillInMissingDetailsException from "../../exceptions/FillInMissingDetailsException";
import MustBeSignedInException from "../../exceptions/MustBeSignedInException";
import CompanyInputForm from "../../micro-components/companies/CompanyInputForm";
import JobInputForm from "../../micro-components/jobs/JobInputForm";
import PostInputForm from "../../micro-components/posts/PostInputForm";
import closePopupIcon from "../../resources/close.png";
import CreatePostWithCompanyWithJobService from "../../services/CreatePostWithCompanyWithJobService";
import UpdateCompanyService from "../../services/UpdateCompanyService";
import UpdateJobService from "../../services/UpdateJobService";
import UpdatePostService from "../../services/UpdatePostService";
import PostsWithCompaniesAndJobs from "../../shared/interfaces/PostsWithCompaniesAndJobsInterface";
import Company from "../../shared/models/Company";
import Job from "../../shared/models/Job";
import Post from "../../shared/models/Post";

interface IProps {
  isAuthenticated: boolean;
  togglePostsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  createPostWithCompanyWithJobService: typeof CreatePostWithCompanyWithJobService;
  updatePostService: typeof UpdatePostService;
  updateJobService: typeof UpdateJobService;
  updateCompanyService: typeof UpdateCompanyService;
  token: string;
  posts: Array<PostsWithCompaniesAndJobs>;
  setPosts: React.Dispatch<
    React.SetStateAction<Array<PostsWithCompaniesAndJobs>>
  >;
  setPostNotes: React.Dispatch<React.SetStateAction<string>>;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  setCompanyWebsite: React.Dispatch<React.SetStateAction<string>>;
  setCompanyInformation: React.Dispatch<React.SetStateAction<string>>;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  setJobLocation: React.Dispatch<React.SetStateAction<string>>;
  setJobApplicationDate: React.Dispatch<React.SetStateAction<string>>;
  setJobStatus: React.Dispatch<React.SetStateAction<string>>;
  setJobDismissedDate: React.Dispatch<React.SetStateAction<string>>;
  setJobInformation: React.Dispatch<React.SetStateAction<string>>;
  postId: number;
  postNotes: string;
  companyId: number;
  companyName: string;
  companyWebsite: string;
  companyInformation: string;
  jobId: number;
  jobTitle: string;
  jobType: string;
  jobLocation: string;
  jobApplicationDate: string;
  jobStatus: string;
  jobDismissedDate: string;
  jobInformation: string;
  setDisplayConfirmationNotification: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setNotificationText: React.Dispatch<React.SetStateAction<string>>;
  clearPopupEntries: () => void;
  postState: string;
  scrollDistance: number;
  setPostUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  postUpdate: boolean;
  setnotificationColorCssClass: React.Dispatch<React.SetStateAction<string>>;
  setToggleErrorPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorPopupText: React.Dispatch<React.SetStateAction<string>>;
}

const PostPopup: React.FunctionComponent<IProps> = (props: IProps) => {
  useEffect(() => {
    try {
      // Ensure popup is in correct location regardless of scrolling
      let popupElement: any = document.getElementsByClassName("PostPopup")[0];
      popupElement.style.setProperty(
        "top",
        `calc(${props.scrollDistance}px + 2.5vh)`
      );
      // Static value should be close to max width for popup css class
      if (popupElement.clientWidth > 950) {
        popupElement.style.setProperty(
          "left",
          `calc(${Math.round(
            (window.innerWidth - popupElement.clientWidth) / 2
          )}px)`
        );
        popupElement.style.setProperty(
          "right",
          `calc(${Math.round(
            (window.innerWidth - popupElement.clientWidth) / 2
          )}px)`
        );
      }
    } catch (error: any) {
      console.log(error.toString());
    }
  }, [props.scrollDistance]);

  // Code for creating a new post
  const handleCreatePostSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      // Ensure the user is signed in first
      if (!props.isAuthenticated) {
        throw new MustBeSignedInException(
          "Please create and/or sign in to an account before making a request."
        );
      } else {
        // Check to make sure certain text inputs are not empty
        if (props.jobTitle === "" || props.companyName === "") {
          throw new FillInMissingDetailsException(
            "Job title and Company name are required fields."
          );
        } else {
          const createPostWithCompanyWithJobService: CreatePostWithCompanyWithJobService =
            new CreatePostWithCompanyWithJobService(props.token);

          const newPost: Post = new Post(props.postNotes);
          // No need to include post as a parameter here due to logic on backend
          const newCompany: Company = new Company(
            props.companyName,
            props.companyWebsite,
            props.companyInformation
          );
          // No need to include post as a parameter here due to logic on backend
          const newJob: Job = new Job(
            props.jobTitle,
            props.jobInformation,
            props.jobLocation,
            props.jobType,
            props.jobStatus,
            props.jobApplicationDate,
            props.jobDismissedDate
          );

          // Creates a new post on the backend
          const response: PostsWithCompaniesAndJobs =
            await createPostWithCompanyWithJobService.requestCreation(
              `${process.env.REACT_APP_CREATE_POSTS_WITH_COMPANIES_AND_JOBS_URL}`,
              newPost,
              newCompany,
              newJob
            );

          // MUST UPDATE post id of post and post references in company and job before adding to currently displayed posts!
          newPost.post_id = response.post.post_id;
          newCompany.post = newPost;
          newJob.post = newPost;
          // Updates the current posts displayed on the website
          props.setPosts([
            {
              post: newPost,
              company: newCompany,
              job: newJob,
            },
            ...props.posts,
          ]);

          // Post-save
          props.setNotificationText("Post has been created!");
          props.setDisplayConfirmationNotification(true);
          props.setnotificationColorCssClass("GLOBAL-POSITIVE-COLOR");
          setTimeout(() => {
            props.setDisplayConfirmationNotification(false);
          }, 3000);
          // Cleanup
          props.clearPopupEntries();
          props.togglePostsPopup(false);
        }
      }
    } catch (error: any) {
      props.setToggleErrorPopup(true);
      props.setErrorPopupText(error.toString());
    }
  };

  const handleUpdatePostSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const updatePostService: UpdatePostService = new props.updatePostService(
        props.token
      );
      const postResponse: Post = await updatePostService.requestUpdateForPost(
        `${process.env.REACT_APP_UPDATE_POST_URL}`,
        new Post(props.postNotes, props.postId),
        props.postId
      );

      // Update displayed posts on website to account for update on backend
      const postsDeepCopy = [...props.posts];
      for (let i = 0; i < postsDeepCopy.length; i++) {
        if (postsDeepCopy[i].post.post_id === props.postId) {
          postsDeepCopy[i].post = postResponse;
          break;
        }
      }
      props.setPosts(postsDeepCopy);

      // Post-update
      props.setNotificationText("Post has been updated!");
      props.setDisplayConfirmationNotification(true);
      props.setnotificationColorCssClass("GLOBAL-POSITIVE-COLOR");
      setTimeout(() => {
        props.setDisplayConfirmationNotification(false);
      }, 3000);
    } catch (error: any) {
      props.setToggleErrorPopup(true);
      props.setErrorPopupText(error.toString());
    }
  };

  const handleCompanySubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const companyService: UpdateCompanyService =
        new props.updateCompanyService(props.token);

      // Update company data on backend
      const updateResponse: Company =
        await companyService.requestUpdateForCompany(
          `${process.env.REACT_APP_UPDATE_COMPANY_URL}`,
          new Company(
            props.companyName,
            props.companyWebsite,
            props.companyInformation,
            props.companyId,
            new Post(props.postNotes, props.postId)
          ),
          props.postId
        );

      // Update displayed posts on website to account for update on backend
      const postsDeepCopy = [...props.posts];
      for (let i = 0; i < postsDeepCopy.length; i++) {
        if (postsDeepCopy[i].post.post_id === props.postId) {
          postsDeepCopy[i].company = updateResponse;
          break;
        }
      }
      props.setPosts(postsDeepCopy);

      // Post-update
      props.setNotificationText("Company has been updated!");
      props.setDisplayConfirmationNotification(true);
      props.setnotificationColorCssClass("GLOBAL-POSITIVE-COLOR");
      setTimeout(() => {
        props.setDisplayConfirmationNotification(false);
      }, 3000);
    } catch (error: any) {
      props.setToggleErrorPopup(true);
      props.setErrorPopupText(error.toString());
    }
  };

  const handleJobSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const jobService: UpdateJobService = new props.updateJobService(
        props.token
      );
      // Update job data on the backend
      const response: Job = await jobService.requestJobUpdate(
        `${process.env.REACT_APP_UPDATE_JOB_URL}`,
        new Job(
          props.jobTitle,
          props.jobInformation,
          props.jobLocation,
          props.jobType,
          props.jobStatus,
          props.jobApplicationDate,
          props.jobDismissedDate,
          props.jobId,
          new Post(props.postNotes, props.postId)
        ),
        props.postId
      );

      // Update displayed posts on website to account for update on backend
      const postsDeepCopy = [...props.posts];
      for (let i = 0; i < postsDeepCopy.length; i++) {
        if (postsDeepCopy[i].post.post_id === props.postId) {
          postsDeepCopy[i].job = response;
          break;
        }
      }
      props.setPosts(postsDeepCopy);

      // Post-update
      props.setNotificationText("Job has been updated!");
      props.setDisplayConfirmationNotification(true);
      props.setnotificationColorCssClass("GLOBAL-POSITIVE-COLOR");
      setTimeout(() => {
        props.setDisplayConfirmationNotification(false);
      }, 3000);
    } catch (error: any) {
      props.setToggleErrorPopup(true);
      props.setErrorPopupText(error.toString());
    }
  };

  const handleCloseIconClick = () => {
    props.togglePostsPopup(false);
  };

  return (
    <div className="PostPopup">
      <div>
        <img
          src={closePopupIcon}
          alt="Close Popup"
          onClick={handleCloseIconClick}
          className="GLOBAL-CLOSE-IMAGE"
        />
      </div>
      <JobInputForm
        handleJobSubmission={handleJobSubmission}
        jobTitle={props.jobTitle}
        jobType={props.jobType}
        jobLocation={props.jobLocation}
        jobApplicationDate={props.jobApplicationDate}
        jobStatus={props.jobStatus}
        jobDismissedDate={props.jobDismissedDate}
        jobInformation={props.jobInformation}
        setJobTitle={props.setJobTitle}
        setJobType={props.setJobType}
        setJobLocation={props.setJobLocation}
        setJobApplicationDate={props.setJobApplicationDate}
        setJobStatus={props.setJobStatus}
        setJobDismissedDate={props.setJobDismissedDate}
        setJobInformation={props.setJobInformation}
        postState={props.postState}
      />
      <CompanyInputForm
        handleCompanySubmission={handleCompanySubmission}
        companyName={props.companyName}
        companyWebsite={props.companyWebsite}
        companyInformation={props.companyInformation}
        setCompanyName={props.setCompanyName}
        setCompanyWebsite={props.setCompanyWebsite}
        setCompanyInformation={props.setCompanyInformation}
        postState={props.postState}
      />
      <PostInputForm
        handleCreatePostSubmission={handleCreatePostSubmission}
        handleUpdatePostSubmission={handleUpdatePostSubmission}
        postNotes={props.postNotes}
        setPostNotes={props.setPostNotes}
        postState={props.postState}
      />
    </div>
  );
};

export default PostPopup;
