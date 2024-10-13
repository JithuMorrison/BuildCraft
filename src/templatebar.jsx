import React, { useState, useEffect } from 'react';

const Templatebar = ({ images, handleDragStart, setImages }) => {
  const [imageUrl, setImageUrl] = useState('');

  // Group images by title
  const groupedImages = images.reduce((acc, image) => {
    if (!acc[image.tag]) {
      acc[image.tag] = []; // Create a new array for this title if it doesn't exist
    }
    acc[image.tag].push(image); // Add image to the appropriate title group
    return acc;
  }, {});

  // Handle image upload from file input
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      const url = URL.createObjectURL(file);
      return {
        id: (new Date().getTime() + Math.random()).toString(), // Generate a unique ID
        src: url,
        title: file.name,
        tag: 'Uploaded', // Categorize as "Uploaded"
      };
    });

    // Update the images state in the parent component
    setImages((prevImages) => [...prevImages, ...newImages]);   
  };

  // Handle image URL submission
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (imageUrl) {
      const newImage = {
        id: (new Date().getTime() + Math.random()).toString(), // Generate a unique ID
        src: imageUrl,
        title: imageUrl.split('/')[0], // Extract title from URL
        tag: 'URL', // Categorize as "URL"
      };
      
      // Update the images state in the parent component
      setImages((prevImages) => [...prevImages, newImage]);
      setImageUrl(''); // Clear the input field
    }
  };

  // Log images when they change
  useEffect(() => {
    console.log("Updated images:", images);
  }, [images]);

  return (
    <div className="template-sidebar">
      <h3>Template</h3>

      {/* Input for URL */}
      <form onSubmit={handleUrlSubmit} style={{ marginBottom: '10px' }}>
        <input 
          type="text" 
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)} 
          placeholder="Enter image URL" 
          style={{ marginRight: '10px', width: '70%' }} 
        />
      </form>

      {/* Input for file upload */}
      <input 
        type="file" 
        accept="image/*" 
        multiple 
        onChange={handleImageUpload} 
        style={{ marginBottom: '10px' }}
      />
      
      <div className="image-list">
        {Object.keys(groupedImages).map((tag) => (
          <div key={tag} className="title-group">
            <h4 style={{ color: 'black' }}>{tag}</h4> {/* Title subheading */}
            <div className="image-items">
              {groupedImages[tag].map((image) => (
                <div
                  key={image.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, image)}
                  className="image-item"
                >
                  <img src={image.src} alt={`Image ${image.id}`} />
                  <div style={{ color: 'black' }}>{image.title}</div> {/* Image title */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templatebar;
