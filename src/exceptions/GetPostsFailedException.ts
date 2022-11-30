class GetPostsFailedException extends Error {
  constructor(
    message: string = "Failed to retrieve batch of posts for the user. Try again."
  ) {
    super(message);

    Object.setPrototypeOf(this, GetPostsFailedException.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default GetPostsFailedException;
