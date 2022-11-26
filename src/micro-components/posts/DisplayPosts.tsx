import DeletePostWithCompanyWithJobService from "../../services/DeletePostWithCompanyWithJobService";
import PostsWithCompaniesAndJobs from "../../shared/interfaces/PostsWithCompaniesAndJobs";

interface IProps {
  posts: Array<PostsWithCompaniesAndJobs>;
  togglePostsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  deletePostWithCompanyWithJobService: typeof DeletePostWithCompanyWithJobService;
  token: string;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
  setPostNotes: React.Dispatch<React.SetStateAction<string>>;
  setCompanyId: React.Dispatch<React.SetStateAction<number>>;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  setCompanyWebsite: React.Dispatch<React.SetStateAction<string>>;
  setCompanyInformation: React.Dispatch<React.SetStateAction<string>>;
  setJobId: React.Dispatch<React.SetStateAction<number>>;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  setJobType: React.Dispatch<React.SetStateAction<string | null>>;
  setJobLocation: React.Dispatch<React.SetStateAction<string>>;
  setJobApplicationDate: React.Dispatch<React.SetStateAction<string | null>>;
  setJobStatus: React.Dispatch<React.SetStateAction<string | null>>;
  setJobDismissedDate: React.Dispatch<React.SetStateAction<string | null>>;
  setJobInformation: React.Dispatch<React.SetStateAction<string>>;
  setPostState: React.Dispatch<React.SetStateAction<string>>;
}

const GetPosts: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div className="DisplayPosts-Container">
      {props.posts.map((p) => {
        return (
          <div key={p.post.post_id}>
            <button
              onClick={async () => {
                try {
                  const deleteService: DeletePostWithCompanyWithJobService =
                    new props.deletePostWithCompanyWithJobService(props.token);

                  const response = await deleteService.requestDeletion(
                    `${process.env.REACT_APP_DELETE_POST_WITH_COMPANY_WITH_JOB}`,
                    p.post.post_id
                  );

                  console.log(response);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              DELETE
            </button>
            <div
              className="DisplayPosts"
              onClick={(event) => {
                // Set all values
                props.setPostState("update");
                props.setPostId(p.post.post_id);
                props.setPostNotes(p.post.post_notes);
                props.setCompanyId(p.company.company_id);
                props.setCompanyName(p.company.company_name);
                props.setCompanyWebsite(p.company.company_website);
                props.setCompanyInformation(p.company.company_information);
                props.setJobId(p.job.job_id);
                props.setJobTitle(p.job.job_title);
                props.setJobType(p.job.job_type);
                props.setJobLocation(p.job.job_location);
                props.setJobApplicationDate(
                  p.job.job_application_submitted_date
                );
                props.setJobStatus(p.job.job_status);
                props.setJobDismissedDate(p.job.job_application_dismissed_date);
                props.setJobInformation(p.job.job_information);

                // Show post popup
                props.togglePostsPopup(true);
              }}
            >
              <h2>{p.job.job_title}</h2>
              <p>
                <b>Company:</b> {p.company.company_name}
              </p>
              <p>
                <b>Website:</b> {p.company.company_website}
              </p>
              <p>
                <b>Status:</b> {p.job.job_status}
              </p>
              <p>
                <b>Job Type:</b> {p.job.job_type}
              </p>
              <p>
                <b>Job Location:</b> {p.job.job_location}
              </p>
              <p>
                <b>Application Date:</b> {p.job.job_application_submitted_date}
              </p>
              <p>
                <b>Rescinded Date:</b> {p.job.job_application_dismissed_date}
              </p>
              <p>
                <b>Job Information:</b> {p.job.job_information}
              </p>
              <p>
                <b>Company Information:</b> {p.company.company_information}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetPosts;
