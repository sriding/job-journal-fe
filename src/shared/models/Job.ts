import Post from "./Post";

class Job {
  _job_id: number;
  _post: Post;
  _title: string;
  _information: string;
  _location: string;
  _type: string | null;
  _status: string | null;
  _application_submitted_date: string | null;
  _application_dismissed_date: string | null;

  constructor(
    post: Post,
    title: string,
    job_id?: number,
    information?: string,
    location?: string,
    type?: string | null,
    status?: string | null,
    applicationSubmittedDate?: string | null,
    applicationDismissedDate?: string | null
  ) {
    this._post = post;
    this._title = title;
    this._job_id = job_id ?? -1;
    this._information = information ?? "";
    this._location = location ?? "";
    this._type = type ?? null;
    this._status = status ?? null;
    this._application_submitted_date = applicationSubmittedDate ?? null;
    this._application_dismissed_date = applicationDismissedDate ?? null;
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

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  public get information(): string {
    return this._information;
  }
  public set information(value: string) {
    this._information = value;
  }

  public get location(): string {
    return this._location;
  }
  public set location(value: string) {
    this._location = value;
  }

  public get status(): string | null {
    return this._status;
  }
  public set status(value: string | null) {
    this._status = value;
  }

  public get type(): string | null {
    return this._type;
  }
  public set type(value: string | null) {
    this._type = value;
  }

  public get application_submitted_date(): string | null {
    return this._application_submitted_date;
  }
  public set application_submitted_date(value: string | null) {
    this._application_submitted_date = value;
  }

  public get application_dismissed_date(): string | null {
    return this._application_dismissed_date;
  }
  public set application_dismissed_date(value: string | null) {
    this._application_dismissed_date = value;
  }

  public toKeyValuePairs(): { [key: string]: any } {
    let object: { [key: string]: any } = {};
    object["job_id"] = this.job_id;
    object["post"] = this.post;
    object["title"] = this.title;
    object["information"] = this.information;
    object["location"] = this.location;
    object["type"] = this.type;
    object["status"] = this.status;
    object["application_submitted_date"] = this.application_submitted_date;
    object["application_dismissed_date"] = this.application_dismissed_date;

    return object;
  }
}

export default Job;
