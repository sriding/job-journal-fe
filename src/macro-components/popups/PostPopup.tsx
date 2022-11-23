import { useState } from "react";
import CompanyInputForm from "../../micro-components/companies/CompanyInputForm";
import JobInputForm from "../../micro-components/jobs/JobInputForm";
import PostInputForm from "../../micro-components/posts/PostInputForm";

const PostPopup = () => {
  // PostInputForm state
  const [postNotes, setPostNotes] = useState<string>("");
  const handlePostSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Post submitted!");
  };
  // CompanyInputForm state
  const [companyName, setCompanyName] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [companyInformation, setCompanyInformation] = useState<string>("");
  const handleCompanySubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Company submitted!");
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

  return (
    <div className="PostPopup">
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
