import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DemoComponent from './demoComponent';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

function Cards2() {
  const [isLargeLayout, setIsLargeLayout] = useState(true);

  const layout = [
    { i: 'a', x: 0, y: 0, w: 4, h: 1 },
    { i: 'b', x: 4, y: 0, w: 4, h: 1 },
    { i: 'c', x: 8, y: 0, w: 4, h: 1 },
    { i: 'd', x: 0, y: 1, w: 4, h: 1 },
    { i: 'e', x: 4, y: 1, w: 4, h: 1 },
    { i: 'f', x: 8, y: 1, w: 4, h: 1 },
  ];

  const layout1 = [
    { i: 'a', x: 0, y: 0, w: 6, h: 1 },
    { i: 'b', x: 6, y: 0, w: 6, h: 1 },
    { i: 'c', x: 0, y: 1, w: 6, h: 1 },
    { i: 'd', x: 6, y: 1, w: 6, h: 1 },
    { i: 'e', x: 0, y: 2, w: 6, h: 1 },
    { i: 'f', x: 6, y: 2, w: 6, h: 1 },
  ];

  const layouts = {
    lg: isLargeLayout ? layout : layout1,
  };

  const toggleLayout = () => {
    setIsLargeLayout((prev) => !prev);
  };

  return (
    <div>
      <button type="button" onClick={toggleLayout} style={{ margin: '10px' }}>
        Toggle Layout
      </button>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={281}
        width={1200}
      >
        <div key="a" style={{ backgroundColor: '#E76F51' }}>
          <DemoComponent />
        </div>
        <div key="b" style={{ backgroundColor: '#2A9D8F' }}>
          <DemoComponent />
        </div>
        <div key="c" style={{ backgroundColor: '#E9C46A' }}>
          <DemoComponent />
        </div>
        <div key="d" style={{ backgroundColor: '#F4A261' }}>
          <DemoComponent />
        </div>
        <div key="e" style={{ backgroundColor: '#E76F51' }}>
          <DemoComponent />
        </div>
        <div key="f" style={{ backgroundColor: 'lemonchiffon' }}>
          <DemoComponent />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default Cards2;
