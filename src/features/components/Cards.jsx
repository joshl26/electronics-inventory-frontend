import React, { useState, useEffect } from 'react';
import './Cards.css';

const initItems = [
  { id: '1', content: 'one', order: 0 },
  { id: '2', content: 'two', order: 1 },
  { id: '3', content: 'three', order: 2 },
  { id: '4', content: 'one', order: 3 },
  { id: '5', content: 'two', order: 4 },
  { id: '6', content: 'three', order: 5 },
  { id: '7', content: 'one', order: 6 },
  { id: '8', content: 'two', order: 7 },
  { id: '9', content: 'three', order: 8 },
  { id: '10', content: 'one', order: 9 },
  { id: '11', content: 'two', order: 10 },
  { id: '12', content: 'three', order: 11 },
  { id: '13', content: 'three', order: 12 },
];

// Items positioning methods
const getXPos = (item) => `${item.order * 200 + 60 * item.order + 23}px`;
// const getYPos = (item) => `16px`;

let longPress;

function Cards() {
  // General
  const [items, setItems] = useState(initItems);
  const [cursorPos, setCursorPos] = useState(undefined); // Pos of mouse or touch
  const [lastRearrangedItemId, setLastRearrangedItemId] = useState();
  // Touch events
  const [isTouch, setIsTouch] = useState(false);
  const [touchOverId, setTouchOverId] = useState(undefined);
  // Drag events
  const [dragItem, setDragItem] = useState();
  const [dragPoint, setDragPoint] = useState({ x: 0, y: 0 });
  // Monitors. Could be removed
  const [touchStatus, setTouchStatus] = useState('not active');
  const [dndStatus, setDndStatus] = useState('not active');
  const [UILog, setUILog] = useState();

  /// //////////////////
  /* Events' methods */
  /// //////////////////

  const getItemById = (id) =>
    // Return object with required id from items array
    items.find((item) => item.id === id);
  const initDrag = (cursor, item) => {
    /* Initialize dragging via assigning dragPoint and dragItem
    Require arguments: 
      cursor: {x, y} // clientX, clientY of a mouse or a touch
      item: {id, content, order} // Objects from items array
    */
    const dragElement = document.getElementById(item.id);
    if (dragElement) {
      setDragPoint({
        x: cursor.x - dragElement.offsetLeft,
        y: cursor.y - dragElement.offsetTop,
      });
    }
    setDragItem(item);
  };

  const rearrangeItems = (overItem) => {
    if (overItem === dragItem || overItem.id === lastRearrangedItemId) return;

    setItems((prevItems) => {
      const newOrder = prevItems.map((item) => {
        if (dragItem.order < overItem.order) {
          // Drag toward the end
          if (item.order > dragItem.order && item.order <= overItem.order) {
            return { ...item, order: item.order - 1 };
          }
          if (item.order === dragItem.order) {
            return { ...item, order: overItem.order };
          }
        } else if (dragItem.order > overItem.order) {
          // Drag toward the start
          if (item.order < dragItem.order && item.order >= overItem.order) {
            return { ...item, order: item.order + 1 };
          }
          if (item.order === dragItem.order) {
            return { ...item, order: overItem.order };
          }
        }
        return item;
      });

      return newOrder;
    });

    setLastRearrangedItemId(overItem.id);
  };

  const cleanupDrag = () => {
    setDndStatus('not active');
    setDragItem(undefined);
    setLastRearrangedItemId(undefined);
    setCursorPos(undefined);
    setDragPoint(undefined);
  };

  /// ///////////////////////
  /* Touch screens events */
  /// ///////////////////////

  const onTouchStart = (e) => {
    // e.preventDefault && e.preventDefault();
    const touchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    const fingers = e.touches.length;
    setTouchStatus('start');
    setIsTouch(true);
    setCursorPos({ x: touchPos.x, y: touchPos.y });
    longPress =
      fingers === 1 &&
      setTimeout(() => {
        const touchElement = document.elementFromPoint(touchPos.x, touchPos.y);
        if (touchElement && touchElement.id) {
          initDrag({ x: touchPos.x, y: touchPos.y }, getItemById(touchElement.id));
        }
      }, 500);
  };

  const onTouchMove = (e) => {
    // e.preventDefault && e.preventDefault();
    setTouchStatus('move');
    if (!dragItem) clearTimeout(longPress);
    setCursorPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    const overObjectId = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)?.id;
    setTouchOverId(overObjectId);
    if (overObjectId && dragItem && lastRearrangedItemId !== overObjectId) {
      setUILog('rearranging');
      const overTouchItem = getItemById(overObjectId);
      if (overTouchItem) {
        rearrangeItems(overTouchItem);
      }
    }
  };

  const onTouchEnd = () => {
    if (!dragItem) clearTimeout(longPress); // Cancel drag event for touch scn
    if (dragItem) cleanupDrag();
    setIsTouch(false);
    setTouchStatus('end');
  };

  /// ///////////////
  /* Mouse events */
  /// ///////////////

  const onDragOverSpace = (e) => {
    setDndStatus('Dragging around');
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener('dragover', onDragOverSpace);
    return () => document.removeEventListener('dragover', onDragOverSpace);
  }, []);

  const onDragStart = (e, note) => {
    if (isTouch) {
      e.preventDefault();
      return;
    }
    setDndStatus('start');
    setCursorPos({ x: e.clientX, y: e.clientY });
    initDrag({ x: e.clientX, y: e.clientY }, note);
  };

  const onDragOverItem = (e, overItem) => {
    setDndStatus('Over item');
    e.preventDefault(); // Necessary. Allows us to drop.
    rearrangeItems(overItem);
  };

  const onDragEnd = () => {
    // Cleanup after dragging
    cleanupDrag();
  };

  /// ////////////////////////
  /* Prepare render values */
  /// ////////////////////////

  let ghost; // Setup ghost on render
  if (dragItem && cursorPos && dragPoint) {
    ghost = {
      item: dragItem,
      x: cursorPos.x - dragPoint.x,
      y: cursorPos.y - dragPoint.y,
    };
  }

  return (
    <div className="cards-container">
      <div className="spacer" />
      {items.map((note) => (
        <div
          id={note.id}
          draggable="true"
          className={`note ${!dragItem && 'hoverable'}`}
          key={note.id}
          onDragStart={(e) => onDragStart(e, note)}
          onDragOver={(e) => onDragOverItem(e, note)}
          onDragEnd={onDragEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            opacity: dragItem === note ? 0 : 1,
            left: getXPos(note),
            // top: getYPos(note),
          }}
        >
          <p>{note.content}</p>
        </div>
      ))}
      {ghost && (
        <div
          className="note ghost"
          style={{
            transform: `translate(${ghost.x}px, ${ghost.y}px)`,
          }}
        >
          <p>{ghost.item.content}</p>
        </div>
      )}
      <h6 style={{ position: 'fixed', left: 500, bottom: 150 }}>
        UI log : {UILog && UILog.toString()}
      </h6>
      <h6 style={{ position: 'fixed', left: 500, bottom: 130 }}>
        rearranged item: {lastRearrangedItemId && lastRearrangedItemId}
      </h6>
      <h6 style={{ position: 'fixed', left: 500, bottom: 110 }}>touch over id: {touchOverId}</h6>
      <h6 style={{ position: 'fixed', left: 500, bottom: 90 }}>touch status: {touchStatus}</h6>
      <h6 style={{ position: 'fixed', left: 500, bottom: 20 }}>dnd status: {dndStatus}</h6>
    </div>
  );
}

export default Cards;
