import React, { useContext } from "react";
import "./App.css";

import Search from "./components/Search";
import { ProfileContext } from "./contexts/Profile";
import Characters from "./components/Characters";
function App() {
  const { characterInfo } = useContext(ProfileContext);

  const renderCharacters = characterInfo ? <Characters /> : null;
  return (
    <div className="App">
      <Search />
      <div className="content-container">{renderCharacters}</div>
    </div>
  );
}

export default App;
