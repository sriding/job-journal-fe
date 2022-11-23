class GetPostsFailedException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, GetPostsFailedException.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }
}

export default GetPostsFailedException;
