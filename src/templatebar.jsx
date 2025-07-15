import React, { useState } from 'react';

const Templatebar = ({ images, handleDragStart, setImages }) => {
  const [imageUrl, setImageUrl] = useState('');

  const groupedImages = images.reduce((acc, image) => {
    if (!acc[image.tag]) acc[image.tag] = [];
    acc[image.tag].push(image);
    return acc;
  }, {});

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: (new Date().getTime() + Math.random()).toString(),
      src: URL.createObjectURL(file),
      title: file.name,
      tag: 'Uploaded',
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Invalid image URL');
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const newImage = {
        id: (new Date().getTime() + Math.random()).toString(),
        src: objectUrl,
        title: imageUrl.split('/').pop(),
        tag: 'URL',
      };

      setImages((prevImages) => [...prevImages, newImage]);
      setImageUrl('');
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.heading}>Template</h3>

      <div style={styles.controls}>
        <form onSubmit={handleUrlSubmit} style={styles.urlForm}>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            style={styles.input}
          />
        </form>

        <label htmlFor="upload" style={styles.uploadButton}>
          Upload Images
          <input
            type="file"
            id="upload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div style={styles.imageList}>
        {Object.keys(groupedImages).map((tag) => (
          <div key={tag} style={styles.imageGroup}>
            <h4 style={styles.groupTitle}>{tag}</h4>
            <div style={styles.imageGrid}>
              {groupedImages[tag].map((image) => (
                <div
                  key={image.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, image)}
                  style={styles.imageCard}
                >
                  <img src={image.src} alt={image.title} style={styles.thumbnail} />
                  <div style={styles.imageTitle}>{image.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  sidebar: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '300px',
    overflowY: 'auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '25px',
    alignItems: 'center',
  },
  urlForm: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '500px',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  uploadButton: {
    padding: '10px 15px',
    backgroundColor: '#2196F3',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  imageList: {
    marginTop: '10px',
  },
  imageGroup: {
    marginBottom: '30px',
  },
  groupTitle: {
    fontSize: '20px',
    color: '#444',
    borderBottom: '2px solid #ddd',
    paddingBottom: '5px',
    marginBottom: '15px',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '15px',
  },
  imageCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease',
    cursor: 'grab',
  },
  thumbnail: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    objectFit: 'cover',
    marginBottom: '5px',
  },
  imageTitle: {
    fontSize: '12px',
    color: '#333',
    wordBreak: 'break-word',
  },
};

export default Templatebar;

