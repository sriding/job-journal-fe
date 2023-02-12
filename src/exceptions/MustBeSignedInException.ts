class MustBeSignedInException extends Error {
  constructor(
    message: string = "Please create and/or sign in to an account before making a request."
  ) {
    super(message);

    Object.setPrototypeOf(this, MustBeSignedInException.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString() {
    return this.getErrorMessage();
  }
}

export default MustBeSignedInException;
