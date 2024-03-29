import React, { useContext, useState } from "react";
import Axios from "axios";
import { ProfileContext } from "../contexts/Profile";
import Logo from "./Logo";
export default function Search() {
  const [localName, setLocalName] = useState("");
  const [localMembershipType, setLocalMembershipType] = useState("2");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    setName,
    setMembershipType,
    setMembershipId,
    setCharacterInfo,
    resetCharacter,
    characterInfo,
  } = useContext(ProfileContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    resetCharacter();
    Axios.post("/profile", {
      membershipType: localMembershipType,
      name: localName,
    }).then((res) => {
      if (!res.data.Error) {
        //console.log(res);
        setName(res.data.name);
        setMembershipType(res.data.membershipType);
        setMembershipId(res.data.membershipId);
        setCharacterInfo(res.data.characterInfo);
        setError(null);
        setLoading(false);
      } else {
        setError(res.data.Error);
        setLoading(false);
      }
    });
  };

  return (
    <div className="search-container">
      <div className="search-container-cover">
        <Logo />
        <form onSubmit={handleSubmit} className="search-form">
          <select
            onChange={(e) => setLocalMembershipType(e.target.value)}
            name="membershipType"
            className="search-form-select"
          >
            <option value="1">XBOX</option>
            <option value="2">PS4</option>
            <option value="3">STEAM</option>
          </select>
          <input
            type="text"
            onChange={(e) => setLocalName(e.target.value)}
            placeholder="Type in guardian name..."
          />
          <button className={loading ? "animate-button" : null} type="submit">
            {">"}
          </button>
        </form>
        {error ? (
          <div className="search-container-error">
            <p>{error}</p>
          </div>
        ) : null}
        {characterInfo[0] ? <div className="loaded-indicator"></div> : null}
      </div>
    </div>
  );
}
