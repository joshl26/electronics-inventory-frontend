import React, { Component } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { scaleOrdinal } from "victory-vendor/d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import * as _ from "lodash";
import { changeNumberOfData } from "./utils";

const colors = scaleOrdinal(schemeCategory10).range();

const data01 = [
  { name: "Group A", value: 400, v: 89 },
  { name: "Group B", value: 300, v: 100 },
  { name: "Group C", value: 200, v: 200 },
  { name: "Group D", value: 200, v: 20 },
  { name: "Group E", value: 278, v: 40 },
  { name: "Group F", value: 189, v: 60 },
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 0 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];

const data03 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
  { name: "E1", value: 200 },
  { name: "E2", value: 34 },
  { name: "E3", value: 44 },
  { name: "F1", value: 89 },
  { name: "F2", value: 49 },
  { name: "F3", value: 51 },
];

const initialState = { data01, data02, data03 };

export default class Demo extends Component {
  static displayName = "PieChartDemo";

  onPieEnter = (data, index, e) => {
    this.setState({
      activeIndex: index,
    });
  };

  state = {
    ...initialState,
    activeIndex: 0,
    animation: false,
  };

  handleChangeData = () => {
    this.setState(() => _.mapValues(initialState, changeNumberOfData));
  };

  handleChangeAnimation = () => {
    this.setState({
      animation: !this.state.animation,
    });
  };

  handlePieChartEnter = (a, b, c) => {
    console.log(a, b, c);
  };

  handleLeave = () => this.setState({ activeIndex: -1 });

  render() {
    const {
      // data01,

      data02,

      // data03
    } = this.state;

    return (
      <div
        className="pie-chart-wrapper"
        style={{ width: "100%", height: "100%" }}
      >
        <ResponsiveContainer>
          <PieChart style={{ width: "100%", height: "100%" }}>
            <Legend />
            <Pie
              data={data02}
              dataKey="value"
              cx={200}
              cy={200}
              startAngle={180}
              endAngle={0}
              outerRadius={80}
              label
            >
              {data02.map((entry, index) => (
                <Cell key={`slice-${index}`} fill={colors[index % 10]} />
              ))}
              <LabelList position="outside" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
