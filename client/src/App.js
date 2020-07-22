import React, { useContext } from "react";
import "./App.scss";
import Search from "./components/Search";
import Characters from "./components/Characters";
import RenderCharts from "./components/RenderCharts";
import { ProfileContext } from "./contexts/Profile";

function App() {
  const { characterInfo, currentCharacter } = useContext(ProfileContext);
  return (
    <div className="App">
      <Search />
      <div className="content-container">
        {characterInfo ? <Characters /> : null}
        {currentCharacter ? <RenderCharts /> : null}
      </div>
    </div>
  );
}

export default App;
