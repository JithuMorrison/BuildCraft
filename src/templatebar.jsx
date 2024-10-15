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

  const styles = {
        container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'darkgray',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        form: {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '15px',
        },
        urlInput: {
          flex: 1,
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginRight: '10px',
          fontSize: '16px',
          marginLeft: '7px',
          width: '50px'
        },
        uploadContainer: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
        },
        uploadLabel: {
          marginBottom: '10px',
          fontSize: '18px',
          color: '#333',
        },
        fileInput: {
          display: 'none', // Hides the default file input
        },
      };  

  return (
    <div className="template-sidebar">
      <h3>Template</h3>

      {/* Input for URL */}
      <div style={styles.container}>
        <form onSubmit={handleUrlSubmit} style={styles.form}>
          <input 
            type="text" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="Enter image URL" 
            style={styles.urlInput} 
          />
        </form>

        {/* Input for file upload */}
        <div style={styles.uploadContainer}>
          <label style={styles.uploadLabel} htmlFor="file-upload">
            Upload Images
          </label>
          <input 
            id="file-upload"
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImageUpload} 
            style={styles.fileInput}
          />
        </div>
      </div>
      
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
