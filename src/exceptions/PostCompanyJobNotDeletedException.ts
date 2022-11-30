class PostCompanyJobNotDeletedException extends Error {
  constructor(
    message: string = "Post, company, and job joint deletion failed. Try again."
  ) {
    super(message);

    Object.setPrototypeOf(this, PostCompanyJobNotDeletedException.prototype);
  }

  public getErrorMessage() {
    return this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default PostCompanyJobNotDeletedException;
