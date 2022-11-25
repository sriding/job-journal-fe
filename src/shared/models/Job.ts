import Post from "./Post";

class Job {
  private _job_id: number;
  private _post: Post;
  private _job_title: string;
  private _job_information: string;
  private _job_location: string;
  private _job_type: string | null;
  private _job_status: string | null;
  private _job_application_submitted_date: string | null;
  private _job_application_dismissed_date: string | null;

  constructor(
    _post: Post,
    _job_title: string,
    _job_id?: number,
    _job_information?: string,
    _job_location?: string,
    _job_type?: string | null,
    _job_status?: string | null,
    _job_application_submitted_date?: string | null,
    _job_application_dismissed_date?: string | null
  ) {
    this._post = _post;
    this._job_title = _job_title;
    this._job_id = _job_id ?? -1;
    this._job_information = _job_information ?? "";
    this._job_location = _job_location ?? "";
    this._job_type = _job_type ?? null;
    this._job_status = _job_status ?? null;
    this._job_application_submitted_date =
      _job_application_submitted_date ?? null;
    this._job_application_dismissed_date =
      _job_application_dismissed_date ?? null;
  }

  public get job_id(): number {
    return this._job_id;
  }
  public set job_id(value: number) {
    this._job_id = value;
  }

  public get post(): Post {
    return this._post;
  }
  public set post(value: Post) {
    this._post = value;
  }

  public get job_title(): string {
    return this._job_title;
  }
  public set job_title(value: string) {
    this._job_title = value;
  }

  public get job_information(): string {
    return this._job_information;
  }
  public set job_information(value: string) {
    this._job_information = value;
  }

  public get job_location(): string {
    return this._job_location;
  }
  public set job_location(value: string) {
    this._job_location = value;
  }

  public get job_type(): string | null {
    return this._job_type;
  }
  public set job_type(value: string | null) {
    this._job_type = value;
  }

  public get job_status(): string | null {
    return this._job_status;
  }
  public set job_status(value: string | null) {
    this._job_status = value;
  }

  public get job_application_submitted_date(): string | null {
    return this._job_application_submitted_date;
  }
  public set job_application_submitted_date(value: string | null) {
    this._job_application_submitted_date = value;
  }

  public get job_application_dismissed_date(): string | null {
    return this._job_application_dismissed_date;
  }
  public set job_application_dismissed_date(value: string | null) {
    this._job_application_dismissed_date = value;
  }

  public toKeyValuePairs(): { [key: string]: any } {
    let object: { [key: string]: any } = {};
    object["_job_id"] = this.job_id;
    object["_post"] = this.post;
    object["_job_title"] = this.job_title;
    object["_job_information"] = this.job_information;
    object["_job_location"] = this.job_location;
    object["_job_type"] = this.job_type;
    object["_job_status"] = this.job_status;
    object["_job_application_submitted_date"] =
      this.job_application_submitted_date;
    object["_job_application_dismissed_date"] =
      this.job_application_dismissed_date;

    return object;
  }
}

export default Job;
