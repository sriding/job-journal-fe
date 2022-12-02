class FillInMissingDetailsException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, FillInMissingDetailsException.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default FillInMissingDetailsException;
