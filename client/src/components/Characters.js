import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { ProfileContext } from "../contexts/Profile";
export default function Characters() {
  const {
    membershiptype,
    membershipId,
    characterInfo,
    setCurrentCharacter,
  } = useContext(ProfileContext);
  const returnBackgroundImg = (character) => {
    return {
      backgroundImage: `url(https://www.bungie.net${character.emblemBackgroundPath})`,
    };
  };
  const characterList = characterInfo.map((character, index) => (
    <button
      onClick={() => setCurrentCharacter(character.characterId)}
      style={returnBackgroundImg(character)}
      className="content-container-box-character"
      key={index}
    >
      <p>{character.light}</p>
      <p>{character.class}</p>
    </button>
  ));
  return <div className="content-container-box">{characterList}</div>;
}
