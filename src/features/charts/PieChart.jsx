import React, { useState } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { scaleOrdinal } from 'victory-vendor/d3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import changeNumberOfData from './utils';

const colors = scaleOrdinal(schemeCategory10).range();

const data01 = [
  { name: 'Group A', value: 400, v: 89 },
  { name: 'Group B', value: 300, v: 100 },
  { name: 'Group C', value: 200, v: 200 },
  { name: 'Group D', value: 200, v: 20 },
  { name: 'Group E', value: 278, v: 40 },
  { name: 'Group F', value: 189, v: 60 },
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 0 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];

const data03 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
  { name: 'E1', value: 200 },
  { name: 'E2', value: 34 },
  { name: 'E3', value: 44 },
  { name: 'F1', value: 89 },
  { name: 'F2', value: 49 },
  { name: 'F3', value: 51 },
];

const initialState = { data01, data02, data03 };

export default function DemoPieChart() {
  const [state, setState] = useState(initialState);
  const [animation, setAnimation] = useState(false);

  const handleChangeData = () => {
    // create a new randomized dataset based on initialState (pure function)
    const newState = changeNumberOfData(initialState);
    setState(newState);
  };

  const handleToggleAnimation = () => {
    setAnimation((prev) => !prev);
  };

  const { data02: currentData02 } = state;

  return (
    <div className="pie-chart-wrapper" style={{ width: '100%', height: '100%' }}>
      <div className="pie-chart-controls" style={{ marginBottom: 12 }}>
        <button
          type="button"
          onClick={handleChangeData}
          className="control-button"
          aria-label="Change chart data"
        >
          Change Data
        </button>
        <button
          type="button"
          onClick={handleToggleAnimation}
          className="control-button"
          aria-pressed={animation}
          aria-label="Toggle animation"
        >
          {animation ? 'Disable Animation' : 'Enable Animation'}
        </button>
      </div>

      <ResponsiveContainer>
        <PieChart>
          <Legend />
          <Pie
            data={currentData02}
            dataKey="value"
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            outerRadius={80}
            label
            isAnimationActive={animation}
          >
            {currentData02.map((entry) => (
              // use a stable key (name) instead of index
              <Cell key={entry.name} fill={colors[Math.abs(entry.name.length) % colors.length]} />
            ))}
            <LabelList position="outside" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
