class PostCompanyJobNotCreatedException extends Error {
  constructor(
    message: string = "Post, company, and job joint creation failed. Try again."
  ) {
    super(message);

    Object.setPrototypeOf(this, PostCompanyJobNotCreatedException.prototype);
  }

  public getErrorMessage() {
    return "Error occured: " + this.message;
  }

  public toString = (): string => {
    return this.getErrorMessage();
  };
}

export default PostCompanyJobNotCreatedException;
