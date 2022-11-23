import React from "react";

interface IProps {
  handleJobSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
  jobTitle: string;
  jobType: string;
  jobLocation: string;
  jobApplicationDate: string;
  jobStatus: string;
  jobDismissedDate: string;
  jobInformation: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  setJobLocation: React.Dispatch<React.SetStateAction<string>>;
  setJobApplicationDate: React.Dispatch<React.SetStateAction<string>>;
  setJobStatus: React.Dispatch<React.SetStateAction<string>>;
  setJobDismissedDate: React.Dispatch<React.SetStateAction<string>>;
  setJobInformation: React.Dispatch<React.SetStateAction<string>>;
}
const JobInputForm = (props: IProps) => {
  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setJobTitle(event.target.value);
  };
  const handleTypeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
  const handleStatusInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setJobStatus(event.target.value);
  };
  const handleDismissedDateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setJobDismissedDate(event.target.value);
  };
  const handleJobInformationInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setJobInformation(event.target.value);
  };

  return (
    <form onSubmit={props.handleJobSubmission}>
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
        <input
          type="text"
          value={props.jobType}
          onChange={handleTypeInputChange}
        />
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
          type="text"
          value={props.jobApplicationDate}
          onChange={handleApplicationDateInputChange}
        />
      </label>
      <label>
        Job Status:
        <input
          type="text"
          value={props.jobStatus}
          onChange={handleStatusInputChange}
        />
      </label>
      <label>
        Job Dismissed Date:
        <input
          type="text"
          value={props.jobDismissedDate}
          onChange={handleDismissedDateInputChange}
        />
      </label>
      <label>
        Job Information:
        <input
          type="text"
          value={props.jobInformation}
          onChange={handleJobInformationInputChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default JobInputForm;
