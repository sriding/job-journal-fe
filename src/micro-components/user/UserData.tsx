import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserData = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
          scope: `${process.env.REACT_APP_AUTH0_SCOPE}`,
        });

        if (user) {
          const userDetailsByIdUrl = `http://localhost:8080/api/users/get/token/by/token`;
          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          //console.log(data);
          const { user_metadata } = await metadataResponse.json();

          setUserMetadata(user_metadata);
        } else {
          throw new Error("Auth0 returned an undefined User.");
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log("Error: " + e.message);
        }
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isAuthenticated && user) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default UserData;
