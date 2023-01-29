import CreateUserWithProfileWithSetting from "../../../../src/services/CreateUserWithProfileWithSetting";

const timeToWait = (milliseconds: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

beforeEach(async () => {
  await timeToWait(2000);
});

describe("Testing 'create user with profile with setting service' functionality", () => {
  try {
    const instance: CreateUserWithProfileWithSetting =
      new CreateUserWithProfileWithSetting(Cypress.env("token").slice(7));
    it("Testing user creation behavior when user already exists", async () => {
      const response = await instance.requestCreation(
        "http://localhost:8080/api/users/create/newuser/with/profile/with/setting/by/token"
      );
      //check profile details
      expect(response.profile.profile_id).to.equal(
        1,
        "Profile ID is incorrect."
      );
      expect(response.profile.profile_name).to.equal(
        "Stephen Riding",
        "Profile name is incorrect."
      );
      expect(response.profile.user).to.deep.equal(
        response.user,
        "User data stored in profile does not match correct user data."
      );
      //check setting details
      expect(response.setting.setting_id).to.equal(
        1,
        "Setting ID is incorrect."
      );
      expect(response.setting.user).to.deep.equal(
        response.user,
        "User data stored in setting does not match correct user data."
      );
      //check user details
      expect(response.user.user_id).to.equal(1, "User ID is incorrect.");
      expect(response.user.auth0_id).to.equal(
        "google-oauth2|110428753866664923333",
        "Auth0 ID is incorrect."
      );
      expect(response.user.deactivate).to.equal(
        false,
        "Deactivate status is not correct."
      );
    });
  } catch (error: any) {
    console.log(error.toString());
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
