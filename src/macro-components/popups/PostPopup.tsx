import React, { useEffect } from "react";
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
      const createPostWithCompanyWithJobService: CreatePostWithCompanyWithJobService =
        new CreatePostWithCompanyWithJobService(props.token);

      // User creation doesn't matter here since on the backend it is overwritten.
      const newPost: Post = new Post(props.postNotes);
      const newCompany: Company = new Company(
        props.companyName,
        props.companyWebsite,
        props.companyInformation
      );
      const newJob: Job = new Job(
        props.jobTitle,
        props.jobInformation,
        props.jobLocation,
        props.jobType,
        props.jobStatus,
        props.jobApplicationDate,
        props.jobDismissedDate
      );

      const response: PostsWithCompaniesAndJobs =
        await createPostWithCompanyWithJobService.requestCreation(
          `${process.env.REACT_APP_CREATE_POSTS_WITH_COMPANIES_AND_JOBS_URL}`,
          newPost,
          newCompany,
          newJob
        );

      //props.setPostUpdate(!props.postUpdate);

      props.setPosts([
        ...props.posts,
        {
          post: newPost,
          company: newCompany,
          job: newJob,
        },
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
    } catch (error: any) {
      console.log(error.toString());
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
    } catch (error: any) {
      console.log(error.toString());
    }
  };

  const handleCompanySubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const companyService: UpdateCompanyService =
        new props.updateCompanyService(props.token);
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

      props.setPostUpdate(!props.postUpdate);

      // Post-update
      props.setNotificationText("Company has been updated!");
      props.setDisplayConfirmationNotification(true);
      props.setnotificationColorCssClass("GLOBAL-POSITIVE-COLOR");
      setTimeout(() => {
        props.setDisplayConfirmationNotification(false);
      }, 3000);
    } catch (error: any) {
      console.log(error.toString());
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
