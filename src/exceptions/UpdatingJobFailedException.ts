class UpdatingJobFailedException extends Error {
  constructor(message: string = "Failed to update the job. Try again.") {
    super(message);

    Object.setPrototypeOf(this, UpdatingJobFailedException.prototype);
  }

  public getErrorMessage() {
    return this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default UpdatingJobFailedException;
