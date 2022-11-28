import React, { useEffect } from "react";
import CompanyInputForm from "../../micro-components/companies/CompanyInputForm";
import JobInputForm from "../../micro-components/jobs/JobInputForm";
import PostInputForm from "../../micro-components/posts/PostInputForm";
import closePopupIcon from "../../resources/close.png";
import CreateCompanyService from "../../services/CreateCompanyService";
import CreateJobService from "../../services/CreateJobService";
import CreatePostService from "../../services/CreatePostsService";
import UpdateCompanyService from "../../services/UpdateCompanyService";
import UpdateJobService from "../../services/UpdateJobService";
import UpdatePostService from "../../services/UpdatePostService";
import Company from "../../shared/models/Company";
import Job from "../../shared/models/Job";
import Post from "../../shared/models/Post";

interface IProps {
  togglePostsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  createPostService: typeof CreatePostService;
  createCompanyService: typeof CreateCompanyService;
  createJobService: typeof CreateJobService;
  updatePostService: typeof UpdatePostService;
  updateJobService: typeof UpdateJobService;
  updateCompanyService: typeof UpdateCompanyService;
  token: string;
  setPostNotes: React.Dispatch<React.SetStateAction<string>>;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  setCompanyWebsite: React.Dispatch<React.SetStateAction<string>>;
  setCompanyInformation: React.Dispatch<React.SetStateAction<string>>;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  setJobLocation: React.Dispatch<React.SetStateAction<string>>;
  setJobApplicationDate: React.Dispatch<React.SetStateAction<string | null>>;
  setJobStatus: React.Dispatch<React.SetStateAction<string>>;
  setJobDismissedDate: React.Dispatch<React.SetStateAction<string | null>>;
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
  jobApplicationDate: string | null;
  jobStatus: string;
  jobDismissedDate: string | null;
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
}

const PostPopup: React.FunctionComponent<IProps> = (props: IProps) => {
  useEffect(() => {
    // Ensure popup is in correct location regardless of scrolling
    let popupElement: any = document.getElementsByClassName("PostPopup")[0];
    popupElement.style.setProperty(
      "top",
      `calc(${props.scrollDistance}px + 2.5vh)`
    );
  }, [props.scrollDistance]);

  const handleCreatePostSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      // First create the post
      const postService: CreatePostService = new props.createPostService(
        new Post(props.postNotes),
        props.token
      );
      const postResponse: Post = await postService.createPostRequest();

      // Then create the company, using portion of post data from before
      const companyService: CreateCompanyService =
        new props.createCompanyService(props.token, postResponse.post_id);
      const companyResponse: Company =
        await companyService.requestCompanyCreation(
          new Company(
            props.companyName,
            postResponse,
            -1,
            props.companyWebsite,
            props.companyInformation
          )
        );

      // Then create the job, using portion of post data from before
      const jobService: CreateJobService = new props.createJobService(
        props.token,
        new Job(
          postResponse,
          props.jobTitle,
          -1,
          props.jobInformation,
          props.jobLocation,
          props.jobType,
          props.jobStatus,
          props.jobApplicationDate,
          props.jobDismissedDate
        )
      );

      const jobResponse: Job = await jobService.requestCreateJob(
        postResponse.post_id
      );

      props.setPostUpdate(!props.postUpdate);

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

      // Add popup that this worked!
    } catch (error) {
      console.log(error);
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

      props.setPostUpdate(!props.postUpdate);

      // Post-update
      props.setNotificationText("Post has been updated!");
      props.setDisplayConfirmationNotification(true);
      props.setnotificationColorCssClass("GLOBAL-POSITIVE-COLOR");
      setTimeout(() => {
        props.setDisplayConfirmationNotification(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompanySubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const companyService: UpdateCompanyService =
        new props.updateCompanyService(props.token);
      const updateResponse = await companyService.requestUpdateForCompany(
        `${process.env.REACT_APP_UPDATE_COMPANY_URL}`,
        new Company(
          props.companyName,
          new Post(props.postNotes, props.postId),
          props.companyId,
          props.companyWebsite,
          props.companyInformation
        ),
        props.postId
      );

      props.setPostUpdate(!props.postUpdate);

      // Post-update
      props.setNotificationText("Company has been updated!");
      props.setDisplayConfirmationNotification(true);
      props.setnotificationColorCssClass("GLOBAL-POSITIVE-COLOR");
      setTimeout(() => {
        props.setDisplayConfirmationNotification(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobSubmission: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<Job> = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const jobService: UpdateJobService = new props.updateJobService(
        props.token
      );
      const response: Job = await jobService.requestJobUpdate(
        `${process.env.REACT_APP_UPDATE_JOB_URL}`,
        new Job(
          new Post(props.postNotes, props.postId),
          props.jobTitle,
          props.jobId,
          props.jobInformation,
          props.jobLocation,
          props.jobType,
          props.jobStatus,
          props.jobApplicationDate,
          props.jobDismissedDate
        ),
        props.postId
      );

      props.setPostUpdate(!props.postUpdate);

      // Post-update
      props.setNotificationText("Job has been updated!");
      props.setDisplayConfirmationNotification(true);
      props.setnotificationColorCssClass("GLOBAL-POSITIVE-COLOR");
      setTimeout(() => {
        props.setDisplayConfirmationNotification(false);
      }, 3000);

      return response;
    } catch (error) {
      throw error;
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
