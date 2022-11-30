class UserProfileSettingNotCreatedException extends Error {
  constructor(
    message: string = "User, profile, and setting joint creation failed. Try again."
  ) {
    super(message);

    Object.setPrototypeOf(
      this,
      UserProfileSettingNotCreatedException.prototype
    );
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default UserProfileSettingNotCreatedException;
