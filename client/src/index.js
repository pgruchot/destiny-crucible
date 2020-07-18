import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProfileContextProvider from "./contexts/Profile";
ReactDOM.render(
  <React.StrictMode>
    <ProfileContextProvider>
      <App />
    </ProfileContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
