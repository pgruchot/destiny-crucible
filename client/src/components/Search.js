import React, { useContext, useState } from "react";
import Axios from "axios";
import { ProfileContext } from "../contexts/Profile";

export default function Search() {
  const [localName, setLocalName] = useState("");
  const [localMembershipType, setLocalMembershipType] = useState("2");
  const [error, setError] = useState(null);
  const {
    setName,
    setMembershipType,
    setMembershipId,
    setCharacterInfo,
  } = useContext(ProfileContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/profile", {
      membershipType: localMembershipType,
      name: localName,
    }).then((res) => {
      if (!res.data.Error) {
        console.log(res);
        setName(res.data.name);
        setMembershipType(res.data.membershipType);
        setMembershipId(res.data.membershipId);
        setCharacterInfo(res.data.characterInfo);
      } else setError(res.data.Error);
    });
  };

  return (
    <div className="search-container">
      <div className="search-container-cover">
        <h2 className="search-container-title">destiny_charts</h2>
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
          <input type="text" onChange={(e) => setLocalName(e.target.value)} />
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
