import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export default function ProfileContextProvider(props) {
  const [name, setName] = useState("");
  const [membershipType, setMembershipType] = useState(2);
  const [membershipId, setMembershipId] = useState("");
  const [characterInfo, setCharacterInfo] = useState([]);

  return (
    <ProfileContext.Provider
      value={{
        name,
        setName: (name) => {
          setName(name);
        },
        membershipType,
        setName: (membershipType) => {
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
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
}