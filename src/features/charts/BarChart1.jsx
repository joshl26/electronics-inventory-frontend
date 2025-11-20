import * as React from "react";
import * as _ from "lodash";
import {
  BarChart,
  Cell,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { changeNumberOfData } from "./utils";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400, time: 1 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210, time: 3 },
  { name: "Page C", uv: 2000, pv: -9800, amt: 2290, time: 9 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000, time: 10 },
  { name: "Page E", uv: 2500, pv: 4800, amt: 2181, time: 12 },
  { name: "Page F", uv: 1220, pv: 3800, amt: 2500, time: 16 },
  { name: "Page G", uv: 2300, pv: 4300, amt: 2100, time: 18 },
  { name: "Page H", time: 24 },
];
const data01 = [
  { day: "05-01", weather: "sunny" },
  { day: "05-02", weather: "sunny" },
  { day: "05-03", weather: "cloudy" },
  { day: "05-04", weather: "rain" },
  { day: "05-05", weather: "rain" },
  { day: "05-06", weather: "cloudy" },
  { day: "05-07", weather: "cloudy" },
  { day: "05-08", weather: "sunny" },
  { day: "05-09", weather: "sunny" },
];

const initialState = { data, data01 };

// eslint-disable-next-line import/no-default-export
export default class BarChart1 extends React.Component {
  state = initialState;

  handleChangeData = () => {
    this.setState(() => _.mapValues(initialState, changeNumberOfData));
  };

  render() {
    return (
      <div
        className="line-chart-wrapper"
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "transparent",
        }}
      >
        <ResponsiveContainer>
          <BarChart width={400} height={400} data={this.state.data}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="a" />
            <YAxis yAxisId="b" orientation="right" />
            <Legend />
            <Tooltip />
            <CartesianGrid vertical={false} />
            <Bar yAxisId="a" dataKey="uv">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Bar>
            <Bar yAxisId="b" dataKey="pv" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
