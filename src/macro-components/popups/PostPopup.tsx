import React, { useState } from "react";
import CompanyInputForm from "../../micro-components/companies/CompanyInputForm";
import JobInputForm from "../../micro-components/jobs/JobInputForm";
import PostInputForm from "../../micro-components/posts/PostInputForm";
import closePopupIcon from "../../resources/close.png";
import CreateCompanyService from "../../services/CreateCompanyService";
import CreateJobService from "../../services/CreateJobService";
import CreatePostService from "../../services/CreatePostsService";
import Company from "../../shared/models/Company";
import Job from "../../shared/models/Job";
import Post from "../../shared/models/Post";

interface IProps {
  togglePostsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  createPostService: typeof CreatePostService;
  createCompanyService: typeof CreateCompanyService;
  createJobService: typeof CreateJobService;
  token: string;
}

const PostPopup: React.FunctionComponent<IProps> = (props: IProps) => {
  // PostInputForm state
  const [postNotes, setPostNotes] = useState<string>("");
  const handlePostSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      // First create the post
      const postService: CreatePostService = new props.createPostService(
        new Post(postNotes),
        props.token
      );
      const postResponse: Post = await postService.createPostRequest();

      // Then create the company, using portion of post data from before
      const companyService: CreateCompanyService =
        new props.createCompanyService(props.token, postResponse.post_id);
      const companyResponse: Company =
        await companyService.requestCompanyCreation(
          new Company(
            companyName,
            postResponse,
            -1,
            companyWebsite,
            companyInformation
          )
        );

      // Then create the job, using portion of post data from before
      const jobService: CreateJobService = new props.createJobService(
        props.token,
        new Job(
          postResponse,
          jobTitle,
          -1,
          jobInformation,
          jobLocation,
          jobType,
          jobStatus,
          jobApplicationDate,
          jobDismissedDate
        )
      );

      const jobResponse: Job = await jobService.requestCreateJob(
        postResponse.post_id
      );
      // Cleanup
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

      // Add popup that this worked!
    } catch (error) {
      console.log(error);
    }
  };
  // CompanyInputForm state
  const [companyName, setCompanyName] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [companyInformation, setCompanyInformation] = useState<string>("");
  const handleCompanySubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // JobInputform state
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [jobApplicationDate, setJobApplicationDate] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<string>("");
  const [jobDismissedDate, setJobDismissedDate] = useState<string>("");
  const [jobInformation, setJobInformation] = useState<string>("");
  const handleJobSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Job submitted!");
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
        />
      </div>
      <JobInputForm
        handleJobSubmission={handleJobSubmission}
        jobTitle={jobTitle}
        jobType={jobType}
        jobLocation={jobLocation}
        jobApplicationDate={jobApplicationDate}
        jobStatus={jobStatus}
        jobDismissedDate={jobDismissedDate}
        jobInformation={jobInformation}
        setJobTitle={setJobTitle}
        setJobType={setJobType}
        setJobLocation={setJobLocation}
        setJobApplicationDate={setJobApplicationDate}
        setJobStatus={setJobStatus}
        setJobDismissedDate={setJobDismissedDate}
        setJobInformation={setJobInformation}
      />
      <CompanyInputForm
        handleCompanySubmission={handleCompanySubmission}
        companyName={companyName}
        companyWebsite={companyWebsite}
        companyInformation={companyInformation}
        setCompanyName={setCompanyName}
        setCompanyWebsite={setCompanyWebsite}
        setCompanyInformation={setCompanyInformation}
      />
      <PostInputForm
        handlePostSubmission={handlePostSubmission}
        postNotes={postNotes}
        setPostNotes={setPostNotes}
      />
    </div>
  );
};

export default PostPopup;
