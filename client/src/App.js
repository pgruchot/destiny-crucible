import React from "react";
import "./App.css";
import ProfileContextProvider from "./contexts/Profile";

function App() {
  return (
    <div className="App">
      <ProfileContextProvider></ProfileContextProvider>
    </div>
  );
}

export default App;
