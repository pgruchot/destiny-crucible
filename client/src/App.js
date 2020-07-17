import React from "react";
import "./App.css";
import ProfileContextProvider from "./contexts/Profile";
import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <ProfileContextProvider>
        <Search />
      </ProfileContextProvider>
    </div>
  );
}

export default App;
