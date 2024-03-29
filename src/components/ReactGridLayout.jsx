import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import PieChart from "../features/charts/PieChart";
import BarChart1 from "../features/charts/BarChart1";

import "./ReactGridLayout.scss";
import AreaChart1 from "../features/charts/AreaChart1";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactGridLayout = () => {
  const [layouts, setLayouts] = useState(null);
  const [widgetArray, setWidgetArray] = useState([
    { i: "widget1", x: 0, y: 0, w: 2, h: 2, c: "#264653" },
    { i: "widget2", x: 2, y: 0, w: 2, h: 2, c: "#2A9D8F" },
    { i: "widget3", x: 4, y: 0, w: 2, h: 2, c: "#E9C46A" },
    { i: "widget4", x: 6, y: 0, w: 2, h: 2, c: "#2A9D8F" },
    { i: "widget5", x: 0, y: 0, w: 2, h: 2, c: "#F4A261" },
    { i: "widget6", x: 2, y: 2, w: 2, h: 2, c: "#E76F51" },
  ]);

  const handleModify = (layouts, layout) => {
    const tempArray = widgetArray;
    setLayouts(layout);
    layouts?.map((position) => {
      tempArray[Number(position.i)].x = position.x;
      tempArray[Number(position.i)].y = position.y;
      tempArray[Number(position.i)].width = position.w;
      tempArray[Number(position.i)].height = position.h;
      return position;
    });
    setWidgetArray(tempArray);
    // console.log(tempArray);
  };

  // const handleAdd = () => {
  //   setWidgetArray([
  //     ...widgetArray,
  //     {
  //       i: "widget" + (widgetArray.length + 1),
  //       x: 0,
  //       y: 0,
  //       w: 2,
  //       h: 2,
  //       c: "#E76F51",
  //     },
  //   ]);
  //   console.log(widgetArray);
  // };

  const handleDelete = (key) => {
    const tempArray = widgetArray.slice();
    const index = tempArray.indexOf(tempArray.find((data) => data.i === key));
    tempArray.splice(index, 1);
    setWidgetArray(tempArray);
  };

  return (
    <div>
      {/* <button onClick={() => handleAdd()}>Add Widget</button> */}

      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        verticalCompact={true}
        layout={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
        autoSize={true}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetArray?.map((widget, index) => {
          return (
            <div
              className="reactGridItem"
              style={{ backgroundColor: widget.c }}
              key={index}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                minW: 2,
                maxW: Infinity,
                minH: 2,
                maxH: Infinity,
                isDraggable: true,
                isResizable: true,
              }}
            >
              <button
                className="deleteButton"
                onClick={() => handleDelete(widget.i)}
              >
                x
              </button>
              {/* <div>{widget.i}</div> */}
              {widget.i === "widget1" ? <PieChart /> : ""}
              {widget.i === "widget2" ? <BarChart1 /> : ""}
              {widget.i === "widget3" ? <AreaChart1 /> : ""}
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default ReactGridLayout;
