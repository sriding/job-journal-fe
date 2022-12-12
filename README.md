# Requirements

**Using this application requires the creation of a .env file in the top directory**. This .env file must contain the following key value pairs (more information below):

```
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENTID=
REACT_APP_AUTH0_AUDIENCE=
REACT_APP_AUTH0_SCOPE="read:current_user"
REACT_APP_AUTH0_USERINFO_ENDPOINT="https://REACT_APP_AUTH0_DOMAIN/userinfo"
REACT_APP_AUTH0_USER_ENDPOINT="https://REACT_APP_AUTH0_DOMAIN/api/v2/users/"
REACT_APP_CREATE_USER_WITH_PROFILE_WITH_SETTING="http://localhost:8080/api/users/create/newuser/with/profile/with/setting/by/token"
REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL="http://localhost:8080/api/post/get/posts/with/company/and/job/by/token"
REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL_WITH_STANDARD="http://localhost:8080/api/post/get/posts/with/company/and/job/by/token/"
REACT_APP_GET_POSTS_WITH_COMPANIES_AND_JOBS_URL_WITH_STANDARD_AND_FILTER="http://localhost:8080/api/post/get/posts/with/company/and/job/filtered/by/token/"
REACT_APP_CREATE_POSTS_WITH_COMPANIES_AND_JOBS_URL="http://localhost:8080/api/post/create/post/with/company/with/job/by/token"
REACT_APP_UPDATE_JOB_URL="http://localhost:8080/api/job/update/job/by/"
REACT_APP_UPDATE_COMPANY_URL="http://localhost:8080/api/company/update/company/by/"
REACT_APP_UPDATE_POST_URL="http://localhost:8080/api/post/update/post/by/"
REACT_APP_DELETE_POST_WITH_COMPANY_WITH_JOB="http://localhost:8080/api/post/delete/post/by/"
REACT_APP_MARK_USER_FOR_DELETION_URL="http://localhost:8080/api/users/update/user/mark/for/deletion"
```

The first six keys in the .env file require you to set up an account with Auth0 (by Okta). Auth0 is the authentication system that is used in this application. You will have to create an Auth0 account, log in, and then create a Single Page Application. This Single Page Application will provide the values for the first two keys in the .env file. In addition, in the Single Page Application section on the website, you will need to add the URL of where the application is hosted to the following sections: "Allowed Callback URLs", "Allowed Logout URLs", and "Allowed Web Origins". After doing that, you can then move on and get the required audience by looking at the Auth0 Management API found in the APIs section on Auth0. The scope you can leave as is. For the userinfo and user endpoint, replace the REACT_APP_AUTH0_DOMAIN part of the url with the value you have for the REACT_APP_AUTH0_DOMAIN key.

**This repository is only the front-end for the job journal web application.** It interacts with a REST API to manage job applications. The rest of the .env key-value pairs are specific to that API. The only thing you must change in each of them is the localhost:8080 part. Either change it to the domain where the API is hosted or change the port portion of localhost: to the port you are using (unless 8080 is already being used).

The application can be started with: npm run start

The application can be built with: npm run build

Check package.json for additional scripts.
