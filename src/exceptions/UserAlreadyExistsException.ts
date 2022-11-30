class UserAlreadyExistsException extends Error {
  constructor(
    message: string = "User already exists in the system. The majority of the time, this is a default response."
  ) {
    super(message);

    Object.setPrototypeOf(this, UserAlreadyExistsException.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default UserAlreadyExistsException;
