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

  const handleCompanyInformationInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          value={props.companyName}
          onChange={handleNameInputChange}
        />
      </label>
      <label>
        Company website:
        <input
          type="text"
          value={props.companyWebsite}
          onChange={handleWebsiteInputChange}
        />
      </label>
      <label>
        Company information:
        <input
          type="text"
          value={props.companyInformation}
          onChange={handleCompanyInformationInputChange}
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

export default CompanyInputForm;
