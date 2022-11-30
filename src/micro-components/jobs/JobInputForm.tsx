import React from "react";

interface IProps {
  handleJobSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
  jobTitle: string;
  jobType: string;
  jobLocation: string;
  jobApplicationDate: string | null;
  jobStatus: string;
  jobDismissedDate: string | null;
  jobInformation: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  setJobLocation: React.Dispatch<React.SetStateAction<string>>;
  setJobApplicationDate: React.Dispatch<React.SetStateAction<string>>;
  setJobStatus: React.Dispatch<React.SetStateAction<string>>;
  setJobDismissedDate: React.Dispatch<React.SetStateAction<string>>;
  setJobInformation: React.Dispatch<React.SetStateAction<string>>;
  postState: string;
}
const JobInputForm = (props: IProps) => {
  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setJobTitle(event.target.value);
  };
  const handleTypeInputChange = (event: any) => {
    props.setJobType(event.target.value);
  };
  const handleLocationInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setJobLocation(event.target.value);
  };
  const handleApplicationDateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setJobApplicationDate(event.target.value);
  };
  const handleStatusInputChange = (event: any) => {
    props.setJobStatus(event.target.value);
  };
  const handleDismissedDateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setJobDismissedDate(event.target.value);
  };
  const handleJobInformationInputChange = (event: any) => {
    props.setJobInformation(event.target.value);
  };

  const jobTypeOptions = [
    "INTERN",
    "ENTRY",
    "ASSOCIATE",
    "JUNIOR",
    "MID",
    "SENIOR",
    "STAFF",
    "PRINCIPLE",
  ];

  const jobStatusOptions = [
    "SAVED",
    "APPLIED",
    "INTERVIEWING",
    "ACCEPTED",
    "DECLINED",
    "UNRESPONSIVE",
  ];

  return (
    <form
      onSubmit={props.handleJobSubmission}
      className="PostPopup-INPUT-FORMS"
    >
      <label>
        Job Title:
        <input
          type="text"
          value={props.jobTitle}
          onChange={handleTitleInputChange}
        />
      </label>
      <label>
        Job Type:
        <select onChange={handleTypeInputChange} defaultValue={props.jobType}>
          <option value=""></option>
          {jobTypeOptions.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </label>
      <label>
        Job Location:
        <input
          type="text"
          value={props.jobLocation}
          onChange={handleLocationInputChange}
        />
      </label>
      <label>
        Job Application Date:
        <input
          type="date"
          value={props.jobApplicationDate ?? ""}
          onChange={handleApplicationDateInputChange}
        />
      </label>
      <label>
        Job Status:
        <select
          onChange={handleStatusInputChange}
          defaultValue={props.jobStatus}
        >
          <option value=""></option>
          {jobStatusOptions.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </label>
      <label>
        Job Dismissed Date:
        <input
          type="date"
          value={props.jobDismissedDate ?? ""}
          onChange={handleDismissedDateInputChange}
        />
      </label>
      <label>
        Job Information:
        <textarea
          value={props.jobInformation}
          onChange={handleJobInformationInputChange}
        />
      </label>
      {props.postState === "update" ? (
        <input
          type="submit"
          value="Update"
          className="PostPopup-Submit-Button"
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </form>
  );
};

export default JobInputForm;
