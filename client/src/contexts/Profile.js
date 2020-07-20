import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export default function ProfileContextProvider(props) {
  const [name, setName] = useState("");
  const [membershipType, setMembershipType] = useState(2);
  const [membershipId, setMembershipId] = useState("");
  const [characterInfo, setCharacterInfo] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState("");
  const [currentCharacterData, setCurrentCharacterData] = useState([]);

  return (
    <ProfileContext.Provider
      value={{
        name,
        setName: (name) => {
          setName(name);
        },
        membershipType,
        setMembershipType: (membershipType) => {
          setMembershipType(membershipType);
        },
        membershipId,
        setMembershipId: (membershipId) => {
          setMembershipId(membershipId);
        },
        characterInfo,
        setCharacterInfo: (characterInfo) => {
          setCharacterInfo(characterInfo);
        },
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
    </ProfileContext.Provider>
  );
}
