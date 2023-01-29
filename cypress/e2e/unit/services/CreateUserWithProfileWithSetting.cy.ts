import CreateUserWithProfileWithSetting from "../../../../src/services/CreateUserWithProfileWithSetting";

const timeToWait = (milliseconds: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

beforeEach(async () => {
  await timeToWait(1500);
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
      expect(response.profile.profile_id).to.equal(1);
      expect(response.profile.profile_name).to.equal("Stephen Riding");
      expect(response.profile.user).to.deep.equal(response.user);
      //check setting details
      expect(response.setting.setting_id).to.equal(1);
      expect(response.setting.user).to.deep.equal(response.user);
      //check user details
      expect(response.user.user_id).to.equal(1);
      expect(response.user.auth0_id).to.equal(
        "google-oauth2|110428753866664923333"
      );
      expect(response.user.deactivate).to.equal(true);
    });
  } catch (error: any) {
    console.log(error.toString());
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
