import React, { createContext, useState } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [currentCharacter, setCurrentCharacter] = useState("");
  const [currentCharacterData, setCurrentCharacterData] = useState({});

  return (
    <DataContext.Provider
      value={{
        currentCharacter,
        setCurrentCharacter: (currentCharacter) => {
          setCurrentCharacter(currentCharacter);
        },
        currentCharacterData,
        setCurrentCharacterData: (currentCharacterData) => {
          setCurrentCharacterData(currentCharacterData);
        },
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
