import React, { useState } from 'react';
import './drop.css'; // Ensure you have this CSS file for styling

const images = [
  { id: 1, src: 'https://eu-images.contentstack.com/v3/assets/bltab5f33fe9473d688/blt365f43d2abd911b1/670926b749616b1072576e41/1.png' },
  { id: 2, src: 'https://via.placeholder.com/100.png?text=Image+2' },
  { id: 3, src: 'https://via.placeholder.com/100.png?text=Image+3' },
];

const DragDropPage = () => {
  const [designAreaItems, setDesignAreaItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [resizingItem, setResizingItem] = useState(null);
  const [resizeOffset, setResizeOffset] = useState({ width: 0, height: 0 });

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('imageId', item.id);
    e.dataTransfer.setData('imageSrc', item.src);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData('imageId');
    const draggedImage = images.find((img) => img.id === parseInt(imageId));

    const designArea = e.target.getBoundingClientRect();
    const x = e.clientX - designArea.left;
    const y = e.clientY - designArea.top;

    if (draggedImage) {
      const newImage = {
        ...draggedImage,
        position: { x: x - 50, y: y - 50 }, // Centering the image
        width: 100,
        height: 100,
        uniqueId: Date.now() + Math.random(),
      };

      setDesignAreaItems((prevItems) => [...prevItems, newImage]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (e, item) => {
    setDraggingItem(item.uniqueId);
    const designArea = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - item.position.x,
      y: e.clientY - item.position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (draggingItem) {
      setDesignAreaItems((prevItems) =>
        prevItems.map((item) => {
          if (item.uniqueId === draggingItem) {
            return {
              ...item,
              position: {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
              },
            };
          }
          return item;
        })
      );
    } else if (resizingItem) {
      setDesignAreaItems((prevItems) =>
        prevItems.map((item) => {
          if (item.uniqueId === resizingItem) {
            return {
              ...item,
              width: Math.max(20, e.clientX - item.position.x + resizeOffset.width),
              height: Math.max(20, e.clientY - item.position.y + resizeOffset.height),
            };
          }
          return item;
        })
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingItem(null);
    setResizingItem(null);
  };

  const handleResizeMouseDown = (e, item) => {
    setResizingItem(item.uniqueId);
    setResizeOffset({
      width: item.width - (e.clientX - item.position.x),
      height: item.height - (e.clientY - item.position.y),
    });
    e.stopPropagation(); // Prevent triggering drag event
  };

  const handleDelete = (uniqueId) => {
    setDesignAreaItems((prevItems) => prevItems.filter(item => item.uniqueId !== uniqueId));
  };

  return (
    <div className="drag-drop-container">
      <div
        className="design-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {designAreaItems.map((item) => (
          <div
            key={item.uniqueId}
            style={{
              position: 'absolute',
              left: item.position.x,
              top: item.position.y,
              width: item.width,
              height: item.height,
              overflow: 'hidden',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          >
            <img
              src={item.src}
              alt={`Dropped ${item.id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onMouseDown={(e) => handleMouseDown(e, item)}
            />
            <div
              className="resize-handle"
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'blue',
                position: 'absolute',
                right: '0',
                bottom: '0',
                cursor: 'nwse-resize',
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, item)}
            />
            <button
              onClick={() => handleDelete(item.uniqueId)}
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 5px',
                borderRadius: '3px',
                fontSize: '12px',
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="sidebar">
        <h3>Image Sidebar</h3>
        {images.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt={`Image ${item.id}`}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className="sidebar-image"
            style={{ cursor: 'grab' }}
          />
        ))}
      </div>
    </div>
  );
};

export default DragDropPage;
