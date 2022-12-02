class MustBeSignedInException extends Error {
  constructor(message: string) {
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
