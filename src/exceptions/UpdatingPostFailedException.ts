class UpdatingPostFailedException extends Error {
  constructor(message: string = "") {
    super(message);

    Object.setPrototypeOf(this, UpdatingPostFailedException.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default UpdatingPostFailedException;
