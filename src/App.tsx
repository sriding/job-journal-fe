import React from "react";
import "./App.css";
import LoginButton from "./components/auth/Login";
import LogoutButton from "./components/auth/Logout";
import UserData from "./components/user/UserData";

function App() {
  return (
    <div className="App">
      <UserData />
      <h1>Hello world!</h1>
      <LoginButton />
      <br />
      <LogoutButton />
    </div>
  );
}

export default App;
