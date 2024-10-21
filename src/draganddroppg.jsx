import React, { useState, useEffect,useRef } from 'react';
import stack from './contentstackconfig';
import './drop.css'; // Ensure you have this CSS file for styling
import Templatebar from './templatebar';
import html2canvas from 'html2canvas';

const DragDropPage = () => {
  const [designAreaItems, setDesignAreaItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [resizingItem, setResizingItem] = useState(null);
  const [resizeOffset, setResizeOffset] = useState({ width: 0, height: 0 });
  const [images, setImages] = useState([]);
  const [showDesignPanel, setShowDesignPanel] = useState(false);
  const [designAreaSize, setDesignAreaSize] = useState({ width: 500, height: 500 });
  const [selectedItem, setSelectedItem] = useState(null); // Track currently selected image item
  const [clipboard, setClipboard] = useState(null); // State to store cut/copy items
  const designAreaRef = useRef(); // Ref for the design area to capture its content
  const [DesignNameValue, setDesignNameValue] = useState('');

  // Function to handle input changes
  const handleInputChange = (event) => {
    setDesignNameValue(event.target.value);
  };

  // Fetch images from Contentstack
  const fetchImages = async () => {
    try {
      const Query = stack.ContentType('UID').Query();
      const result = await Query.toJSON().find(); // Fetching entries from Contentstack
      const fetchedImages = [];
      if (result[0].length > 0) {
        for (let i = 0; i < result[0].length; i++) {
          const entry = result[0][i];
          const imageUrl = entry.contentimage.url != null ? entry.contentimage.url : '';
          const response = await fetch(imageUrl);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Convert the response to a blob
          const blob = await response.blob();
          // Create an object URL from the blob
          const newObjectUrl = URL.createObjectURL(blob);
          fetchedImages.push({
            id: entry.uid, // Use the unique identifier
            src: newObjectUrl,  // Safely access the image URL
            title: entry.title,
            tag: entry.tags[0],
          });
        }
      }

      setImages(fetchedImages);
    } catch (error) {
      console.error('Error fetching images from Contentstack:', error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('imageId', item.id);
    e.dataTransfer.setData('imageSrc', item.src);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData('imageId');
    const draggedImage = images.find((img) => img.id === imageId);

    const designArea = e.target.getBoundingClientRect();
    const x = e.clientX - designArea.left;
    const y = e.clientY - designArea.top;

    if (draggedImage) {
      const newImage = {
        ...draggedImage,
        position: { x: x - 50, y: y - 50 }, // Centering the image
        width: 100,
        height: 100,
        padding: 0,
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
    setSelectedItem(item); // Select the image item for editing in the design panel
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

  const handleDelete = () => {
    if (selectedItem) {
      setDesignAreaItems((prevItems) => prevItems.filter(item => item.uniqueId !== selectedItem.uniqueId));
      setSelectedItem(null); // Clear the selected item
    }
  };

  const handleDesignChange = (e, property) => {
    const value = e.target.value;
    if (selectedItem) {
      setDesignAreaItems((prevItems) =>
        prevItems.map((item) => {
          if (item.uniqueId === selectedItem.uniqueId) {
            return {
              ...item,
              [property]: value !== '' ? parseInt(value, 10) : 0, // Ensure it updates correctly
            };
          }
          return item;
        })
      );
      // Update selected item in state as well
      setSelectedItem({
        ...selectedItem,
        [property]: value !== '' ? parseInt(value, 10) : 0,
      });
    }
  };

  // Handle the design area resize
  const handleDesignAreaResize = (e, property) => {
    const value = e.target.value;
    setDesignAreaSize((prevSize) => ({
      ...prevSize,
      [property]: value !== '' ? parseInt(value, 10) : 0,
    }));
  };

  // Add keydown event listener to delete the selected item
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete') {
        handleDelete(); // Call delete function when Delete key is pressed
      } else if (e.ctrlKey && e.key === 'c') {
        // Handle copy
        if (selectedItem) {
          setClipboard(selectedItem); // Copy selected item to clipboard
        }
      } else if (e.ctrlKey && e.key === 'x') {
        // Handle cut
        if (selectedItem) {
          setClipboard(selectedItem); // Cut selected item to clipboard
          handleDelete(); // Delete the selected item
        }
      } else if (e.ctrlKey && e.key === 'v') {
        // Handle paste
        if (clipboard) {
          const newItem = {
            ...clipboard,
            uniqueId: Date.now() + Math.random(), // Ensure new unique ID
            position: { x: clipboard.position.x + 10, y: clipboard.position.y + 10 }, // Slightly offset the pasted item
          };
          setDesignAreaItems((prevItems) => [...prevItems, newItem]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, clipboard]);

  const downloadJson = () => {
    const jsonData = {
      designAreaSize,
      items: designAreaItems.map((item) => ({
        id: item.id,
        title: item.title,
        src: item.src,
        position: item.position,
        width: item.width,
        height: item.height,
      })),
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design_area_data.json';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL.createObjectURL
  };

  const saveDesignAreaAsImage = async () => {
    if (designAreaRef.current) {
      // Create an array of promises for loading all images
      const imageLoadPromises = designAreaItems.map(async (item) => {
        return new Promise(async (resolve) => {
          if (item.src && !item.tag.includes('Uploaded')) { // Check for image URLs excluding "Uploaded"
            try {
              const response = await fetch(item.src);
              const blob = await response.blob();
              const url = URL.createObjectURL(blob); // Create a Blob URL
              item.src = url; // Replace the item's src with the Blob URL
            } catch (error) {
              console.error('Error loading image:', error);
            }
          }
          resolve(); // Resolve regardless of whether the image was a Blob
        });
      });
  
      // Wait for all images to load and be processed
      await Promise.all(imageLoadPromises);
  
      // Capture the design area
      html2canvas(designAreaRef.current).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = image;
        a.download = 'design_area.png';
        a.click();
      });
    }
  };

  const saveDesignToLocalStorage = async () => {
    if (DesignNameValue) {
        const storageKey = `savedDesign_${DesignNameValue}`;
        
        // Convert image data to base64 with compression
        const itemsWithBase64 = await Promise.all(designAreaItems.map(async (item) => {
            if (item.src.startsWith('blob:') || item.src.startsWith('data:')) {
                const response = await fetch(item.src);
                const blob = await response.blob();

                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        // Adjust the canvas size to maintain the aspect ratio if necessary
                        const scaleFactor = 0.5; // Adjust this factor to control compression
                        canvas.width = img.width * scaleFactor;
                        canvas.height = img.height * scaleFactor;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        // Convert to base64 with lower quality
                        const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // No callback needed here
                        resolve({ ...item, src: dataUrl });
                    };
                    img.onerror = reject;
                    img.src = URL.createObjectURL(blob);
                });
            }
            return item; // Return the item unchanged if not a blob or data URL
        }));

        const designData = {
            designAreaSize,
            items: itemsWithBase64,
        };

        try {
            // Save the design data to localStorage
            localStorage.setItem(storageKey, JSON.stringify(designData));

            // Update the list of saved design names
            const savedDesignsKey = 'MyDesigns';
            let savedDesigns = JSON.parse(localStorage.getItem(savedDesignsKey)) || [];
            
            // Add the new design name if it doesn't already exist
            if (!savedDesigns.includes(DesignNameValue)) {
                savedDesigns.push(DesignNameValue);
                localStorage.setItem(savedDesignsKey, JSON.stringify(savedDesigns));
            }
            alert(`Design saved successfully as "${DesignNameValue}"!`);
        } catch (error) {
            console.error('Error saving design:', error);
            alert('Failed to save design. The design might be too large for local storage.');
        }
    } else {
        alert("Design not saved. Please provide a name.");
    }
};

const loadDesignFromLocalStorage = () => {
  // Prompt the user for the design name
  const designName = prompt("Enter the name of the design to load:");
  if (!designName) {
      alert("No design name provided. Operation cancelled.");
      return; // Exit if no name is provided
  }

  const storageKey = `savedDesign_${designName}`;
  const savedDesign = localStorage.getItem(storageKey);
  
  if (savedDesign) {
      try {
          const parsedDesign = JSON.parse(savedDesign);
          setDesignAreaSize(parsedDesign.designAreaSize);
          
          // Convert base64 back to blob URLs
          const itemsWithBlobUrls = parsedDesign.items.map(item => {
              if (item.src.startsWith('data:')) {
                  // Decode the base64 string
                  const byteString = atob(item.src.split(',')[1]);
                  const mimeString = item.src.split(',')[0].split(':')[1].split(';')[0];
                  const ab = new ArrayBuffer(byteString.length);
                  const ia = new Uint8Array(ab);
                  
                  // Populate the Uint8Array with the byte values
                  for (let i = 0; i < byteString.length; i++) {
                      ia[i] = byteString.charCodeAt(i);
                  }
                  
                  // Create a blob from the ArrayBuffer
                  const blob = new Blob([ab], { type: mimeString });
                  return { ...item, src: URL.createObjectURL(blob) };
              }
              return item; // Return item as is if it's not base64
          });

          // Update the design area items with the new blob URLs
          setDesignAreaItems(itemsWithBlobUrls);
          setDesignNameValue(designName);
          alert(`Design "${designName}" loaded successfully!`);
      } catch (error) {
          console.error('Error loading design:', error);
          alert('Failed to load design. The saved data might be corrupted.');
      }
  } else {
      alert(`No saved design found with the name "${designName}".`);
  }
};



  return (
    <div className="drag-drop-container">
      <Templatebar images={images} handleDragStart={handleDragStart} setImages={setImages}/>

      <div className="design-area-container">
      <input
        type="text"
        id="textInput"
        value={DesignNameValue}
        onChange={handleInputChange}
        placeholder="Enter Design Name..."
        style={{
          height: '30px', 
          position: 'absolute', 
          top: '-20px', 
          left: '170px',
          zIndex: 1000, // Ensure it appears above other elements
          backgroundColor: 'white', // Background color to make it readable
          border: '1px solid #ccc', // Optional: border for better visibility
          padding: '5px', // Optional: padding for better spacing
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Optional: shadow for depth
          color:'black',
        }}
      />
      <button onClick={saveDesignAreaAsImage} className='toggle-design-panel2' style={{zIndex:1000}}>Save as Image</button> {/* Button to save design area */}
      <button onClick={saveDesignToLocalStorage} className='toggle-design-panel2' style={{marginRight:'405px',zIndex:1000}}>Save Design</button>
        <button onClick={loadDesignFromLocalStorage} className='toggle-design-panel2' style={{marginRight:'530px',zIndex:1000}}>Load Design</button>
        <div
          ref={designAreaRef}
          className="design-area"
          style={{ width: designAreaSize.width, height: designAreaSize.height }}
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
                padding: item.padding,
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
              {/* Removed the delete button */}
            </div>
          ))}
        </div>

        <button onClick={() => setShowDesignPanel(!showDesignPanel)} className="toggle-design-panel">
          {showDesignPanel ? 'Close Design Tab' : 'Open Design Tab'}
        </button>
        <button onClick={downloadJson} className="toggle-design-panel1">Download JSON</button>

        {showDesignPanel && (
          <div className="design-panel">
            <h3>Edit Design Area</h3>
            <label>
              Area Width:
              <input
                type="number"
                value={designAreaSize.width}
                onChange={(e) => handleDesignAreaResize(e, 'width')}
              />
            </label>
            <label>
              Area Height:
              <input
                type="number"
                value={designAreaSize.height}
                onChange={(e) => handleDesignAreaResize(e, 'height')}
              />
            </label>

            {selectedItem && (
              <div>
                <h4>Edit Selected Item</h4>
                <label>
                  Width:
                  <input
                    type="number"
                    value={selectedItem.width}
                    onChange={(e) => handleDesignChange(e, 'width')}
                  />
                </label>
                <label>
                  Height:
                  <input
                    type="number"
                    value={selectedItem.height}
                    onChange={(e) => handleDesignChange(e, 'height')}
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropPage;
