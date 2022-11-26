class CreateUserWithProfileWithSetting {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public async requestCreation(url: string) {
    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const response = await request.json();

      return response;
    } catch (error) {
      throw error;
    }
  }

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }
}

export default CreateUserWithProfileWithSetting;
