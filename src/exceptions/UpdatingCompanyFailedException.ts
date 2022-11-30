class UpdatingCompanyFailedException extends Error {
  constructor(message: string = "Failed to update company. Try again.") {
    super(message);

    Object.setPrototypeOf(this, UpdatingCompanyFailedException.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default UpdatingCompanyFailedException;
