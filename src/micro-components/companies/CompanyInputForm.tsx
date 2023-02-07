import React from "react";

interface IProps {
  handleCompanySubmission: (event: React.FormEvent<HTMLFormElement>) => void;
  companyName: string;
  companyWebsite: string;
  companyInformation: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  setCompanyWebsite: React.Dispatch<React.SetStateAction<string>>;
  setCompanyInformation: React.Dispatch<React.SetStateAction<string>>;
  postState: string;
}

const CompanyInputForm = (props: IProps) => {
  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setCompanyName(event.target.value);
  };

  const handleWebsiteInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setCompanyWebsite(event.target.value);
  };

  const handleCompanyInformationInputChange = (event: any) => {
    props.setCompanyInformation(event.target.value);
  };

  return (
    <form
      onSubmit={props.handleCompanySubmission}
      className="PostPopup-INPUT-FORMS"
    >
      <label>
        Company name:
        <input
          type="text"
          placeholder="Required"
          value={props.companyName}
          onChange={handleNameInputChange}
          required
        />
      </label>
      <label>
        Company website:
        <input
          type="text"
          placeholder="www.youtube.com"
          value={props.companyWebsite}
          onChange={handleWebsiteInputChange}
        />
      </label>
      <label>
        Company information:
        <textarea
          className="GLOBAL-TEXTAREA-DIMENSIONS"
          placeholder="Company xyzea is searching for a Junior Data Analyst to join our Fortune 50 Health Insurance partner to assist with a variety of tasks 
          within their VBC platform (Value-Based Care), as well as workstreams supporting their EDW (Enterprise Data Warehouse)."
          value={props.companyInformation}
          onChange={handleCompanyInformationInputChange}
        />
      </label>
      {props.postState === "update" ? (
        <input
          type="submit"
          value="Update Company"
          className="PostPopup-Submit-Button"
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </form>
  );
};

export default CompanyInputForm;
