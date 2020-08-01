import React, { useContext, Fragment, useEffect } from "react";
import Axios from "axios";
import { ProfileContext } from "../contexts/Profile";
import Chart from "./Chart";
export default function RenderCharts() {
  const {
    currentCharacter,
    membershipType,
    membershipId,
    setCurrentCharacterData,
    currentCharacterData,
  } = useContext(ProfileContext);
  useEffect(() => {
    Axios.post("/profile/character", {
      membershipType,
      membershipId,
      characterId: currentCharacter,
      mode: "70",
    }).then((res) => {
      setCurrentCharacterData(orderData(res.data));
      //console.log(res.data);
    });
  }, [currentCharacter]);
  const orderData = (data) => {
    let orderedData = [
      { name: "Score per Kill", values: [] },
      { name: "Score per Life", values: [] },
      { name: "Efficiency", values: [] },
      { name: "Kills", values: [] },
      { name: "Kills + Assists / Deaths", values: [] },
      { name: "Kills / Deaths", values: [] },
      { name: "Opponents defeated", values: [] },
    ];
    data.forEach((match) => {
      orderedData[0].values.push(match.averageScorePerKill.basic.value);
      orderedData[1].values.push(match.averageScorePerLife.basic.value);
      orderedData[2].values.push(match.efficiency.basic.value);
      orderedData[3].values.push(match.kills.basic.value);
      orderedData[4].values.push(match.killsDeathsAssists.basic.value);
      orderedData[5].values.push(match.killsDeathsRatio.basic.value);
      orderedData[6].values.push(match.opponentsDefeated.basic.value);
    });
    return orderedData;
  };
  const matchData = currentCharacterData[0]
    ? currentCharacterData.map((stat, index) => (
        <div className="content-container-chart" key={index}>
          <Chart stat={stat} />
        </div>
      ))
    : null;
  return <Fragment>{matchData}</Fragment>;
}
