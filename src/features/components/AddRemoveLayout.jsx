import React, { useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function AddRemoveLayout() {
  const [state, setState] = useState({
    items: [0, 1, 2, 3, 4].map((i, key, list) => ({
      i: i.toString(),
      x: i * 2,
      y: 0,
      w: 2,
      h: 2,
      add: i === list.length - 1,
    })),
    newCounter: 0,
    layout: [],
  });

  const onAddItem = () => {
    /* eslint no-console: 0 */
    console.log('adding', `n${state.newCounter}`);
    setState((prevState) => ({
      // Add a new item. It must have a unique key!
      items: prevState.items.concat({
        i: `n${prevState.newCounter}`,
        x: (prevState.items.length * 2) % (prevState.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: prevState.newCounter + 1,
    }));
  };

  const onRemoveItem = (i) => () => {
    console.log('removing', i);
    setState((prevState) => ({
      items: _.reject(prevState.items, { i }),
    }));
  };

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    setState((prevState) => ({
      ...prevState,
      breakpoint,
      cols,
    }));
  };

  const onLayoutChange = (layout) => {
    // Avoid recursive call
    setState((prevState) => ({
      ...prevState,
      layout,
    }));
  };

  const createElement = (el) => {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer',
    };

    const handleKeyDown = (fn) => (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        fn(e);
      }
    };

    const i = el.add ? '+' : el.i;
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span
            className="add text"
            onClick={onAddItem}
            onKeyDown={handleKeyDown(onAddItem)}
            role="button"
            tabIndex={0}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        {!el.add && (
          <span
            className="remove"
            style={removeStyle}
            onClick={onRemoveItem(i)}
            onKeyDown={handleKeyDown(onRemoveItem(i))}
            role="button"
            tabIndex={0}
          >
            x
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      <button type="button" onClick={onAddItem}>
        Add Item
      </button>
      <ResponsiveReactGridLayout
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
      >
        {_.map(state.items, (el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default AddRemoveLayout;
