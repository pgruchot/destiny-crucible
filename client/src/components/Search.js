import React, { useContext, useState } from "react";
import Axios from "axios";
import { ProfileContext } from "../contexts/Profile";
import Logo from "./Logo";
export default function Search() {
  const [localName, setLocalName] = useState("");
  const [localMembershipType, setLocalMembershipType] = useState("2");
  const [error, setError] = useState(null);
  const {
    setName,
    setMembershipType,
    setMembershipId,
    setCharacterInfo,
    resetCharacter,
  } = useContext(ProfileContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/profile", {
      membershipType: localMembershipType,
      name: localName,
    }).then((res) => {
      if (!res.data.Error) {
        console.log(res);
        resetCharacter();
        setName(res.data.name);
        setMembershipType(res.data.membershipType);
        setMembershipId(res.data.membershipId);
        setCharacterInfo(res.data.characterInfo);
        setError(null);
      } else setError(res.data.Error);
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
          <button type="submit">{">"}</button>
        </form>
        {error ? (
          <div className="search-container-error">
            <p>{error}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
