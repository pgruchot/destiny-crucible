import React, { Fragment } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Charts(props) {
  //console.log(props);
  const ComposeData = (data) => {
    console.log(data);
    return data.values.map((value, index) => {
      return {
        x: index + 1,
        y: value,
      };
    });
  };

  const CustomTooltip = ({ payload, label, active }) => {
    if (active) {
      return <p className="label">{`Score : ${payload[0].value}`}</p>;
    }

    return null;
  };

  const renderLineChart = (
    <LineChart
      className="chart-content"
      width={600}
      height={300}
      data={ComposeData(props.stat)}
    >
      <Line type="monotone" dataKey="y" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="x" />
      <Tooltip
        wrapperStyle={{ width: "auto", backgroundColor: "#fff" }}
        content={<CustomTooltip />}
      />
      <YAxis />
    </LineChart>
  );
  return (
    <Fragment>
      <h2 className="chart-title">{props.stat.name}</h2>
      {renderLineChart}
    </Fragment>
  );
}
