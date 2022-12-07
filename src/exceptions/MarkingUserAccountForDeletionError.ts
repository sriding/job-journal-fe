class MarkingUserAccountForDeletionError extends Error {
  constructor(message: string = "Could not mark account for deletion.") {
    super(message);

    Object.setPrototypeOf(this, MarkingUserAccountForDeletionError.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString() {
    return this.getErrorMessage();
  }
}

export default MarkingUserAccountForDeletionError;
