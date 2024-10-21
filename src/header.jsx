// src/Header.js
import React, { useEffect, useState } from 'react';
import stack from './contentstackconfig';

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const CONTENTSTACK_HEADER_CONTENT_TYPE = 'Content Type UID'; // Your content type

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await stack.ContentType(CONTENTSTACK_HEADER_CONTENT_TYPE).Query().toJSON().find();
        
        // Access the first entry's header image URL
        const data = response[0][0]; // Get the first entry
        const headerImageUrl = data.headerimage.url; // Get the image URL
        setHeaderData({
          title: data.title,
          imageUrl: headerImageUrl // Store the title and image URL in state
        });
      } catch (error) {
        console.error('Error fetching header data:', error);
      }
    };

    fetchHeaderData();
  }, [CONTENTSTACK_HEADER_CONTENT_TYPE]);

  return (
    <>
      <header className="fixed-header">
        <h1>{headerData ? headerData.title : 'Loading...'}</h1>
        <nav>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </nav>
      </header>
      <div className="large-header">
        {headerData && headerData.imageUrl ? ( // Check for imageUrl in state
          <img 
            src={headerData.imageUrl} // Use the stored image URL
            alt="Header Visual" 
            className="header-image" 
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </>
  );
};

export default Header;
