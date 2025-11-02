import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import PieChart from '../charts/PieChart';
import BarChart1 from '../charts/BarChart1';
import AreaChart1 from '../charts/AreaChart1';

import './ReactGridLayout.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function ReactGridLayout() {
  const [layouts, setLayouts] = useState(null);
  const [widgetArray, setWidgetArray] = useState([
    { i: 'widget1', x: 0, y: 0, w: 2, h: 2, c: '#264653' },
    { i: 'widget2', x: 2, y: 0, w: 2, h: 2, c: '#2A9D8F' },
    { i: 'widget3', x: 4, y: 0, w: 2, h: 2, c: '#E9C46A' },
    { i: 'widget4', x: 6, y: 0, w: 2, h: 2, c: '#2A9D8F' },
    { i: 'widget5', x: 0, y: 0, w: 2, h: 2, c: '#F4A261' },
    { i: 'widget6', x: 2, y: 2, w: 2, h: 2, c: '#E76F51' },
  ]);

  // layout = current layout array; allLayouts = object keyed by breakpoint (if you need it)
  const handleModify = (
    layout /* current layout array */

    // allLayouts
  ) => {
    // store the layout (or allLayouts depending on your need)
    setLayouts(layout);

    // build a new widgetArray (do not mutate previous state)
    const newWidgetArray = widgetArray.map((w) => {
      const match = layout.find((pos) => String(pos.i) === String(w.i));
      if (match) {
        return {
          ...w,
          x: match.x,
          y: match.y,
          w: match.w,
          h: match.h,
        };
      }
      return w;
    });

    setWidgetArray(newWidgetArray);
  };

  const handleDelete = (key) => {
    setWidgetArray((prev) => prev.filter((data) => data.i !== key));
  };

  return (
    <div>
      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        verticalCompact
        layout={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
        autoSize
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetArray?.map((widget) => (
          <div
            className="reactGridItem"
            style={{ backgroundColor: widget.c }}
            key={widget.i}
            data-grid={{
              x: widget.x,
              y: widget.y,
              w: widget.w,
              h: widget.h,
              i: widget.i,
              minW: 2,
              maxW: Infinity,
              minH: 2,
              maxH: Infinity,
              isDraggable: true,
              isResizable: true,
            }}
          >
            <button type="button" className="deleteButton" onClick={() => handleDelete(widget.i)}>
              x
            </button>

            {widget.i === 'widget1' ? <PieChart /> : null}
            {widget.i === 'widget2' ? <BarChart1 /> : null}
            {widget.i === 'widget3' ? <AreaChart1 /> : null}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default ReactGridLayout;
