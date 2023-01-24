import { Builder, By, WebDriver } from "selenium-webdriver";
import assert from "assert";

let driver: WebDriver;

beforeAll(async () => {
  driver = await new Builder().forBrowser("MicrosoftEdge").build();
  await driver.get("http:localhost:3000");
});

beforeEach(async () => {
  await driver.navigate().refresh();
  await new Promise((resolve) => setTimeout(resolve, 2500));
});

afterAll(async () => {
  await driver.quit();
});

/**Minimum setup requirements for all of these tests:
 * Start react application on localhost:3000
 * Start spring boot application on localhost:8080
 * Local database table appropriately initalized with 1 user and that 1 user has at least 21 posts
 * Must be logged in to that 1 user on the react application
 * **/

describe("These tests do not require the user to be logged in.", () => {
  //Test that confirms Create Post popup displays
  it("Confirm clicking on Create Post button displays appropriate popup", async () => {
    try {
      const createPostButton = driver.findElement(
        By.className("CreatePostButton")
      );
      await createPostButton.click();

      const postPopup = driver.findElement(By.className("PostPopup"));

      assert.ok(postPopup, "Post popup did not appear when it should have.");
    } catch (error) {
      assert.fail(
        "An unexpected error occured causing the test to fail. Error details here: " +
          error
      );
    }
  });

  //Test that confirms Create Post popup disappears
  it("Confirms clicking on close icon in create post popup closes the popup.", async () => {
    try {
      const createPostButton = driver.findElement(
        By.className("CreatePostButton")
      );
      await createPostButton.click();

      const postPopup = driver.findElement(By.className("PostPopup"));

      const closeIcon = driver.findElement(By.css("img"));
      await closeIcon.click();

      // Should cause an error since it is no longer part of the DOM
      await postPopup.isDisplayed();

      assert.fail(
        "StaleElementReferenceError should have been thrown before this was reached."
      );
    } catch (error: any) {
      if (error.name !== "StaleElementReferenceError") {
        assert.fail(
          "An unexpected error occured causing the test to fail. Error details here: " +
            error
        );
      }
    }
  });
});

describe("These tests require a user to be logged in.", () => {
  beforeAll(async () => {
    try {
      const loginButton = driver.findElement(
        By.xpath("//button[text()='Login']")
      );
      await loginButton.click();
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const emailField = driver.findElement(By.name("email"));
      await emailField.sendKeys("stephen.riding.jr@gmail.com");
      const passwordField = driver.findElement(By.name("password"));
      await passwordField.sendKeys("Itriedalright1");
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      assert.fail(
        "An unexpected error occured causing the test to fail. Error details here: " +
          error
      );
    }
  });
});

//Test that confirms clicking on a post displays a Post popup

//Test that confirms closing a Post popup works

//Test that confirms that a delete confirmation popup appears when you attempt to delete a post

//Test that confirms that a delete confirmation popup disappears when clicking no or yes

//Test that confirms deleting a post removes it from the user's feed

//Test that confirms adding a post displays that post on the user's feed

//Test that confirms updating a post shows the updated information on the user's feed

//Test that confirms functionality for searching for posts

//Test that confirms notification popup after creating a post

//Test that confirms notification popup after updating a job, or company, or post

//Test that confirms notification popup after deleting a post

//Test that confirms dropdown options appear for appropriate post textfields

//Test that confirms calendar appears for appropriate post textfields

//Test that confirms text can be entered into the search bar

//Test that confirms information can be entered into every post textfield

//Test that confirms load more will display more posts (if there are actually more posts available)

//Test that confirms correct posts display after resetting post search (by clicking reset button)

//Test that confirms correct posts display after resetting post search (by searching with no text in search field)

//Test that confirms error popup displays when there is an error (can only pick some examples...)

//Test that confirms clicking on username switches user to settings page

//Test that confirms clicking on website title text switches user to home page

//Test that confirms clicking on mark account for deletion button displays popup

//Test that confirms clicking yes or no on deletion confirmation popup for mark account for deletion hides the popup

//Test that confirms clicking yes on deletion confirmation for mark account for deleting displays notiication popup

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
